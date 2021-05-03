import React from 'react';
import {NavLink} from 'react-router-dom';

import {withStyles} from '@material-ui/core';
import styles from './WishlistNumStyles';

import {WishlistContext} from '@/context/wishlist-num-context';

function WishlistNum(props) {

    const {classes} = props;

    const closeAllSlides =  props.closeAllSlides ? props.closeAllSlides : () => {return};

    let {wishNum} = React.useContext(WishlistContext);

    return (
        <React.Fragment>
            <NavLink to="/wishlist/" className={ props.class } onClick={closeAllSlides}>Wishlist<span className={classes.numRound}>{wishNum}</span></NavLink>
        </React.Fragment>
    );

}

export default withStyles(styles)(WishlistNum);
