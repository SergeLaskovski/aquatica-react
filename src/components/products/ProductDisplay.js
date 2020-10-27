import React from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core';
import styles from './ProductDisplayStyles';

import {CurrentProductContext} from '@/context/current-product-context';
import {CollectionsContext} from '@/context/collections-context';

import {Grid, Typography, Box} from '@material-ui/core';

import "@/assets/css/carousel.css"; 
import { Carousel } from 'react-responsive-carousel';
import CatsList from '@/components/products/CatsList';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import FourtyFour from '@/components/FourtyFour';

import GetAppIcon from '@material-ui/icons/GetAppOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';


function Products(props) {

  
  const {classes, productSlug} = props;
  const PRODUCT_API_URL =
  process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PRODUCT + '?product=' + productSlug;
  const productData = UseDataApi(PRODUCT_API_URL);

  //update context for breadcrumbs
  const {updateCurrProdContext} = React.useContext(CurrentProductContext);
  React.useEffect(() => {
    if(productData.load && productData.data[0]){
      updateCurrProdContext( productData.data[0].title, productData.data[0].slug )
    }
  // eslint-disable-next-line
  }, [productData.load]);
  
  
  const carouselConfig = () => ({
    showThumbs:  false,
    showArrows: true,
    showStatus: false,
    infiniteLoop: true,
    autoPlay: true,
    swipeable: true,
    interval: 5000,
    transitionTime: 700,
    dynamicHeight: false,
    stopOnHover: true
  });

  const colsData = React.useContext(CollectionsContext);

  const getCollectionSlug = (colName) => {
    let colsObj = {};
    colsObj = colsData.data;
    let currentColSlug = '';
    for (let key in colsObj) {
      if (colsObj.hasOwnProperty(key)) {
          // eslint-disable-next-line
          colsObj[key].forEach((item)=>{
            if(item.title === colName){  currentColSlug =  item.slug }
          })
      }
    }
    return currentColSlug;
  }

  const drawStars = (stars=0) =>{
    let starsArr = [];
    for( let i=1; i<6; i++ ){
      starsArr.push( (i<=stars) ? true : false);
    }
    return (
      <React.Fragment>
        {
        starsArr.map((starItem, index) => (
          <span key={`star${index}`} className={starItem ? classes.starBlack : classes.starGrey}>&#9733;</span>
        ))
        }
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
    {
      productData.error ? (
        <Error />
      ) : productData.load ? (
        productData.data.map((product,index)=>(
          <Grid container key={`product${index}`}>
            <Grid item xs={12} md={5}>
              <Box component="div" p={0} className={classes.carouselBox}>
                <Carousel {...carouselConfig()}>
                  {
                    product.img.map((img,imgIndex)=>(
                      <div key={`productImage${imgIndex}`}>
                          <img src={img} className={classes.imgProduct} alt={product.title}/>
                      </div>
                    ))
                  }
                </Carousel>
              </Box>
            </Grid>
            <Grid container item xs={12} md={7} className={classes.productInfoContainer}>
              <Grid item md className={classes.flexGrow}>
                <Typography variant="h2">{product.title}</Typography>
                <Box component="div" py={3}>
                  <Typography component="span" variant="body2">Stock Code:</Typography> <Typography  component="span"  variant="subtitle2">{product.code}</Typography>
                </Box>
                <Box component="div" className={classes.infoBoxOuter}>
                  <Box component="div" className={classes.infoBoxWrapper}>
                    <Box component="div" className={classes.infoBox}>
                        {
                          product.colour &&
                            <Box component="div" pt={1}>
                              <span className={classes.bullet}>&#8226;</span>{product.colour}
                            </Box>
                        }
                        {
                          product.assembly&&
                            <Box component="div" pt={1}>
                              <span className={classes.bullet}>&#8226;</span>{product.assembly}
                            </Box>
                        }
                        {
                          product.pressure &&
                            <Box component="div" pt={1}>
                              <span className={classes.bullet}>&#8226;</span>{product.pressure}
                            </Box>
                        }
                        {
                        product.wels &&
                          <Box pt={2}>
                            <Grid container spacing={2}>
                                <Grid item>
                                  <Box fontWeight="bold" className={classes.starBlack}>WELS Raiting</Box>
                                </Grid>
                                <Grid item>
                                  { product.wels.mains>0 && (
                                    <div>
                                      {product.wels.mains} Star Mains Pressure
                                    </div>
                                    )
                                  }
                                  { product.wels.low>0 && (
                                    <div>
                                      {product.wels.low} Star Low Pressure
                                    </div>
                                    )
                                  }
                                </Grid>
                                <Grid item>
                                  { product.wels.mains>0 && (
                                    <div>
                                      {drawStars(product.wels.mains)}
                                    </div>
                                    )
                                  }
                                  { product.wels.low>0 && (
                                    <div>
                                      {drawStars(product.wels.low)}
                                    </div>
                                    )
                                  }
                                </Grid>
                            </Grid>
                          </Box>
                        }
                        {
                          product.cartridge &&
                            <Box component="div" pt={2}>
                              <Box component="span" fontWeight="bold">Cartridge/Mechanism:</Box> {product.cartridge}
                            </Box>
                        }

                        {
                          product.short &&
                            <Box component="div" pt={2}  dangerouslySetInnerHTML={{__html: product.short}}></Box>
                        }
                        {
                          product.description &&
                            <Box component="div" pt={2}  dangerouslySetInnerHTML={{__html: product.description}}></Box>
                        }
                    </Box>
                  </Box>
                </Box> 

              </Grid>

              <Grid item xs={12}>
                <Box py={2}>
                  <Grid container spacing={2} >
                    <Grid item>
                      <a href={`${process.env.REACT_APP_BASE_URL}/assets/doc/Aquatica Warranty 02020191.pdf`} target="_blank" rel="noopener noreferrer" title={product.title} className={`${classes.aButtonBlack} ${classes.justfyStart}`}>
                        <GetAppIcon fontSize="small"/>&nbsp;&nbsp;Warranty info
                      </a>
                    </Grid>
                    <Grid item>
                      <NavLink to={`#`} title={product.title} className={`${classes.aButtonBlack} ${classes.justfyStart}`}>
                        <ShoppingCartIcon fontSize="small"/>&nbsp;&nbsp;Add to Whishlist
                      </NavLink>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>


              {/*
              product.wels &&
              <Grid item md>
                <Box align="center">
                  <img src={product.wels.img} alt="WELS raiting" className={classes.welsImg}/>
                  {product.wels.desc}
                </Box>
              </Grid>
              */}
            </Grid>
            {
              //display options and spare parts if any
             
              product.options_spare &&
              <Grid item xs={12}>
                <Box p={3}>
                  <Box p={3}><Typography variant="h2">Options and spare parts</Typography></Box>
                  {product.options_spare}
                </Box>
              </Grid>
            }
            {
              //display related categories if any
             
              product.related &&
              <Grid item xs={12}>
                <Box p={3}>
                  <Box p={3}><Typography variant="h2">Realted products</Typography></Box>
                  <CatsList catsNamesStr={product.related}/>
                </Box>
              </Grid>
            }
          </Grid>
     
        ))
      ) : (
        <Loader />
      )
    }
    {productData.data.length<1 && productData.load && <FourtyFour msg="No product found"/>}
    </React.Fragment>
  )
}

export default withRouter(withStyles(styles)(Products));