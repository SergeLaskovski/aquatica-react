import React from 'react';

import { withStyles } from '@material-ui/core';
import styles from './ProductsFilterStyles';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

import ProducstList from '@/components/products/ProductsList';

import { Grid, Typography, Box, Checkbox } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

import {FilterSettingsFunction, defaultFilter, applyFilter} from './FilterSettingsFunction'

function ProductsFilter(props) {
    const { classes, currentCat } = props;

    const PRODUCTS_API_URL =
        process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PRODUCTS + '?cat=' + currentCat.slug;
    const productsData = UseDataApi(PRODUCTS_API_URL);

    let renderFilters = [];

    if (productsData.load) {
        renderFilters = FilterSettingsFunction(productsData.data);
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

        

        

        return (
            <Grid container className={classes.h100} alignItems="stretch">
                    {renderFilters.length>0 && (
                    <Slide direction="right" in={filterSliderChecked}>
                        <Grid item xs={4} md={2} className={`${classes.filtersMainContainer} ${!filterSliderChecked && classes.displayNone}`}>
                            <span onClick={()=>setFilterSliderChecked(!filterSliderChecked)} className={classes.arrow}>&#9666; Hide filter &#9666;</span>
                            <Typography align="right" className={classes.results}>{productsToShow.length} results</Typography>
                            {renderFilters.map((renderFilter, index) => (
                                <Box component="div" className={classes.filtersContainer} key={`filterType${index}`}>
                                    {renderFilter.range.length>1 &&
                                        <React.Fragment>
                                            <Typography variant="h3">{renderFilter.name}</Typography>

                                            {renderFilter.range.map((rangeItem, index2) => (
                                                <Grid container justify="space-between" alignItems="center" key={`filterItem${index2}`} wrap="nowrap">
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
                                            ))}
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
                    <ProducstList productsData={productsToShow} currentCat={currentCat.slug}/>
                </Grid>
            </Grid>
        )
    };

    return productsData.error ? <Error /> : productsData.load ? <FilterPtoducts /> : <Loader />;
}

export default withStyles(styles)(ProductsFilter);
