import React from 'react';

import {withStyles} from '@material-ui/core';
import styles from './FactoryShopStyles.js';
import { Box} from '@material-ui/core';

import FooterContactBanner from '@/components/layout/FooterContactBanner';

function Wishlist(props) {

    const {classes} = props;


    return(
        <React.Fragment>
            Wishlist
        </React.Fragment>
    )

}


export default withStyles(styles)(Wishlist);
