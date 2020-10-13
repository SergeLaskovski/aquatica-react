import React from 'react';

import {CategoriesContext} from '@/context/categories-context';
import {CurrentProductContextProvider} from '@/context/current-product-context';

import Breadcrumbs from '@/components/products/Breadcrumbs';
import ProductsFilter from '@/components/products/ProductsFilter';
import ProductDisplay from '@/components/products/ProductDisplay';
import ProdCatSwitch  from '@/components/products/ProdCatSwitch';

import {Box} from '@material-ui/core';

import FooterContactBanner from '@/components/layout/FooterContactBanner';



function Products(props) {

  const catDataAll = React.useContext(CategoriesContext);
  const catsParentSlug = props.match.params.cat;
  
  let currentCat = {};
  if( catDataAll.load ) {
    if ( !catsParentSlug ){ currentCat.id = 0}
    else { currentCat =  findCatDataBySlug( catDataAll.data, catsParentSlug ); }
  }

    //function to find category id by slug
    function findCatDataBySlug(catsData={}, catSlug="") {
      let currentCat = {};
      for (let key in catsData) {
        if (catsData.hasOwnProperty(key)) {
            // eslint-disable-next-line
          catsData[key].forEach((item)=>{
            if(item.slug === catSlug){  currentCat = {'id': item.id, 'title': item.title, 'img': item.img, 'slug': item.slug}; }
          })
        }
      }
      return currentCat;
    }


  return (
    <React.Fragment>
      <CurrentProductContextProvider>

        <Breadcrumbs currentCat={props.match.params.cat} isShowProduct={props.match.params.product ? true : false}/>
        
        {
        props.match.params.product ? (
          <ProductDisplay productSlug={props.match.params.product}/>
        ) :(
          <React.Fragment>
            {catDataAll.data[currentCat.id] &&
              <ProdCatSwitch catSlug={catsParentSlug ? catsParentSlug : ""}  catName={currentCat.title} />
            }
            <ProductsFilter currentCat={currentCat}/>
          </React.Fragment>
        )}
        <Box component="div" p={5}></Box>
        
      </CurrentProductContextProvider>
      <FooterContactBanner/>
    </React.Fragment>
  )
}

export default Products;