import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';


import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

import { withStyles } from '@material-ui/core';
import styles from './FooterStyles';
import { Grid, Box, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';

import ChangingLogo from '@/components/layout/ChangingLogo';

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
      <Grid container>
        <Grid xs={12} item>
          <Box textAlign="center" py={6}>
            <ChangingLogo imgWidth="350"/>
          </Box>
        </Grid>
      </Grid>
      <Grid container className={classes.footerMenuContainer}>
        <Grid item className={classes.footerColumnMenu}>
          <Typography variant="h3" className={classes.footerHeader}>AQUATICA</Typography><br/>
            <div className={classes.columns}>
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
                    >
                      {footerMenuItem.title}
                    </NavLink>
                  </Box>
                ))
              ) : (
                <Loader />
              )
            }
            </div>
        </Grid>
        <Grid item  className={classes.footerColumn}>
        {
            pageData.error ? (
              <Error />
            ) : pageData.load ? (
                    <Grid container justify="center">
                        <Grid item xs={12} md className={classes.addrItem}>
                            <Typography variant="h3" className={classes.footerHeader}>{pageData.data.addr1Title}</Typography><br/>
                            <div dangerouslySetInnerHTML={{__html: pageData.data.addr1}} ></div>
                        </Grid>
                        <Grid item xs={12} md className={classes.addrItem}>
                            <Typography variant="h3"  className={classes.footerHeader}>{pageData.data.addr2Title}</Typography><br/>
                            <div dangerouslySetInnerHTML={{__html: pageData.data.addr2}} ></div>
                        </Grid>
                        <Grid item xs={12} md className={classes.addrItem}>
                            <Typography variant="h3" className={classes.footerHeader}>{pageData.data.addr3Title}</Typography><br/>
                            <div dangerouslySetInnerHTML={{__html: pageData.data.addr3}} ></div>
                        </Grid>
                    </Grid>
            ) : (
              <Loader />
            )
        }
        </Grid>
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
 