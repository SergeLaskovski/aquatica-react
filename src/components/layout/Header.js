import React from 'react';
import {withStyles, Grid} from '@material-ui/core';
import styles from './HeaderStyles';

import Navigation from '@/components/layout/Navigation';

function Header(props) {
  const {classes} = props;
  return (
    <Grid container justify="flex-end" alignItems="flex-start" className={classes.mainBannerDiv}>
      <Navigation />
    </Grid>
  );
}

export default withStyles(styles)(Header);
