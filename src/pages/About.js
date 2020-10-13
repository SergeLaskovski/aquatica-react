import React from 'react';

import {withStyles} from '@material-ui/core';
import styles from './AboutStyles.js';
import { Grid, Typography, Box} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

import FooterContactBanner from '@/components/layout/FooterContactBanner';

function About(props) {

    const {classes} = props;

    const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '/?page=about-us';
    const pageData = UseDataApi(PAGE_API_URL);

    const TEAM_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_TEAM;
    const teamData = UseDataApi(TEAM_API_URL);

    return(
        <React.Fragment>
        {
            pageData.error ? (
              <Error />
            ) : pageData.load ? (
                <React.Fragment>
                    <Box component="div">
                        <img 
                            src={pageData.data.img} alt="Aquatica team"
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
            teamData.error ? (
                <Error />
              ) : teamData.load ? (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h2" component="h2">
                            <Box p={8}>Our Team</Box>
                        </Typography>
                    </Grid>
                    <Grid item container spacing={3} justify="center" alignItems="center" className={classes.teamCardsContainer}>
                            {
                            teamData.data.map((teamMember, index) => (
                                <Flippy
                                    flipOnHover={true} // default false
                                    flipOnClick={true} // default false
                                    flipDirection="horizontal" // horizontal or vertical
                                    key={`teamMember${index}`}
                                >
                                    <FrontSide>
                                        <Card className={classes.cardRoot}>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={teamMember.img}
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
                            ))
                            } 
                    </Grid>
                </Grid>
              ) : (
                <Loader />
              )
        }
        <Box p={6}/>
        <FooterContactBanner/>
        </React.Fragment>
    )

}


export default withStyles(styles)(About);
