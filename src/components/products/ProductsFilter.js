import React from 'react';

import { withStyles } from '@material-ui/core';
import styles from './ProductsFilterStyles';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

import ProducstList from '@/components/products/ProductsList';
import LandingPageImage from '@/components/layout/LandingPageImage';

import { Grid, Typography, Box, Checkbox } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

import {FilterSettingsFunction, defaultFilter, applyFilter} from './FilterSettingsFunction'

import Popover from '@material-ui/core/Popover';

function ProductsFilter(props) {
    const { classes, currentCat } = props;

    let PRODUCTS_API_URL = '';
    let urlBase = '';

    if(currentCat.slug === 'factory-shop'){
        urlBase="factory-shop"
        PRODUCTS_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PRODUCTS + '?shop=show';
    } else {
        PRODUCTS_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PRODUCTS + '?cat=' + currentCat.slug;
    }
    
    const productsData = UseDataApi(PRODUCTS_API_URL);

    let renderFilters = [];

    if (productsData.load) {
        renderFilters = FilterSettingsFunction(productsData.data);
    }

    const CustomLoader = () => {

        return typeof(currentCat.slug) === "undefined" ? <Box p={4} textAlign="center">Please wait as due to the amount of products this may take up to 20 seconds to load</Box> : <Loader />

    }

    const FilterPtoducts = (props) => {

        //filter slider
        const width = window.innerWidth;
        let defaultfilterSliderChecked = true;
        if(width<620){
            defaultfilterSliderChecked = false;
        }
        const [filterSliderChecked, setFilterSliderChecked] = React.useState(defaultfilterSliderChecked);

        //save state of chosen filters
        //defaultFilter is set in FilterSettingsFunction.js
        const [filterArrState, setFilterArrState] = React.useState(defaultFilter);
        const [productsToShow, setProductsToShow] = React.useState(productsData.data);

        //called when checkbox checked or unchecked
        const addToFilter = (event, filterType, filterItem) => {
            let newFilterItem = filterArrState;
            if (event.target.checked) {
                //add new item to use in filter
                newFilterItem[filterType].push(filterItem);
            }
            else {
                //remove item from filter
                const index = newFilterItem[filterType].indexOf(filterItem);
                if (index > -1) {
                    newFilterItem[filterType].splice(index, 1);
                }
            }

            setFilterArrState(
                newFilterItem
            );
           
            let filteredPropducts = applyFilter(filterArrState, productsData.data);
            if(filteredPropducts){
                setProductsToShow(filteredPropducts)
            }
            else{
                setProductsToShow(productsData.data)
            }
        }

        const [anchorElDesc, setAnchorElDesc] = React.useState(null);
        const openDescPop = Boolean(anchorElDesc);
        const popDescId = openDescPop ? 'desc-popover' : undefined;

        // const handleDescPop = (event) =>{
        //     event.preventDefault();
        //     event.stopPropagation();
        //     setAnchorElDesc(event.currentTarget);
        // }

        const HowDoIKnowText = () => {
            const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '/?page=how-do-i-know-low';
            const pageData = UseDataApi(PAGE_API_URL);

            return(
                <React.Fragment>
                    {
                     pageData.error ? (
                        <Error />
                        ) : pageData.load ? (
                            <Box dangerouslySetInnerHTML={{__html: pageData.data.content}}></Box>
                        ) : (
                        <Loader />
                        )
                    }

                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
            <LandingPageImage img={`/LandingPages/${currentCat.title}.jpg`} title={`${currentCat.title}`}/>
            <Grid container className={classes.h100} alignItems="stretch">
                    { renderFilters.length>0 && (
                    <Slide direction="right" in={filterSliderChecked}>
                        <Grid item xs={4} md={2} className={`${classes.filtersMainContainer} ${!filterSliderChecked && classes.displayNone}`}>
                            <span onClick={()=>setFilterSliderChecked(!filterSliderChecked)} className={classes.arrow}>&#9666; Hide filter &#9666;</span>
                            <Typography align="right" className={classes.results}>{productsToShow.length} results</Typography>
                            {renderFilters.map((renderFilter, index) => (
                                <Box component="div" className={classes.filtersContainer} key={`filterType${index}`}>
                                    {renderFilter.range.length>0 &&
                                        <React.Fragment>
                                            <Typography variant="h4">{renderFilter.name}</Typography>

                                            {
                                            renderFilter.range.map((rangeItem, index2) => (
                                                <Grid container justify="space-between" alignItems="flex-end" key={`filterItem${index2}`} wrap="nowrap">
                                                    <Grid item>
                                                        <Box px={1}>{rangeItem}</Box>
                                                    </Grid>
                                                    <Grid item>
                                                        <Checkbox
                                                            className={classes.Checkbox}
                                                            color="default"
                                                            size="small"
                                                            name={`${renderFilter.name}-${rangeItem}`}
                                                            onChange={(e) => addToFilter(e, renderFilter.fieldName, rangeItem)}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            ))
                                            }
                                            {
                                            renderFilter.name === 'Pressure' &&
                                                <React.Fragment>
                                                <Box  px={1} fontSize=".8rem"><a href={`${process.env.REACT_APP_BASE_URL}/assets/doc/How do I know if I have low pressure.pdf`} target="_blank" rel="noreferrer">How do I know if I have low pressure?</a></Box>
                                                <Popover
                                                    className={classes.popoverContainer}
                                                    id={popDescId}
                                                    open={openDescPop}
                                                    anchorEl={anchorElDesc}
                                                    onClose={()=>setAnchorElDesc(null)}
                                                    anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                    }}
                                                    transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                    }}
                                                    classes={{ paper: classes.popoverContent }}
                                                >
                                                    <Box p={5} className={classes.popoverContent}>
                                                            <HowDoIKnowText/>
                                                    </Box>
                                                    <span className={classes.closeBtn} onClick={()=>setAnchorElDesc(null)}>&#215;</span>
                                                </Popover>
                                                </React.Fragment>
                                            }
                                        </React.Fragment>
                                    }
                                </Box>
                            ))}
                        </Grid>
                    </Slide>
                    )}
                <Grid item className={classes.FlexGrow} xs={ 12} md={(filterSliderChecked && renderFilters.length>0)? 10 : 12}>
                    {
                        (!filterSliderChecked && renderFilters.length>0) && (
                            <span onClick={()=>setFilterSliderChecked(!filterSliderChecked)} className={classes.arrow}>&#9656; Show filter &#9656;</span>
                        )
                    }
                    <ProducstList productsData={productsToShow} currentCat={currentCat.slug} urlBase={urlBase}/>
                </Grid>
            </Grid>
            </React.Fragment>
        )
    };
    return productsData.error ? <Error /> : productsData.load ? <FilterPtoducts /> : <CustomLoader/>;
}

export default withStyles(styles)(ProductsFilter);
