import React from 'react';

import {NavLink,withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core';
import styles from './ProductDisplayStyles';

import {CurrentProductContext} from '@/context/current-product-context';
import {CollectionsContext} from '@/context/collections-context';
import {CategoriesContext} from '@/context/categories-context';


import {Grid, Typography, Box} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import GetAppIcon from '@material-ui/icons/GetAppOutlined';
//import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import AddToWish from '@/components/layout/AddToWish';
import AddToCompare from '@/components/layout/AddToCompare';

import "@/assets/css/carousel.css"; 
import { Carousel } from 'react-responsive-carousel';
import CatsList from '@/components/products/CatsList';
import ProductsList from '@/components/products/ProductsList';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import FourtyFour from '@/components/FourtyFour';



function Products(props) {

  const {classes, productSlug} = props;
  let facShop = false;
  if(props.match.path.startsWith('/factory-shop/')){
    facShop = true;
  }

  const PRODUCT_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PRODUCT + '?product=' + productSlug;
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

  //get category PDF
  const catData = React.useContext(CategoriesContext);

  const getCatPdf = (catSlug) => {
    
    let pdfLink = '';
    let catsObj = {};
    catsObj = catData.data;
    for (let key in catsObj) {
      if (catsObj.hasOwnProperty(key)) {
          // eslint-disable-next-line
        catsObj[key].forEach((item)=>{
          if(item.slug === catSlug){
            pdfLink =  item.pdf;
          }
        });
      }
    }
    return pdfLink;
    
  }

  const drawStars = (stars=0) =>{
    let starsArr = [];
    for( let i=1; i<7; i++ ){
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

  
  const [anchorElWels, setAnchorElWels] = React.useState(null);
  const openWelsPop = Boolean(anchorElWels);
  const popWelsId = openWelsPop ? 'wels-popover' : undefined;

  const handleWelsPop = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    setAnchorElWels(event.currentTarget);
  }


  //spare parts
  const SpareParts = (spareProps) => {

    const PRODUCT_SPARE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PRODUCTS + '?list=' + spareProps.spareList;
    const productSpareData = UseDataApi(PRODUCT_SPARE_API_URL);
    
    return (
      <React.Fragment>
        {
          productSpareData.error ? (
            <Error />
          ) : productSpareData.load ? (
                  <ProductsList productsData={productSpareData.data}/>
          ) : (
            <Loader />
          )
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
                <Typography variant="h2" dangerouslySetInnerHTML={{__html: product.title}}></Typography>
                <Box component="div" py={3}>
                  <Typography component="span" variant="body2">Stock Code:</Typography> <Box component="span" fontStyle="italic"><Typography  component="span"  variant="caption">{product.code}</Typography></Box>
                </Box>
                <Box component="div" className={classes.infoBoxOuter}>
                  <Box component="div" className={classes.infoBoxWrapper}>
                    <Box component="div" className={classes.infoBox}>
                    {
                  (product.price && facShop) ?
                    <Box component="div" display="flex" justifyContent="flex-end" alignItems="center">
                      <Typography variant="h4" component="div">$ {product.price} NZD</Typography>
                      {/*
                      <Box component="div" ml={2}>
                        <a href={`${process.env.REACT_APP_BASE_URL}/cms/?add-to-cart=${product.id}&quantity=1`} target="_blank" rel="noopener noreferrer" title={product.title} className={`${classes.aButtonBlack}`}>
                          <ShoppingCartIcon fontSize="small"/>&nbsp;&nbsp;Add to Cart
                        </a>
                      </Box>
                      */}
                    </Box>
                    : ''
                }
                        {/*
                          product.colour &&
                            <Box component="div" pt={1}>
                              <span className={classes.bullet}>&#8226;</span>{product.colour}
                            </Box>
                        */}
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
                                  <Box 
                                    fontWeight="bold"
                                    className={classes.starBlack}
                                  >
                                    <a href="/#" 
                                      onClick={(event)=>handleWelsPop(event)}
                                      aria-describedby={popWelsId}
                                    >
                                        WELS rating
                                    </a>
                                    <Popover
                                      id={popWelsId}
                                      open={openWelsPop}
                                      anchorEl={anchorElWels}
                                      onClose={()=>setAnchorElWels(null)}
                                      anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                      }}
                                      transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                      }}
                                      classes={{ paper: classes.popover }}
                                    >
                                        <Grid container alignItems="center" justify="center" spacing={2}>
                                          <Grid item>
                                            <img src={product.wels.img} alt="WELS raiting" className={classes.welsImg}/>
                                          </Grid>
                                          <Grid item>
                                            <Box textAlign="center" dangerouslySetInnerHTML={{__html: product.wels.desc}}></Box>
                                          </Grid>
                                        </Grid>
                                        <span className={classes.closeBtn} onClick={()=>setAnchorElWels(null)}>&#215;</span>
                                    </Popover>
                                  </Box>
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
                            <Box component="div" pt={0} fontSize=".7rem">
                              <a href={`${process.env.REACT_APP_BASE_URL}/assets/doc/what-is-WELS.pdf`} target="_blank" rel="noopener noreferrer" title='What is WELS anyway?' >What is WELS anyway?</a>
                            </Box>
                          </Box>
                        }
                        {
                          product.stockStatus &&
                            <Box component="div" pt={2}>
                              {product.stockStatus}{product.oosNarration}
                            </Box>
                        }
                        {
                          product.cartridge && product.cartridge.trim().startsWith('SP') &&
                            <Box component="div" pt={2}>
                              <Box component="span" fontWeight="bold">Cartridge/Mechanism:</Box> <Box component="span" fontStyle="italic"><Typography  component="span"  variant="caption">{product.cartridge}</Typography></Box>
                            </Box>
                        }
                        {
                          getCatPdf(product.catSlug) &&
                            <Box component="div" pt={2}>
                              <a href={getCatPdf(product.catSlug)} target="_blank" rel="noopener noreferrer" title='compare all models' >Click here to compare all models</a>
                            </Box>
                        }
                        {
                          product.range &&
                            <Box component="div" pt={2}>
                              <Box component="span" fontWeight="bold">
                                View the entire <NavLink to={`/collections/${getCollectionSlug(product.range)}`}>{product.range}</NavLink> range
                              </Box> 
                            </Box>
                        }

                        {
                          product.short&&
                            <Box component="div" fontStyle="italic" pt={2}  dangerouslySetInnerHTML={{__html: product.short}}></Box>
                        }
                        {
                          product.description &&
                            <Box component="div" fontStyle="italic" pt={2}  dangerouslySetInnerHTML={{__html: product.description}}></Box>
                        }
                    </Box>
                  </Box>
                </Box> 

              </Grid>
                          
              <Grid item xs={12}>
                <Box py={2} component="div" style={{display: 'inline-block'}}>
                  <Grid container spacing={2} justify="flex-start">
                    <Grid item>
                      <a href={`${process.env.REACT_APP_BASE_URL}/assets/doc/Aquatica Warranty 02020191.pdf`} target="_blank" rel="noopener noreferrer" title={product.title} className={`${classes.aButtonBlack} ${classes.justfyStart}`}>
                        <GetAppIcon fontSize="small"/>&nbsp;&nbsp;Warranty info
                      </a>
                    </Grid>
                    <Grid item>
                      {product.techSheet.length>0 &&
                        <a href={product.techSheet} target="_blank" rel="noopener noreferrer" title={product.title} className={`${classes.aButtonBlack} ${classes.justfyStart}`}>
                          <GetAppIcon fontSize="small"/>&nbsp;&nbsp;Technical info
                        </a>
                    }
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} justify="flex-start">
                    <Grid item xs={6}>
                      <AddToWish productCode={product.code} productTitle={product.title}/>
                    </Grid>
                    <Grid item xs={6}>
                      <AddToCompare productCode={product.code} productTitle={product.title}/>
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
                    <SpareParts spareList={product.options_spare}/>
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
    {(productData.data.length<1 && productData.load) && <FourtyFour msg="No product found"/>}
    </React.Fragment>
  )
}

export default withRouter(withStyles(styles)(Products));