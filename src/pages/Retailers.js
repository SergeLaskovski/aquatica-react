import React, { useRef, useEffect } from 'react';
import ReactDOM from "react-dom";

import mapboxgl from 'mapbox-gl';

import fetchFakeData from "./api/fetchFakeData";
import Popup from "./components/Popup";

import {withStyles} from '@material-ui/core';
import styles from './RetailersStyles.js';
import { Grid, Typography, Box} from '@material-ui/core';
//import Card from '@material-ui/core/Card';
//import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

import FooterContactBanner from '@/components/layout/FooterContactBanner';

function Retailers(props) {

    const {classes} = props;

    const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '/?page=retailers';
    const pageData = UseDataApi(PAGE_API_URL);

    const RETAILERS_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_RETAILERS;
    const retailersData = UseDataApi(RETAILERS_API_URL);

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const mapContainerRef = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  
    // initialize map when component mounts
    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        // See style options here: https://docs.mapbox.com/api/maps/#styles
        style: "mapbox://styles/mapbox/light-v10",
        center: [-104.9876, 39.7405],
        zoom: 9
      });
  
      // add navigation control (zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
  
      map.on("load", () => {
        // add the data source for new a feature collection with no features
        map.addSource("random-points-data", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: []
          }
        });
        // now add the layer, and reference the data source above by name
        map.addLayer({
          id: "random-points-layer",
          source: "random-points-data",
          type: "symbol",
          layout: {
            // full list of icons here: https://labs.mapbox.com/maki-icons
            "icon-image": "bakery-15", // this will put little croissants on our map
            "icon-padding": 0,
            'icon-size': 0.25,
            "icon-allow-overlap": true
          }
        });
      });
  
      map.on("moveend", async () => {
        // get new center coordinates
        const { lng, lat } = map.getCenter();
        // fetch new data
        const results = await fetchFakeData({ longitude: lng, latitude: lat });
        // update "random-points-data" source with new data
        // all layers that consume the "random-points-data" data source will be updated automatically
        map.getSource("random-points-data").setData(results);
      });
  
      // change cursor to pointer when user hovers over a clickable feature
      map.on("mouseenter", "random-points-layer", e => {
        if (e.features.length) {
          map.getCanvas().style.cursor = "pointer";
        }
      });
  
      // reset cursor to default when user is no longer hovering over a clickable feature
      map.on("mouseleave", "random-points-layer", () => {
        map.getCanvas().style.cursor = "";
      });
  
      // add popup when user clicks a point
      map.on("click", "random-points-layer", e => {
        if (e.features.length) {
          const feature = e.features[0];
          // create popup node
          const popupNode = document.createElement("div");
          ReactDOM.render(<Popup feature={feature} />, popupNode);
          // set popup on map
          popUpRef.current
            .setLngLat(feature.geometry.coordinates)
            .setDOMContent(popupNode)
            .addTo(map);
        }
      });
  
      // clean up on unmount
      return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps





    return( 
        <React.Fragment>
        {
            pageData.error ? (
              <Error />
            ) : pageData.load ? (
                <React.Fragment>
                    <Grid container>
                        <Grid item xs={12} md={6} container alignItems="center">
                            <Typography variant="h1" component="div">
                                <Box p={8}>Retailers</Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" component="div">
                                <Box p={8} dangerouslySetInnerHTML={{__html: pageData.data.content}}/>
                            </Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>
            ) : (
              <Loader />
            )
        }
        <div className={classes.mapContainer} ref={mapContainerRef} />
        {
            retailersData.error ? (
                <Error />
              ) : retailersData.load ? (
                <React.Fragment>
                    
                </React.Fragment>
              ) : (
                <Loader />
              )
        }
        <Box p={6}/>
        <FooterContactBanner/>
        </React.Fragment>
    )

}


export default withStyles(styles)(Retailers);
