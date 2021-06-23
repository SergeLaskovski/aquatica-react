import React from 'react';

import {withStyles} from '@material-ui/core';
import styles from './AboutStyles.js';
import { Grid, Typography, Box} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

import "@/assets/css/carousel.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

function About(props) {

    const {classes} = props;

    const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '?page=about-us';
    const pageData = UseDataApi(PAGE_API_URL);

    const TEAM_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_TEAM;
    const teamData = UseDataApi(TEAM_API_URL);

    //config carousel for featured images
    const carouselConfig = () => ({
        showThumbs:  false,
        showArrows: true,
        showStatus: false,
        infiniteLoop: true,
        autoPlay: true,
        swipeable: true,
        interval: 3000,
        transitionTime: 700,
        dynamicHeight: false,
        stopOnHover: true,
        showIndicators: false
    });

    return(
        <React.Fragment>
        {
            pageData.error ? (
              <Error />
            ) : pageData.load ? (
                <React.Fragment>
                        <div className={classes.carouselContainer}>
                            <Carousel {...carouselConfig()}>
                                {
                                pageData.data.featuredImgs.map((featuredImg, index) => (
                                    <div key={index}>
                                        <img src={featuredImg.full} alt={`About Us ${index}`} />
                                    </div>
                                ))
                                }
                            </Carousel>
                        </div>

                    <Grid container>
                        <Grid item xs={12} md={6} container alignItems="center">
                            <Typography variant="h1" component="div">
                                <Box p={8} dangerouslySetInnerHTML={{__html: pageData.data.headerText}}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" component="div">
                                <Box p={8} dangerouslySetInnerHTML={{__html: pageData.data.content}}/>
                            </Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>
            ) : (
              <Loader />
            )
        }
        {
            teamData.error ? (
                <Error />
              ) : teamData.load ? (
                  <React.Fragment>
                        <Typography variant="h2" component="h2">
                            <Box p={8}>Our Team</Box>
                        </Typography>
                    
                        <Grid  container justify="center" alignItems="center" className={classes.teamCardsContainer}>
                                {
                                teamData.data.map((teamMember, index) => (
                                    <React.Fragment key={`teamMember${index}`}>
                                        {
                                            teamMember.name === 'new-row' ? (
                                                <Grid item xs={12}> </Grid>
                                            ) : (
                                                <Grid>
                                                    <Flippy
                                                        flipOnHover={true} // default false
                                                        flipOnClick={true} // default false
                                                        flipDirection="horizontal" // horizontal or vertical
                                                    >
                                                        <FrontSide>
                                                            <Card className={classes.cardRoot}>
                                                                <CardMedia
                                                                    className={classes.cardMedia}
                                                                    image={teamMember.img ? teamMember.img : process.env.REACT_APP_BASE_URL+'/assets/images/product_img_placeholder.png'}
                                                                    title={teamMember.name}
                                                                />
                                                                <CardContent>
                                                                    <Typography variant="h5" component="div">
                                                                        {teamMember.name}
                                                                    </Typography>
                                                                    <Box dangerouslySetInnerHTML={{__html: teamMember.position}}></Box>
                                                                </CardContent>
                                                            </Card>
                                                        </FrontSide>
                                                        <BackSide >
                                                            <Card className={classes.cardRoot}>
                                                                <CardContent>
                                                                    <Typography variant="h3" dangerouslySetInnerHTML={{__html: teamMember.name}}></Typography>
                                                                    <Typography variant="body2" dangerouslySetInnerHTML={{__html: teamMember.contatcs}}></Typography>
                                                                    <Box py={2} dangerouslySetInnerHTML={{__html: teamMember.text}}></Box>
                                                                </CardContent>
                                                            </Card>
                                                        </BackSide>
                                                    </Flippy>
                                                </Grid>
                                            )
                                        }
                                    </React.Fragment>
                                ))
                                } 
                        </Grid>
                </React.Fragment>
              ) : (
                <Loader />
              )
        }
        <Box p={6}/>
        </React.Fragment>
    )

}


export default withStyles(styles)(About);
