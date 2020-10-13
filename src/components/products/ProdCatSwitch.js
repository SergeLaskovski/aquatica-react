
import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';


import {withStyles} from '@material-ui/core';
import styles from './ProdCatSwitchStyles';
import {Grid,Box} from '@material-ui/core';



function ProdCatSwitch(props) {

  const {classes} = props;

  let current = [];
  current = props.match.url.split("/");
  current = current[1];

  return (

    <Grid container className={classes.switchContainer}>
        <Grid item xs={6}>
            <NavLink to={`/categories/${props.catSlug}`} className={`${classes.aNone} ${current==='categories' && classes.navLinkSelected}`}>
              <Box className={`${classes.switchBox} ${current==='categories' && classes.switchBoxSelected}`}>
                  {props.catName} Categories
              </Box>
            </NavLink>
        </Grid>
        <Grid item xs={6}>
            <NavLink to={`/products/${props.catSlug}`} className={`${classes.aNone} ${current==='products' && classes.navLinkSelected}`}>
              <Box className={`${classes.switchBox} ${current==='products' && classes.switchBoxSelected}`}>
                ALL {props.catName} Products
              </Box>
            </NavLink>
        </Grid>
      
    </Grid>

  )
}

export default withRouter(withStyles(styles)(ProdCatSwitch));