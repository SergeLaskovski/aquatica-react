import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core';
import styles from './ProductsListStyles.js';

import {Grid, Typography, Box} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

const ProductCard = (productProps) => {


    const {classes, product, currentCat, fullWidth} = productProps;

    let urlBase = '/products';
    if(productProps.urlBase){urlBase="/"+productProps.urlBase;}
    if(productProps.urlBase === 'factory-shop'){urlBase="";}
    
    const [anchorElDesc, setAnchorElDesc] = React.useState(null);
    const openDescPop = Boolean(anchorElDesc);
    const popDescId = openDescPop ? 'desc-popover' : undefined;

    const handleDescPop = (event) =>{
      event.preventDefault();
      event.stopPropagation();
      setAnchorElDesc(event.currentTarget);
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

    return (
      <Grid item className={fullWidth ? classes.fullWidthContiner : classes.catItemContainer}>
        <Box className={classes.hoverCard}>
            <Box pr={2} 
              className={classes.closeBtn}
              onMouseEnter={(event)=>handleDescPop(event)}
              onMouseLeave={()=>setAnchorElDesc(null)}
              aria-describedby={popDescId}
            >
              &#43;
            </Box>
            <Popover
                className={classes.popoverContainer}
                id={popDescId}
                open={openDescPop}
                anchorEl={anchorElDesc}
                onClose={()=>setAnchorElDesc(null)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                classes={{ paper: classes.popoverContent }}
                PaperProps={{onMouseLeave: ()=>setAnchorElDesc(null),onMouseEnter: (event)=>handleDescPop(event)}}
            >
              <Box p={5} className={classes.popoverContent}>
                        {/*
                          product.colour &&
                            <Box component="div" pt={1}>
                              <Box component="span" fontWeight="BOld">Colour:</Box> {product.colour}
                            </Box>
                        */}
                        {
                          product.pressure &&
                            <Box component="div" pt={1}>
                              <Box component="span" fontWeight="BOld">Pressure:</Box>  {product.pressure}
                            </Box>
                        }
                        {
                        product.wels &&
                          <Box pt={2}>
                            <Box fontWeight="bold" className={classes.starBlack}> WELS Raiting</Box>
                            <Box pl={2}>

                              { product.wels.mains>0 && (
                                <div>
                                  {product.wels.mains} Star Mains Pressure
                                </div>
                                )
                              }
                              { product.wels.mains>0 && (
                                <div>
                                  {drawStars(product.wels.mains)}
                                </div>
                                )
                              }
                              { product.wels.low>0 && (
                                <div>
                                  {product.wels.low} Star Low Pressure
                                </div>
                                )
                              }
                              { product.wels.low>0 && (
                                <div>
                                  {drawStars(product.wels.low)}
                                </div>
                                )
                              }
                             </Box>
                          </Box>
                        }
                        {
                          product.short &&
                            <Box component="div" pt={2}  dangerouslySetInnerHTML={{__html: product.short}}></Box>
                        }
                        <Box>
                          <NavLink to={`${urlBase}/${currentCat ? currentCat : product.catSlug}/${product.slug}`}>
                            more info
                          </NavLink>
                        </Box>
              </Box>
          </Popover>
          <NavLink to={`${urlBase}/${currentCat ? currentCat : product.catSlug}/${product.slug}`} className={classes.aNone}>
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
              >
              </Grid>
              <Grid item container 
                direction="column"
                justify="space-between"
                alignItems="stretch"
                className={classes.flexGrow}
              >
                <Box component="div" px={3} pt={3}>
                  <Typography variant="h4" dangerouslySetInnerHTML={{__html: product.title}}></Typography>
                </Box>
                <Box component="div" px={3} py={1}>
                  <Box component="div" fontStyle="italic">
                    <Typography component="div" variant="caption">{product.code}</Typography>
                  </Box>
                  {/*
                  <Typography component="div" variant="caption">colour {product.colour}</Typography>
                  <Typography component="div" variant="caption">shape {product.shape}</Typography>
                  <Typography component="div" variant="caption">pressure {product.pressure}</Typography>
                  <Typography component="div" variant="caption">{product.related}</Typography>
                  <Typography component="div" variant="caption">{product.priority}</Typography>
                  <Typography component="div" variant="caption">{product.options_spare}</Typography>
                  <Typography component="div" variant="caption">{product.range}</Typography>
                  <Typography component="div" variant="caption">{product.description}</Typography>
                  <Typography component="div" variant="caption">{product.short}</Typography>
                    <Typography component="div" variant="caption">{product.short}</Typography>
                  */}
                  
                </Box>
              </Grid>
            </Grid>
          </NavLink>
        </Box>
      </Grid>
    )
}

export default withRouter(withStyles(styles)(ProductCard));