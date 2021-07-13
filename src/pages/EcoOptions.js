import React from 'react';

import {NavLink, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core';
import styles from './EcoOptionsStyles.js';
import { Grid, Typography, Box} from '@material-ui/core';


import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';


function EcoOptions(props) {

    const {classes} = props;

    let postSlug=null;
    if(props.match.params.postSlug){postSlug = encodeURIComponent(props.match.params.postSlug);}

    
    const DisplayEcoOption = () => {
        const ECOPAGES_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '?page=eco&ecopage=' + postSlug;
        const EcoPageData = UseDataApi(ECOPAGES_API_URL);

        const EcoBoxes = () => {
            let ecoBoxesArr = [];
            for(let i=1;i<6;i++){
                if (EcoPageData.data['text'+i]){
                    ecoBoxesArr.push({
                        "text": EcoPageData.data['text'+i],
                        "img": EcoPageData.data['img'+i],
                        "link": EcoPageData.data['link'+i]
                    })
                }
            }
            return (
                <React.Fragment>
                    {
                    ecoBoxesArr.map((ecoBox, index) => (
                        <NavLink to={ecoBox.link} className={ecoBox.link ? classes.aNoneBox : classes.disabled} key={`ecobox${index}`}>
                            <Grid container direction={index%2===0 ? 'row' : 'row-reverse'} spacing={0}>
                                <Grid item xs={12} md={6}>
                                        <img 
                                            src={ecoBox.img} alt="Aquatica Eco Options"
                                            className={classes.imgHoverFluid}
                                        />
                                </Grid>
                                <Grid item xs={12} md={6} container alignItems="center">
                                    <Grid item><Box px={6} dangerouslySetInnerHTML={{__html: ecoBox.text}}/></Grid>
                                </Grid>
                            </Grid>
                        </NavLink>
                    ))
                    }
                </React.Fragment>
            )
        }

        return(
            <React.Fragment>
                {
                    EcoPageData.error ? (
                        <Error />
                    ) : EcoPageData.load ? (
                        <React.Fragment>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <Box component="div">
                                        {EcoPageData.data.img && (
                                            <img 
                                                src={EcoPageData.data.img} alt="Aquatica Eco Options"
                                                className={classes.imgSuperFluid}
                                            />
                                            )
                                        }
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h2" component="h2">
                                        <Box px={8} pt={8} dangerouslySetInnerHTML={{__html: EcoPageData.data.title}}/>
                                    </Typography>
        
                                    <Box px={8} py={4} dangerouslySetInnerHTML={{__html: EcoPageData.data.content}}/>
                                </Grid>
                            </Grid>
                            <Box px={8}><Box component="div" p={8} dangerouslySetInnerHTML={{__html: EcoPageData.data.topText}}></Box></Box>
                            <EcoBoxes/>
                            <Box px={8}><Box component="div" p={8} dangerouslySetInnerHTML={{__html: EcoPageData.data.bottomText}}></Box></Box>
                        </React.Fragment>
                    
                    ) : (
                        <Loader />
                    )
                }
            </React.Fragment>
        )
    }

    const DisplayMainPage = () => {
        const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '?page=eco-options';
        const pageData = UseDataApi(PAGE_API_URL);

        const ECOPAGES_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '?page=eco';
        const EcoPageData = UseDataApi(ECOPAGES_API_URL);

        return(
            <React.Fragment>
                {
                    pageData.error ? (
                    <Error />
                    ) : pageData.load ? (
                        <React.Fragment>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <Box component="div">
                                        <img 
                                            src={pageData.data.img} alt="Aquatica Eco Options"
                                            className={classes.imgSuperFluid}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h2" component="h2">
                                        <Box px={8} pt={8} dangerouslySetInnerHTML={{__html: pageData.data.headerText}}/>
                                    </Typography>
        
                                    <Box px={8} py={4} dangerouslySetInnerHTML={{__html: pageData.data.content}}/>
                                        {
                                        EcoPageData.load && (
                                            EcoPageData.data.map((ecoPage, index)=>(
                                                <Box px={8} fontWeight="bold" key={`ecolink${index}`}>
                                                    <NavLink to={`/eco-options/${ecoPage.slug}`} dangerouslySetInnerHTML={{__html: ecoPage.title}}></NavLink>
                                                </Box>
                                            ))
                                        )
                                        }
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    ) : (
                    <Loader />
                    )
                }
                <Typography variant="h2" component="h2">
                    <Box p={8}>Eco Friendly Tips</Box>
                </Typography>
        
                <Grid container className={classes.catsContainer} alignItems="stretch" justify="flex-start">
                    {
                    EcoPageData.load && (
                        EcoPageData.data.map((ecoPage, index)=>(
                            <Grid item className={classes.catItemContainer} key={`ecolinkimg${index}`}>
                                <Box className={classes.hoverCard}>
                                    <NavLink to={`/eco-options/${ecoPage.slug}`} className={classes.aNone} >
                                        <Grid
                                            container
                                            direction="column"
                                            justify="space-between"
                                            alignItems="stretch"
                                            className={classes.h100}
                                        >
                                            <Grid
                                                item
                                                className={classes.productImgContainer}
                                                style={{backgroundImage: 'url("' + (typeof(ecoPage.featuredImgs[1]) !== 'undefined' ? ecoPage.featuredImgs[1]['full'] : '') + '")'}}
                                            >
                                            </Grid>
                                            <Grid item container 
                                                direction="column"
                                                justify="space-between"
                                                alignItems="stretch"
                                                className={classes.flexGrow}
                                            >
                                                <Box component="div" px={3} py={3}>
                                                    <Typography variant="h4" dangerouslySetInnerHTML={{__html: ecoPage.title}}></Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </NavLink>
                                </Box>
                            </Grid>
                        ))
                    )
                    }
                </Grid>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {
            postSlug ?
                <DisplayEcoOption/>
            :
                <DisplayMainPage/>
            }
            <Box p={6}/>
        </React.Fragment>
    )
    

}


export default withRouter(withStyles(styles)(EcoOptions));