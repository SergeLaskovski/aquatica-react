import React from 'react';
import {Box} from '@material-ui/core';
import {withStyles} from '@material-ui/core';
import styles from './CartStyles';
import CartMenu from '@/components/layout/CartMenu';

function Cart(props) {
    const {classes} = props;

    return(
        <React.Fragment>
            <CartMenu/>
            <Box px={4} pt={5}>
            <iframe 
                className = {classes.iframe}
                src={`${process.env.REACT_APP_BASE_URL}/cms/cart/`}
                name="Cart"
                frameBorder="0"
                title="Cart">
            </iframe>
            </Box>
        </React.Fragment>
    )

}


export default withStyles(styles)(Cart);
