import React from 'react';
import {Box} from '@material-ui/core';
import {NavLink, withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core';
import styles from './CartMenuStyles';

function CartMenu(props) {

    const {classes, cartData} = props;
    let current = '';
    current = props.match.url.split("/");
    current = current[1];
    let cartTotal = 0;

    if(current === "factory-shop"){
        for (const key in cartData) {
            if (cartData.hasOwnProperty(key)) {
                cartTotal += cartData[key];
            }
        }
    }

    return (
        <React.Fragment>
            <Box px={6} py={1} className={classes.cartMenu}>
            {
            current === "factory-shop" ? (
                <NavLink to="/cart">Cart ({cartTotal})</NavLink>
            ) :
            (
                <NavLink to="/factory-shop">Back to Shop</NavLink>
            )
            }
            </Box>
        </React.Fragment>
    )
}

export default withRouter(withStyles(styles)(CartMenu));
