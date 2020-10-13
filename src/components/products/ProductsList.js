import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core';
import styles from './ProductsListStyles.js';


import {Grid, Typography, Box} from '@material-ui/core';

function ProductsList(props) {
  const {classes, productsData, currentCat} = props;
  let urlBase = 'products';
  if(props.urlBase){urlBase=props.urlBase}
  return (

    <Grid container className={classes.catsContainer} alignItems="stretch" justify="flex-start">
      {
        productsData.length > 0 && (
          productsData.map((product, index) => (
            <Grid item className={classes.catItemContainer} key={`mainPageProduct${index}`}>
              <div className={classes.hoverCard}>
                <NavLink to={`/${urlBase}/${currentCat ? currentCat : product.catSlug}/${product.slug}`} className={classes.aNone}>
                  <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="stretch"
                    className={classes.h100}
                  >
                    <Grid
                      item
                      className={classes.productImgContainer}
                      style={{backgroundImage: 'url("' + product.img + '")'}}
                    ></Grid>
                    <Grid item container 
                      direction="column"
                      justify="space-between"
                      alignItems="stretch"
                      className={classes.flexGrow}
                    >
                      <Box component="div" px={3} pt={3}>
                        <Typography variant="h3" dangerouslySetInnerHTML={{__html: product.title}}></Typography>
                      </Box>
                      <Box component="div" px={3} py={1}>
                        <Typography component="div" variant="caption">{product.code}</Typography>
                        {/*
                        <Typography component="div" variant="caption">colour {product.colour}</Typography>
                        <Typography component="div" variant="caption">shape {product.shape}</Typography>
                        <Typography component="div" variant="caption">pressure {product.pressure}</Typography>
                        <Typography component="div" variant="caption">{product.related}</Typography>
                        <Typography component="div" variant="caption">{product.priority}</Typography>
                        <Typography component="div" variant="caption">{product.options_spare}</Typography>
                        <Typography component="div" variant="caption">{product.range}</Typography>
                        */}
                        <Typography component="div" variant="caption">{product.range}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </NavLink>
              </div>
            </Grid>
          ))
        )
      }
    </Grid>
  );
}

export default withRouter(withStyles(styles)(ProductsList));
