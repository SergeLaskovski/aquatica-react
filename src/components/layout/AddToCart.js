import React from 'react';
import {Box} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import {withStyles} from '@material-ui/core';
import styles from './AddToCompareStyles';



function AddToCart(props) {

    const {classes, productId, cartData, updateCartData} = props;

    //add to cart popover
    const [anchorAddToCart, setAnchorAddToCart] = React.useState(null);
    const openAddToCartPop = Boolean(anchorAddToCart);
    const popAddToCartId = openAddToCartPop ? 'add-to-cart-popover' : undefined;

    const addCartHandler = (event,productId) =>{
        event.preventDefault();
        const popEvent = event.currentTarget;
        setAnchorAddToCart(popEvent);
        updateCartData();
    }

    const addToCartCheckData = {"data" : false};


    return (
        <React.Fragment>
            <Popover
                id={popAddToCartId}
                open={openAddToCartPop}
                anchorEl={anchorAddToCart}
                onClose={()=>setAnchorAddToCart(null)}
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
                    <iframe src={`${process.env.REACT_APP_BASE_URL}/cms/?add-to-cart=${productId}`} name="addToCart" width="0" height="0" frameBorder="0" title="Add To Cart"></iframe>
                    <Box p={6}>Product added to cart!</Box>
                </Popover>

            {

            <a 
                href='/#'
                title="Add to Cart"
                className={`${classes.aButtonBlack} ${classes.justfyStart}${addToCartCheckData.data ? classes.disabled : ''}`}
                onClick={(event)=>addCartHandler(event,productId)}
                aria-describedby={popAddToCartId}
            >
                <ShoppingCartIcon fontSize="small"/><span dangerouslySetInnerHTML={{__html: "&nbsp;&nbsp;"}}></span>{cartData[productId] ? 'Added ('+cartData[productId]+')' : 'Add to Cart'}
            </a>
            }
        </React.Fragment>
    )
}

export default withStyles(styles)(AddToCart);


