import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core';
import styles from './HomeStyles';


import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

import ProductCard from '@/components/products/ProductCard';
import CatstList from '@/components/products/CatsList';

import "@/assets/css/carousel.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import ScrollMenu from 'react-horizontal-scrolling-menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {Hidden, Grid, Typography, Box} from '@material-ui/core';


function Home(props) {

  const {classes} = props;


  const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '/?page=home';
  const pageData = UseDataApi(PAGE_API_URL);

  const PRODUCTS_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PRODUCTS + '/?getnum='+pageData.data.homeProductsQty;
  const productsData = UseDataApi(PRODUCTS_API_URL);
  
  const BROCHURES_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_BROCHURES;
  const brochuresData = UseDataApi(BROCHURES_API_URL);

  const TESTIMONIAL_API_URL = process.env.REACT_APP_API_BASE + '/testimonials';
  const testimonialsData = UseDataApi(TESTIMONIAL_API_URL);

  //config carousel for featured images
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
    stopOnHover: true,
    showIndicators: false
  });

  let testimonialsRandom = [];
  if(testimonialsData.load && !testimonialsData.error){
    testimonialsRandom = testimonialsData.data
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  return (
    <React.Fragment>

      {
        (pageData.load && !pageData.error) ? (
          <React.Fragment>
            <div className={classes.carouselContainer}>
              <div className={classes.topHeader}>
                <Typography variant="h1"><div dangerouslySetInnerHTML={{__html: pageData.data.mainPageHeader}} /></Typography>
                <Hidden smDown>
                  <div  className={classes.topText} dangerouslySetInnerHTML={{__html: pageData.data.content}} />
                </Hidden>
              </div>
              <Carousel {...carouselConfig()}>
                {
                  pageData.data.featuredImgs.map((featuredImg, index) => (
                    <div key="Aquatica main page pic {index}">
                      <img src={featuredImg.full} alt={`Aquatica main page pic ${index}`} />
                    </div>
                  ))
                }
              </Carousel>
            </div>

            <Hidden mdUp>
              <div className={classes.topTextMobile}>
                  <div dangerouslySetInnerHTML={{__html: pageData.data.content}} />
              </div>
            </Hidden>
          </React.Fragment>
        ) : ''
      }



      <Grid container className={classes.rangeProducts}>
        <Grid item xs={12} md={8} container className={classes.rangeProductsText}>
          <Typography variant="h2" component="h2">We have a wide range of products</Typography>
        </Grid>
        <Grid item xs={12} md={4} container className={classes.rangeProductsButton} >
          <NavLink to="/products" className={classes.aButtonBrown}>All products</NavLink>
        </Grid>
      </Grid>


      <CatstList catsParent="0"/>

      {
        (pageData.load && !pageData.error && pageData.data.bannerImg && pageData.data.bannerHeader) ? (
          <Box pt={8} pb={2}>
            <Grid container>
              <Grid item xs={12} md={6}>
                  <Box component="div">
                      <img 
                          src={pageData.data.bannerImg} alt={pageData.data.bannerHeader}
                          className={classes.imgSuperFluid}
                      />
                  </Box>
              </Grid>
              <Grid item container xs={12} md={6} alignItems="center">
                  <Box px={8} pt={6} pb={2}>
                    <Typography variant="h2" component="h2">
                        <Box pb={4} dangerouslySetInnerHTML={{__html: pageData.data.bannerHeader}}/>
                    </Typography>
                    <Typography variant="body2" component="div">
                      <Box pb={6} dangerouslySetInnerHTML={{__html: pageData.data.bannerText}}/>
                    </Typography>
                    {
                      pageData.data.bannerLink && (
                        pageData.data.bannerLink.startsWith("http") ? 
                          (<NavLink to={pageData.data.bannerLink} className={classes.aButtonBrown} >Learn more</NavLink>)
                          :
                          (<a href={pageData.data.bannerLink} className={classes.aButtonBrown} >Learn more</a>)
                      )
                    }
                  </Box>

              </Grid>
            </Grid>
          </Box>
        ) : ''
      }

      <Grid container className={classes.rangeProducts}>
        <Grid item xs={12} container className={classes.rangeProductsText}>
          <Typography variant="h2" component="h2">Latest Releases</Typography>
        </Grid>
      </Grid>

      {
        productsData.error ? (
          <Error />
        ) : productsData.load ? (
          <ScrollMenu
            arrowLeft={<ChevronLeftIcon classes={{"root":classes.scrollChevron}}/>}
            arrowRight={<ChevronRightIcon classes={{"root":classes.scrollChevron}}/>}
            hideSingleArrow={true}
            arrowDisabledClass={classes.arrowDisabledClass}
            data={
               productsData.data.map((productData, index) => (
                  <ProductCard product={productData} fullWidth key={`HomeProductCard${index}`}/>
                ))
            }
            />

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
                  <a href={`${process.env.REACT_APP_BASE_URL}/assets/brochures/${brochure.folder}/index.html`} target="_blank" rel="noopener noreferrer" title={brochure.title} className={classes.aNone}>
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
          <NavLink to="/testimonials" className={classes.aButtonBrown} >See more</NavLink>
        </Grid>
      </Grid>

      {
        (testimonialsData.load && ! testimonialsData.error) ? (
          <React.Fragment>
            <Grid container alignItems="stretch">
              <Grid item xs={12} md={6} className={classes.quote1}>
                <Box dangerouslySetInnerHTML={{__html: testimonialsRandom[0]['content']['rendered']}}></Box>
                <br/>
                <Box fontWeight="bold" dangerouslySetInnerHTML={{__html: testimonialsRandom[0]['title']['rendered']}}></Box>
              </Grid>
              <Grid item xs={12} md={6} className={classes.quote2}>
                <Box dangerouslySetInnerHTML={{__html: testimonialsRandom[1]['content']['rendered']}}></Box>
                <br/>
                <Box fontWeight="bold" dangerouslySetInnerHTML={{__html: testimonialsRandom[1]['title']['rendered']}}></Box>
              </Grid>
            </Grid>
          </React.Fragment>

        ) : (
          <span></span>
        )
      }

    </React.Fragment>
  );
}

export default withRouter(withStyles(styles)(Home));
