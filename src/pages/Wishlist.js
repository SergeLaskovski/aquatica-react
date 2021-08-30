import React from 'react';
import axios from 'axios';
import {NavLink, withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core';
import styles from './WishlistStyles.js';
import {Grid, Typography, Box} from '@material-ui/core';

import {UserContext} from '@/context/user-context';
import {WishlistContext} from '@/context/wishlist-num-context';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

function Wishlist(props) {

    const {classes} = props;

    const {loggedUser} = React.useContext(UserContext);

 
    const WISHLIST_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PRODUCTS + "?wishlist="+loggedUser;
    const wishlistData = UseDataApi(WISHLIST_API_URL);

    var wishlistDisplay4Print = [];

    const WishlistItems = (wishProps) => {

        let {updateWishNum} = React.useContext(WishlistContext);

        const [wishlistDisplay, setWishlistDisplay] = React.useState(wishProps.wishlistData);
        wishlistDisplay4Print = wishlistDisplay;

        const removeWishHandler = (event,whishItem) =>{

            event.preventDefault();
            event.stopPropagation();
    
            if(loggedUser){
                const WISHLIST_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_WISHLIST + "?username="+loggedUser+"&remove="+whishItem;
                let newWishlistDisplay = [];
                               
                axios
                    .get(WISHLIST_API_URL)
                    .then((res) => {
                        wishlistDisplay.map((searchProduct) => {
                            if(searchProduct.code !== whishItem){
                                newWishlistDisplay.push(searchProduct);
                            }
                            return true;
                        })
                        updateWishNum(-1);
                        setWishlistDisplay(newWishlistDisplay);

                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }
        }


        return (
            <Grid container>
                {
                wishlistDisplay.map((product,index)=>(
                    <React.Fragment key={`wish${index}`}>
                        <Grid item xs={2}>
                            <Box mt={{xs: 4, md: 2}} mb={{xs: 2, md: 2}} className={classes.imgContainer}>
                                <img src={product.img} alt={product.name} className={classes.wishProductImg} style={{display:"block"}}/>
                            </Box>
                        </Grid>
                        <Grid item container xs={8}
                            direction="column"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Box py={2} px={{xs:2}}>
                                <Box fontWeight="Bold">
                                    <NavLink exact to={`/products/${product.catSlug}/${product.slug}`}>
                                        <Typography variant="h3" dangerouslySetInnerHTML={{__html: product.title}}></Typography>
                                    </NavLink>
                                    <Typography component="span" variant="body1">Stock Code:</Typography> <Box component="span" fontStyle="italic"><Typography  component="span"  variant="caption">{product.code}</Typography></Box>
                                </Box>
                                {
                                product.short &&
                                    <Box component="div" pt={2}  dangerouslySetInnerHTML={{__html: product.short}}></Box>
                                }
                                {
                                product.description &&
                                    <Box component="div" pt={2}  dangerouslySetInnerHTML={{__html: product.description}}></Box>
                                }
                            </Box>
                        </Grid>
                        <Grid item container xs={12} md={2}
                            justify="center"
                            className={classes.removeLinkContainer}
                        >
                            <a href="/#" id='remove-item' onClick={(event)=>removeWishHandler(event,product.code)}>Remove</a>
                                
                        </Grid>
                    </React.Fragment>
                ))
                }
            </Grid>
        )
    }

    function printDiv(event,  wishlistDisplay) {

        event.preventDefault();
        event.stopPropagation();
        
        var printContents='';
        wishlistDisplay.map((product,index)=>{
            printContents += '<div style="display: flex; align-items: center; margin-top: 30px; border-bottom: 1px solid #CCCCCC;"><div><img src="'+product.img+'" width="300"></div><div><div><strong>'+product.title+'</strong></div><div>'+product.code+'</div><div>'+product.description+'</div></div></div>';
            return true;
        });
    

        document.body.innerHTML = '<!DOCTYPE html><html lang="en"><head><title>Aquatica - leading supplier of tapware, laundry tubs and stainless steel sinks in NZ</title></head><body>'+printContents+'</body></html>';
    
        setTimeout(function(){
            window.print();
            window.location.href = "/wishlist";
        },1000);
    
    }
    
    return(
        <React.Fragment>
            <Box px={8} py={4}>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography variant="h1">My List</Typography>
                       </Grid>
                    <Grid item>
                        <a href="\#" className={classes.aButtonBrown} onClick={(event)=>printDiv(event, wishlistDisplay4Print)}>Print</a>
                    </Grid>
                </Grid>
                
            </Box>
            <Box p={6} id="printableArea">
                {
                    loggedUser ? 
                    wishlistData.error ? (
                            <Error />
                        ) : wishlistData.load && wishlistData.data ? (
                            <WishlistItems wishlistData={wishlistData.data}/>
                        ) : (
                            <Loader />
                        )
                    :
                    (<Box p={6} fontWeight="Bold">Please login to view this page</Box>)
                }
            </Box>
            <Box p={6}/>
        </React.Fragment>
    )

}

export default withRouter(withStyles(styles)(Wishlist));
