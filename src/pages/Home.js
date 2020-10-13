import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core';
import styles from './HomeStyles';


import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

import ProducstList from '@/components/products/ProductsList';
import CatstList from '@/components/products/CatsList';

import "@/assets/css/carousel.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import {Hidden, Grid, Typography} from '@material-ui/core';

import FooterContactBanner from '@/components/layout/FooterContactBanner';

import bgMainTop1 from '@/assets/images/bg-main-top-1.jpg';
import bgMainTop2 from '@/assets/images/bg-main-top-2.jpg';

function Home(props) {

  const {classes} = props;


  const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '/?page=home';
  const pageData = UseDataApi(PAGE_API_URL);

  const PRODUCTS_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PRODUCTS;
  const productsData = UseDataApi(PRODUCTS_API_URL);
  
  const BROCHURES_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_BROCHURES;
  const brochuresData = UseDataApi(BROCHURES_API_URL);


  const carouselConfig = () => ({
    showThumbs:  false,
    showArrows: true,
    showStatus: false,
    infiniteLoop: true,
    autoPlay: true,
    swipeable: true,
    interval: 3000,
    transitionTime: 700,
    dynamicHeight: false,
    stopOnHover: true
  });


  return (
    <React.Fragment>
        <div className={classes.carouselContainer}>
            {
            (pageData.load && ! pageData.error) ? (
              <div className={classes.topHeader}>
                <h1><div dangerouslySetInnerHTML={{__html: pageData.data.mainPageHeader}} /></h1>
                <Hidden smDown>
                  <div  className={classes.topText} dangerouslySetInnerHTML={{__html: pageData.data.content}} />
                </Hidden>
              </div>
            ) : (
              ''
            )
            }
          <Carousel {...carouselConfig()}>
            <div>
                <img src={bgMainTop1} alt="Aquatica main page pic 1" />
            </div>
            <div>
                <img src={bgMainTop2} alt="Aquatica main page pic 2" />
            </div>
          </Carousel>
        </div>

        <Hidden mdUp>
          <div className={classes.topTextMobile}>
            {
            (pageData.load && ! pageData.error) ? (
              <div dangerouslySetInnerHTML={{__html: pageData.data.content}} />
            ) : (
              <span></span>
            )
            }
          </div>
          </Hidden>


      <Grid container className={classes.rangeProducts}>
        <Grid item xs={12} md={8} container className={classes.rangeProductsText}>
          <Typography variant="h2" component="h2">We have a wide range of products</Typography>
        </Grid>
        <Grid item xs={12} md={4} container className={classes.rangeProductsButton} >
          <NavLink to="/products" className={classes.aButtonBrown}>All products</NavLink>
        </Grid>
      </Grid>


      <CatstList catsParent="0"/>


      <Grid container className={classes.rangeProducts}>
        <Grid item xs={12} container className={classes.rangeProductsText}>
          <Typography variant="h2" component="h2">Latest Releases</Typography>
        </Grid>
      </Grid>


      {
        productsData.error ? (
          <Error />
        ) : productsData.load ? (
                <ProducstList productsData={productsData.data}/>
        ) : (
          <Loader />
        )
      }


      <Grid container className={classes.brochuresRoot} direction="column" alignItems="stretch" justify="flex-start">
          <Grid item className={classes.brochuresHeaderContainer}>
              <Typography variant="h1">Download one of<br/>our brochures!</Typography>
          </Grid>
          <Grid item container alignItems="flex-end" justify="flex-start">
            {
            brochuresData.error ? (
              <Error />
            ) : brochuresData.load ? (
              brochuresData.data.map((brochure,index)=>(
                
                <Grid item xs={12} md={2} className={classes.brochureRootContainer} key={`brochure${index}`} >
                  <a href={brochure.file} target="_blank" rel="noopener noreferrer" title={brochure.title} className={classes.aNone}>
                    <div className={classes.brochureContainer}>
                      <div>{brochure.title}</div>
                      <span>Click to view</span>
                    </div>
                  </a>
                </Grid>
              ))
            ) : (
              <Loader />
            )
            }
          </Grid>
      </Grid>



      <Grid container className={classes.rangeProducts}>
        <Grid item xs={12} md={8} container className={classes.rangeProductsText}>
          <Typography variant="h2" component="h2">Testimonials</Typography>
        </Grid>
        <Grid item xs={12} md={4} container className={classes.rangeProductsButton} >
          <a href="/about-us" className={classes.aButtonBrown}>See more</a>
        </Grid>
      </Grid>

      {
      (pageData.load && ! pageData.error) ? (
        <Grid container alignItems="stretch">
          <Grid item xs={12} md={6} className={classes.quote1} dangerouslySetInnerHTML={{__html: pageData.data.quote1}}>
          </Grid>
          <Grid item xs={12} md={6} className={classes.quote2} dangerouslySetInnerHTML={{__html: pageData.data.quote2}}>
          </Grid>
        </Grid>
      ) : (
        <span></span>
      )
      }
      <FooterContactBanner/>

    </React.Fragment>
  );
}

export default withRouter(withStyles(styles)(Home));
