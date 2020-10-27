import React from 'react';

import {CategoriesContext} from '@/context/categories-context';

import Breadcrumbs from '@/components/products/Breadcrumbs';
import CatsList from '@/components/products/CatsList';
import PordCatSwitch  from '@/components/products/ProdCatSwitch';

import {Box} from '@material-ui/core';

import FourtyFour from '@/components/FourtyFour';
import Loader from '@/components/Loader';

import FooterContactBanner from '@/components/layout/FooterContactBanner';


function Categories(props) {


  const catDataAll = React.useContext(CategoriesContext);
  const catsParentSlug = props.match.params.cat;
  
  let currentCat = {};
  let subCatData = null;
  if( catDataAll.load ) {  if ( !catsParentSlug ){ currentCat.id = 0; }
    else { currentCat =  findCatDataBySlug( catDataAll.data, catsParentSlug ); }
    subCatData = catDataAll.data[currentCat.id];
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

          <Breadcrumbs currentCat={props.match.params.cat}/>
          <PordCatSwitch catSlug={catsParentSlug ? catsParentSlug : ""} catName={currentCat.title}/>
          {
            catDataAll.load ? (
              <React.Fragment>
                {
                  subCatData ? (
                      <CatsList catsParent={currentCat.id}/>
                  ) : (
                      <FourtyFour msg="No subcategories in this category"/>
                  )
                }
              </React.Fragment>
            ) : (
              <Loader/>
            )
          }
        <Box component="div" p={5}></Box>
        <FooterContactBanner/>
    </React.Fragment>

  )
}

export default Categories;