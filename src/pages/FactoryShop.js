import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';

import {CurrentProductContextProvider} from '@/context/current-product-context';

import ProductsFilter from '@/components/products/ProductsFilter';
import ProductDisplay from '@/components/products/ProductDisplay';

import CartMenu from '@/components/layout/CartMenu';

import {Box} from '@material-ui/core';


function FactoryShop(props) {

    const currentCat = {"slug":"factory-shop"};
    const [cartData, setCartData] = useState({});
    const iframe = `<iframe src="${process.env.REACT_APP_BASE_URL}/cms/get-cart/" width="0" height="0" frameBorder="0" id="cartFrame"></iframe>`;
    const [cartIframe, setCartIframe] = useState(iframe);

    const updateCartData = () => {
        setTimeout(()=>{
            setCartIframe(`<iframe src="${process.env.REACT_APP_BASE_URL}/cms/get-cart/" width="0" height="0" frameBorder="0" id="${Date.now()}"></iframe>`);
        },1000);
    }

    useEffect(() => {
        setTimeout(()=>{
            const cookies = new Cookies();
            let data = cookies.get('aquaticaCart') ? cookies.get('aquaticaCart').replace(/,\s*$/, "") : '';
            data = '{'+data+'}';
            setCartData(JSON.parse(data));
        },2000);
    }, [cartIframe]);

    


    return (
        <React.Fragment>
            <span dangerouslySetInnerHTML={{__html: cartIframe}}></span>
            <CartMenu cartData={cartData}/>
            <Box pt={4} pb={3} px={2}>All products advertised on our factory shop are in our factory in Auckland.  We apologise in advance if a prior selection by a customer has taken the last of an item before we have had an opportunity to delete it from the site.</Box>
        <CurrentProductContextProvider>

            {
            props.match.params.product ? (
            <ProductDisplay productSlug={props.match.params.product} cartData={cartData} updateCartData={updateCartData}/>
            ) :(
                <ProductsFilter currentCat={currentCat}/>
            )}
            <Box component="div" p={5}></Box>
            
        </CurrentProductContextProvider>
        </React.Fragment>
    )
}

export default FactoryShop;