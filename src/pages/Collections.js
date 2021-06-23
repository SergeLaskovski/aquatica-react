import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';


import {CurrentProductContextProvider} from '@/context/current-product-context';
import {CollectionsContext} from '@/context/collections-context';

import Breadcrumbs from '@/components/products/Breadcrumbs';

import ProducstList from '@/components/products/ProductsList';
import ProductDisplay from '@/components/products/ProductDisplay';

import LandingPageImage from '@/components/layout/LandingPageImage';

import {withStyles} from '@material-ui/core';
import styles from './CollectionsStyles';
import {Grid, Typography, Box} from '@material-ui/core';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import FourtyFour from '@/components/FourtyFour';


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


  const CollectionsMainPage = () => {
    
    const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '?page=collections';
    const pageData = UseDataApi(PAGE_API_URL);

    return pageData.error ? (
          <Error />
        ) : pageData.load ? (
            <React.Fragment>
                <Box component="div">
                    <img 
                        src={pageData.data.img} alt="Collections"
                        className={classes.imgSuperFluid}
                    />
                </Box>
                <Grid container>
                    <Grid item xs={12} md={6} container alignItems="center">
                        <Typography variant="h1" component="div">
                            <Box p={8}>Collections</Box>
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

  const CollectionsItems = () => {

      return colsData.error ? (
          <Error />
        ) : colsData.load ? (
              <Grid container>
                  {
                  colsData.data[0].map((collectionHeader,index) => (
                      <Grid xs={12} item key={`collectionHeader-${index}`}>
                          <Box pt={4} pb={1} component="div"><Typography variant="h1">{collectionHeader.title}</Typography></Box>
                          <Grid container className={classes.catsContainer} alignItems="stretch" justify="flex-start">
                          {
                          colsData.data[collectionHeader.id] && (
                            colsData.data[collectionHeader.id].map((collection,index2) => (
                              <Grid item className={classes.catItemContainer} key={`collection-${index2}`}>
                                <Box className={classes.hoverCard}>
                                  <NavLink to={`/collections/${collection.slug}`} className={classes.aNone}>
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
                                        style={{backgroundImage: 'url("' + collection.img + '")'}}
                                      >
                                      </Grid>
                                      <Grid item container 
                                        direction="column"
                                        justify="space-between"
                                        alignItems="stretch"
                                        className={classes.flexGrow}
                                      >
                                        <Box component="div" px={3} pt={3}>
                                          <Typography variant="h4" dangerouslySetInnerHTML={{__html: collection.title}}></Typography>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  </NavLink>
                                </Box>
                              </Grid>                          
                              ))
                          )
                          }
                          </Grid>
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
        
        {
        props.match.params.product ? (
          <React.Fragment>
            <Box component="div" p={6}>
              <ProductDisplay productSlug={currProductSlug}/>
            </Box>
          </React.Fragment>
        ) :(
          currColSlug ? (
            productsData.load ?
              productsData.data.length>0 ? 
              (
                <React.Fragment>
                    <LandingPageImage img={`/Collections/Landing Pages/${currColData.title}.jpg`} title={`${currColData.title} collection`}/>
                    <Box component="div" p={6}>
                      <ProducstList productsData={productsData.data} currentCat={currColSlug} urlBase="collections"/>
                    </Box>
                </React.Fragment>
              ) : (
                <FourtyFour msg="Sorry, no products"/>
              )
            :
              <Loader/>
          ) : (
            <React.Fragment>
              <CollectionsMainPage/>
              <Box component="div" p={6}><CollectionsItems/></Box>
            </React.Fragment>
          )

        )}
        <Box component="div" p={6}></Box>
        
      </CurrentProductContextProvider>
    </React.Fragment>
  )
}

export default withRouter(withStyles(styles)(Collections));