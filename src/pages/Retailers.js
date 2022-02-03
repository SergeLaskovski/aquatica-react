import React, { useState, useEffect } from 'react';

import {withStyles} from '@material-ui/core';
import styles from './RetailersStyles.js';
import { Grid, Typography, Box} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import RetailersMap from '@/components/RetailersMap'

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

function Retailers(props) {

    const {classes} = props;

    const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '/?page=retailers';
    const pageData = UseDataApi(PAGE_API_URL);

    const RETAILERS_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_RETAILERS;
    const retailersData = UseDataApi(RETAILERS_API_URL);

    const [retailerCity, setRetailerCity] = useState('');
    
    const [currPos, setCurrPos] = useState({'currLon': '174.768778', 'currLat': '-36.839979'});
    //get current location. if not possible use default (Auckland)
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setCurrPos({'currLon': position.coords.longitude, 'currLat':  position.coords.latitude});
      })
    }, []);
    

    let mapData = {};
    let retailersByCity = {};
    let cities = [];
    if(retailersData.load){
      //create retailers array by city
      retailersData.data.map((retailer) => {
        if( typeof(retailersByCity[retailer.city]) === "undefined" ){ 
          retailersByCity[retailer.city] = []; 
          cities.push(retailer.city);
        }
        retailersByCity[retailer.city].push(retailer);
        return true;
      })

      //data for map
      mapData = retailersData
    }
    const handleClick = (event) =>{
      setRetailerCity(event.target.value);
      setCurrPos({
        'currLon': retailersByCity[event.target.value][0].longitude,
        'currLat':  retailersByCity[event.target.value][0].latitude
      })
    }

    const sortRetailers = (retailersData) => {
      let suburb = {};
      retailersData.map((rData) => {
        if(typeof(suburb[rData.suburb]) === 'undefined') suburb[rData.suburb] = [];
        suburb[rData.suburb].push(rData);
        return true;
      })

      const ordered = Object.keys(suburb).sort().reduce(
        (obj, key) => { 
          obj[key] = suburb[key]; 
          return obj;
        }, 
        {}
      );
      return ordered;
    }

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
        {
            retailersData.error ? (
                <Error />
              ) : retailersData.load ? (
                <React.Fragment>

                    <Box p={{ xs: 4, lg: 0 }}><RetailersMap retailersData={mapData} mapCenter={currPos}/></Box>

                    <Box p={6}>
                      <Grid container>
                        <Grid item xs={12} lg={4}>
                          <FormControl className={classes.formControl}>
                            <InputLabel id="city-select-label">Select area</InputLabel>
                            <Select
                              labelId="city-select-label"
                              id="city-select"
                              value={retailerCity}
                              onChange={handleClick}
                              className={classes.selectEmpty}
                              displayEmpty
                            >
                              {
                                cities.map((city, index) => (
                                  <MenuItem value={city} key={`city${index}`}>{city}</MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                              {
                                retailerCity !== "" && (
                                  Object.entries(sortRetailers(retailersByCity[retailerCity])).map(([title, rData],index) => (
                                      <Box pt={2}>
                                        <Typography variant="h3" dangerouslySetInnerHTML={{__html: title}} key={`retailerArea${index}`}></Typography>
                                        {
                                          rData.map((retailerByCityData, index2) => (
                                            <Box py={2} pl={3} key={`retailerByCity${index2}`}>
                                              <Typography variant="h4" dangerouslySetInnerHTML={{__html: retailerByCityData.title}}></Typography>
                                              <Typography variant="body1" dangerouslySetInnerHTML={{__html: retailerByCityData.address}}></Typography>
                                              <Box dangerouslySetInnerHTML={{__html: retailerByCityData.text}}/>
                                            </Box>
                                          ))
                                        }
                                      </Box>
                                    ))
                                )
                              }
                        </Grid>
                      </Grid>
                    </Box>
                </React.Fragment>
              ) : (
                <Loader />
              )
        }
        <Box p={6}/>
        </React.Fragment>
    )

}


export default withStyles(styles)(Retailers);
