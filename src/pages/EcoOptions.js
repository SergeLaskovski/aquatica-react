import React from 'react';

import {withStyles} from '@material-ui/core';
import styles from './EcoOptionsStyles.js';
import { Grid, Typography, Box} from '@material-ui/core';

import Collapse from '@material-ui/core/Collapse';


import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

import ProducstList from '@/components/products/ProductsList';
import FooterContactBanner from '@/components/layout/FooterContactBanner';

function EcoOptions(props) {

    const {classes} = props;

    const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '?page=eco-options';
    const pageData = UseDataApi(PAGE_API_URL);

    const PRODUCTS_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PRODUCTS;
    const productsData = UseDataApi(PRODUCTS_API_URL);

    const [checked, setChecked] = React.useState(false);
    let buttonTextKey = 0;
    const buttonText = ['Read more','Collapse'];
    const [checkedText, setCheckedText] = React.useState('Read more');


    const handleClick = (event) =>{
        event.preventDefault();
        event.stopPropagation();
        setChecked((prev) => !prev);
        buttonTextKey = checked ? 0 : 1;
        setCheckedText(buttonText[buttonTextKey]);
    }

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
                            <Typography variant="h1" component="div">
                                <Box px={8} pt={8} dangerouslySetInnerHTML={{__html: pageData.data.headerText}}/>
                            </Typography>
                            <Typography variant="body1" component="div">
                                <Box px={8} pt={4} dangerouslySetInnerHTML={{__html: pageData.data.excerpt}}/>
                                <Collapse in={checked} timeout={700}>
                                    <Box px={8} pt={4} dangerouslySetInnerHTML={{__html: pageData.data.content}}/>
                                </Collapse>
                                <Box px={8} pt={4}>
                                    <a href="#readMore" className={classes.aButtonBrown} onClick={handleClick}>{checkedText}</a>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </React.Fragment>
            ) : (
              <Loader />
            )
        }
        <Typography variant="h2" component="h2">
            <Box p={8}>Eco Products</Box>
        </Typography>
        {
        productsData.error ? (
            <Error />
            ) : productsData.load ? (
                    <ProducstList productsData={productsData.data}/>
            ) : (
            <Loader />
            )
        }
        <Box p={6}/>
        <FooterContactBanner/>
        </React.Fragment>
    )

}


export default withStyles(styles)(EcoOptions);
