
import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import {Grid, Typography, Box} from '@material-ui/core';

import {withStyles} from '@material-ui/core';
import styles from './FooterContactBannerStyles';

function FooterContactBanner(props) {
  const {classes} = props;
  return (
    <Grid container className={classes.footerContact} alignItems="center" justify="center">
        <Grid item container direction="column" alignItems="center" justify="center">
            <Typography variant="h1">Get in touch with us today!</Typography>
            <Box element="div" m={3}><NavLink to="/contact-us" className={classes.aButtonBrown}>Contact us</NavLink></Box>
        </Grid>
    </Grid>
  )
}

export default withRouter(withStyles(styles)(FooterContactBanner));
