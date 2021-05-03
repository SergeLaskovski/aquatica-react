import React from 'react';

import {withRouter} from 'react-router-dom';

import { withStyles } from '@material-ui/core';
import styles from './VacanciesStyles.js';
import { Grid, Typography, Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

import FooterContactBanner from '@/components/layout/FooterContactBanner';

function VacanciesPage(props) {

    const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '/?page=vacancies';
    const pageData = UseDataApi(PAGE_API_URL);

    const VACANCIES_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_VACANCIES;
    const VacanciesData = UseDataApi(VACANCIES_API_URL);

  
    const { classes } = props;

    
    return (
        <React.Fragment>

        {
            pageData.error ? (
              <Error />
            ) : pageData.load ? (
                <React.Fragment>
                    <Box component="div">
                        <img 
                            src={pageData.data.img} alt="Aquatica vacancies"
                            className={classes.imgSuperFluid}
                        />
                    </Box>
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
            VacanciesData.error ? (
                <Error />
              ) : VacanciesData.load ? (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h2" component="h2">
                            <Box px={8} textAlign="center">Current Vacancies</Box>
                        </Typography>
                    </Grid>
                    <Grid item container spacing={3} justify="center" alignItems="center" className={classes.teamCardsContainer}>
                            {
                            VacanciesData.data.map((vacancy, index) => (
                                <Flippy
                                    flipOnHover={true} // default false
                                    flipOnClick={true} // default false
                                    flipDirection="horizontal" // horizontal or vertical
                                    key={`teamMember${index}`}
                                >
                                    <FrontSide>
                                        <Card className={classes.cardRoot}>
                                            <CardContent>
                                                <Typography variant="caption" component="div">
                                                    {vacancy.date}
                                                </Typography>
                                                <Typography variant="h5" component="div">
                                                    {vacancy.title}
                                                </Typography>
                                                <Box dangerouslySetInnerHTML={{__html: vacancy.short}}></Box>
                                            </CardContent>
                                        </Card>
                                    </FrontSide>
                                    <BackSide >
                                        <Card className={classes.cardRoot}>
                                            <CardContent>
                                                <Typography variant="h3" dangerouslySetInnerHTML={{__html: vacancy.title}}></Typography>
                                                <Box py={2} dangerouslySetInnerHTML={{__html: vacancy.text}}></Box>
                                            </CardContent>
                                        </Card>
                                    </BackSide>
                                </Flippy>
                            ))
                            } 
                    </Grid>
                </Grid>
              ) : (
                <Loader />
              )
        }
        {/*
        <Box px={8} py={2} textAlign="center">
            <Box>Please contact us via contact form and specify the vacancy name</Box>
            <NavLink to="/contact-us" className={classes.aButtonBrown}>Apply</NavLink>
        </Box>
        */}
        <Box p={6}/>
        <FooterContactBanner/>
            
        </React.Fragment>
    )
}

export default withRouter(withStyles(styles)(VacanciesPage));
