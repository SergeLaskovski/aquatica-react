import React from 'react';
import {NavLink} from 'react-router-dom';

import {withStyles} from '@material-ui/core';
import styles from './WishlistNumStyles';

import {ComparelistContext} from '@/context/comparelist-num-context';

function ComparelistNum(props) {

    const {classes} = props;

    const closeAllSlides =  props.closeAllSlides ? props.closeAllSlides : () => {return};

    let {compareNum} = React.useContext(ComparelistContext);

    return (
        <React.Fragment>
            <NavLink to="/comparelist/" className={ props.class } onClick={closeAllSlides}>Compare<span className={classes.numRound}>{compareNum}</span></NavLink>
        </React.Fragment>
    );

}

export default withStyles(styles)(ComparelistNum);
