import React from 'react';
import {withStyles} from '@material-ui/core';
import styles from './ProductsListStyles.js';

import {Grid} from '@material-ui/core';

import ProductCard from '@/components/products/ProductCard';

import FourtyFour from '@/components/FourtyFour';

function ProductsList(props) {

  const {classes, productsData, currentCat} = props;
  let urlBase = 'products';
  if(props.urlBase){urlBase=props.urlBase}

  


  return (

    <Grid container className={classes.catsContainer} alignItems="stretch" justify="flex-start">
      {
        productsData.length > 0 ? (
          productsData.map((product, index) => (
            <ProductCard product={product} urlBase={urlBase} currentCat={currentCat} key={`mainPageProduct${index}`} />
          ))
        ) : (
          !productsData.load && <FourtyFour msg="No products in this category"/>
        )
      }
    </Grid>
  );
}

export default withStyles(styles)(ProductsList);
