import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';


import {CurrentProductContextProvider} from '@/context/current-product-context';
import {CollectionsContext} from '@/context/collections-context';

import Breadcrumbs from '@/components/products/Breadcrumbs';

import ProducstList from '@/components/products/ProductsList';
import ProductDisplay from '@/components/products/ProductDisplay';

import {withStyles} from '@material-ui/core';
import styles from './CollectionsStyles';
import {Grid, Typography, Box} from '@material-ui/core';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import FourtyFour from '@/components/FourtyFour';

import FooterContactBanner from '@/components/layout/FooterContactBanner';


function Collections(props) {

  const {classes} = props;
  let currColSlug = false;
  let currProductSlug = false;
  if(props.match.params.col){currColSlug = encodeURIComponent(props.match.params.col);}
  if(props.match.params.product){currProductSlug = encodeURIComponent(props.match.params.product);}
  let currColData = [];
  let productsData = {};
  const colsData = React.useContext(CollectionsContext);

  //if(currColSlug){
    currColData = findColDataBySlug(colsData.data,currColSlug);
    const PRODUCTS_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PRODUCTS + "/?col=" + encodeURIComponent(currColData.title);
    productsData = UseDataApi(PRODUCTS_API_URL);
  //}

          //function to find collection data by slug
          function findColDataBySlug(colsData={}, catSlug="") {
            let currentCol = {};
            for (let key in colsData) {
              if (colsData.hasOwnProperty(key)) {
                  // eslint-disable-next-line
                  colsData[key].forEach((item)=>{
                  if(item.slug === currColSlug){  currentCol = {'id': item.id, 'title': item.title, 'img': item.img, 'slug': item.slug}; }
                })
              }
            }
            return currentCol;
          }


  const CollectionsItems = () => {

      return colsData.error ? (
          <Error />
        ) : colsData.load ? (
              <Grid container>
                  {
                  colsData.data[0].map((mmTop,index) => (
                      <Grid xs={12} md item key={`mm-column-${index}`}>
                          <Box pt={3} pb={1} component="div"><Typography variant="h3">{mmTop.title}</Typography></Box>
                          <div className={colsData.data[mmTop.id].length>10 ? classes.columns : ''}>
                          {
                          colsData.data[mmTop.id] && (
                            colsData.data[mmTop.id].map((mmSub,index2) => (
                                  <Box component="div" key={`CollectionItem${index2}`}>
                                      <NavLink to={`/collections/${mmSub.slug}`}>
                                          {mmSub.title}
                                      </NavLink>
                                  </Box>                            
                              ))
                          )
                          }
                          </div>
                      </Grid>
                  ))
                  }
                                          
              </Grid>
      ) : (
          <Loader />
      );
  }


  return (
    <React.Fragment>
      <CurrentProductContextProvider>

        <Breadcrumbs currentCol={{title: currColData.title, url: currColData.slug}} currentCat={ currColData.slug}  isShowProduct={currProductSlug ? true : false}/>
        <div className={classes.pageContainer}>
        
        {
        props.match.params.product ? (
          <React.Fragment>
            <ProductDisplay productSlug={currProductSlug}/>
          </React.Fragment>
        ) :(
          currColSlug ? (
            (productsData.load && productsData.data.length>0) ?
              (
                <React.Fragment>
                  <Box component="div" p={2}><Typography variant="h1">{currColData.title} collection</Typography></Box>
                  <ProducstList productsData={productsData.data} currentCat={currColSlug} urlBase="collections"/>
                </React.Fragment>
              )
            :
              (productsData.load ? <FourtyFour msg="Sorry, no products found"/> : <Loader/>)
          ) : (
            <CollectionsItems/>
          )

        )}
        <Box component="div" p={5}></Box>
        
        </div>
      </CurrentProductContextProvider>
      <FooterContactBanner/>
    </React.Fragment>
  )
}

export default withRouter(withStyles(styles)(Collections));