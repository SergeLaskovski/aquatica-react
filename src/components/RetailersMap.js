import React, { useRef, useEffect } from 'react';
import ReactDOM from "react-dom";

import mapboxgl from 'mapbox-gl';


import {withStyles} from '@material-ui/core';
import styles from './RetailersMapStyles.js';
import "@/assets/css/map.css"; 

const RetailersMap = (props) => {
    
    const {classes} = props;
    const retailersData = props.retailersData;
    const mapCenter = props.mapCenter;


    const fetchMapData = (retailersData) => {
        if(retailersData.load){
          const newFeaturesList = [];

          retailersData.data.map((retailer, index) => {
            newFeaturesList.push({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [retailer.longitude, retailer.latitude]
              },
              properties: {
                index,
                name: retailer.title,
                description: "<strong>"+retailer.address+"</strong><br>"+retailer.text
              }
            });
            return true;
          });
          return Promise.resolve({
            type: "FeatureCollection",
            features: newFeaturesList
          });
        }
    };

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const mapContainerRef = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  
    // initialize map when component mounts
    useEffect(() => {

      if(retailersData.load){

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          // See style options here: https://docs.mapbox.com/api/maps/#styles
          style: "mapbox://styles/mapbox/light-v10",
          center: [mapCenter.currLon, mapCenter.currLat],
          zoom: 11,
          tap: false,

        });
    
        // add navigation control (zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    
        map.on("load", async () => {
                // add the data source for new a feature collection with no features
                map.addSource("aquatica-retailers-data", {
                  type: "geojson",
                  data: {
                    type: "FeatureCollection",
                    features: []
                  }
                });
                // now add the layer, and reference the data source above by name
                map.addLayer({
                  id: "aquatica-retailers-layer",
                  source: "aquatica-retailers-data",
                  type: "symbol",
                  layout: {
                    "icon-image": "ranger-station-15", 
                    "icon-padding": 0,
                    'icon-size': 1.5,
                    "icon-allow-overlap": true
                  }
                });
                //find me button on map
                map.addControl(
                  new mapboxgl.GeolocateControl({
                    positionOptions: {
                    enableHighAccuracy: true
                  },
                    trackUserLocation: true
                  })
                );

                const results = await fetchMapData(retailersData);
                 // all layers that consume the "random-points-data" data source will be updated automatically
                map.getSource("aquatica-retailers-data").setData(results);
        });

    
        // change cursor to pointer when user hovers over a clickable feature
        map.on("mouseenter", "aquatica-retailers-layer", e => {
          if (e.features.length) {
            map.getCanvas().style.cursor = "pointer";
          }
        });
    
        // reset cursor to default when user is no longer hovering over a clickable feature
        map.on("mouseleave", "aquatica-retailers-layer", () => {
          map.getCanvas().style.cursor = "";
        });
    
        // add popup when user clicks a point
        map.on("click", "aquatica-retailers-layer", e => {
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
      }
    }, [mapCenter, retailersData]);


    
    const Popup = ({ feature }) => {
        const { id, name, description } = feature.properties;
      
        return (
          <div id={`popup-${id}`}>
            <h4 dangerouslySetInnerHTML={{__html: name}}></h4>
            <div dangerouslySetInnerHTML={{__html: description}}></div>
          </div>
        );
      };

      
      return (
        <div className={classes.mapContainer} ref={mapContainerRef} />
      )
    }

    export default  withStyles(styles)(RetailersMap);