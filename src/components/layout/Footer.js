import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

import { withStyles } from '@material-ui/core';
import styles from './FooterStyles';
import { Grid, Box, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';

import FooterContactBanner from '@/components/layout/FooterContactBanner';


function Footer(props) {
  
  const {classes} = props;
  
  const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '/?page=contact-us';
  const pageData = UseDataApi(PAGE_API_URL);

  const MENU_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_FOOTERMENU;
  const footerMenuData = UseDataApi(MENU_URL);
  
  const currDate = new Date();
  const year = currDate.getFullYear();


  return (
    <React.Fragment>
      <FooterContactBanner/>
      <Grid container>
        <Grid xs={12} item>
          <Box textAlign="center" py={6}>
            <img src={`${process.env.REACT_APP_BASE_URL}/assets/images/aquatica-logo-bottom.png`} className={classes.logo} alt="Aquatica"/>
          </Box>
        </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item className={classes.footerColumn}>
          <Typography variant="h4" className={classes.footerHeader}>AQUATICA</Typography><br/>

            {
              footerMenuData.error ? (
                <Error />
              ) : footerMenuData.load ? (
                footerMenuData.data.map((footerMenuItem, index) => (
                  <Box key={`footerMenu${index}`}>
                    <NavLink 
                      exact = {footerMenuItem.path==='/' ? true : false}
                      to={footerMenuItem.path}
                      className={classes.footerMenuItem}
                      activeClassName={classes.footerMenuItemSelected}
                      dangerouslySetInnerHTML={{__html:footerMenuItem.title}}
                    >
                    </NavLink>
                  </Box>
                ))
              ) : (
                <Loader />
              )
            }
        </Grid>
        <Grid item className={classes.footerColumn}>
            <Typography variant="h4" className={classes.footerHeader}>Technical info</Typography><br/>
            <div><NavLink to="/tips-videos" className={classes.footerMenuItem} activeClassName={classes.footerMenuItemSelected}>Hints & Tips</NavLink></div>
            <div><NavLink to="/tips-videos/wels-in-a-nutshell" className={classes.footerMenuItem} activeClassName={classes.footerMenuItemSelected}>WELLS Information</NavLink></div>
        </Grid>
      {
          pageData.error ? (
            <Error />
          ) : pageData.load ? (
              <React.Fragment>
                <Grid item className={classes.footerColumn}>
                    <Typography variant="h4" className={classes.footerHeader}>{pageData.data.addr1Title}</Typography>
                    <div dangerouslySetInnerHTML={{__html: pageData.data.addr1}} ></div>
                </Grid>
                <Grid item className={classes.footerColumn}>
                    <Typography variant="h4"  className={classes.footerHeader}>{pageData.data.addr2Title}</Typography>
                    <div dangerouslySetInnerHTML={{__html: pageData.data.addr2}} ></div>
                </Grid>
              </React.Fragment>
          ) : (
            <Loader />
          )
      }
      </Grid>
      <Grid 
        container 
        className={classes.webGyusContainer}
        wrap="nowrap"
        spasing={2}
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Box p={2}>© Copyright {year} Aquatica - Website Design & Development by <a href="https://thewebguys.co.nz" title="The Web Guys">The Web Guys</a></Box>
        </Grid>
        <Grid item>
          <Box p={2}><a href="https://www.facebook.com/aquaticaNZ/" title="Aquatica Facebook"><FacebookIcon/></a></Box>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default withRouter(withStyles(styles)(Footer));
 