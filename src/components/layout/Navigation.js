import React from 'react';
import {withRouter} from 'react-router-dom';
import {NavigationContext} from '@/context/navigation-context';
import {Hidden} from '@material-ui/core';

import TopMenus from '@/components/menus/Menu'
import MenuMobile from '@/components/menus/MenuMobile'


function Navigation(props) {

  //add current to menu array navContext.data
  //form 2 menus (main and white) from one menu array
  const getMenuArr = (menuItems) => {
    let newMenuItems = [];
    newMenuItems['main'] = [];
    newMenuItems['white'] = [];
    let param = '';
    for (let i = 0; i < menuItems.length; i++) {
      //update context with current page ID
      if (menuItems[i].path === '/'+props.location.pathname.split('/')[1]) {
        updateNavContext(menuItems[i].pageID);
      }
      param = menuItems[i].menu;
      newMenuItems[param].push(menuItems[i]);
    }
    return newMenuItems;
  };

  const {navContext, updateNavContext} = React.useContext(NavigationContext);

  return (
    <React.Fragment>
        {/*Desctop menu*/}
        <Hidden smDown>
          {!navContext.error && navContext.load ? <TopMenus menuData={getMenuArr(navContext.data)}/> : ''}
        </Hidden>
        <Hidden mdUp>
          {!navContext.error && navContext.load ? <MenuMobile menuData={getMenuArr(navContext.data)}/> : ''}
        </Hidden>
    </React.Fragment>
  );
}

export default withRouter(Navigation);
