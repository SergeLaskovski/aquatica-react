
import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import UseDataApi from '@/hooks/UseDataApi';

import {Grid, Typography, Box} from '@material-ui/core';

import {withStyles} from '@material-ui/core';
import styles from './FooterContactBannerStyles';

function FooterContactBanner(props) {
  
  const {classes} = props;
  
  const FOOTERBANNER_API_URL = process.env.REACT_APP_API_BASE + '/footer-banner?page='+props.location.pathname;
  const bannerData = UseDataApi(FOOTERBANNER_API_URL);


  return (
    <React.Fragment>
      {
        bannerData.load && ! bannerData.error ? (
          <Grid container className={classes.footerContact} style={{backgroundImage: 'url('+bannerData.data.image+')'}}  alignItems="center" justify="center">
              <Grid item container direction="column" alignItems="center" justify="center">
                  <Typography variant="h1" align="center">{bannerData.data.text}</Typography>
                  <Box element="div" m={3}>
                    {
                      bannerData.data.link && (
                        bannerData.data.link.startsWith("http") ? 
                          (<NavLink to={bannerData.data.link} className={classes.aButtonBrown} >{bannerData.data.buttonText}</NavLink>)
                          :
                          (<a href={bannerData.data.link} className={classes.aButtonBrown} >{bannerData.data.buttonText}</a>)
                      )
                    }
                  </Box>
              </Grid>
          </Grid>
        ) : ''
      }
    </React.Fragment>
    )
}

export default withRouter(withStyles(styles)(FooterContactBanner));
