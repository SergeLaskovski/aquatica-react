import React from 'react';

import {CurrentProductContextProvider} from '@/context/current-product-context';

import ProductsFilter from '@/components/products/ProductsFilter';
import ProductDisplay from '@/components/products/ProductDisplay';

import {Box} from '@material-ui/core';

function FactoryShop(props) {

    const currentCat = {"slug":"factory-shop"};
    return (
        <React.Fragment>
        <CurrentProductContextProvider>

            {
            props.match.params.product ? (
            <ProductDisplay productSlug={props.match.params.product}/>
            ) :(
                <ProductsFilter currentCat={currentCat}/>
            )}
            <Box component="div" p={5}></Box>
            
        </CurrentProductContextProvider>
        </React.Fragment>
    )
}

export default FactoryShop;