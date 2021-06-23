import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import Slide from '@material-ui/core/Slide';
import Hamburger from 'react-hamburgers';
import '@/assets/css/hamburgers.css'

import {withStyles} from '@material-ui/core';
import styles from './MenuMobileStyles';
import {Grid, Divider, Box} from '@material-ui/core';

import MegamenuMobile from '@/components/menus/MegamenuMobile';
import CollectionsMegaMenuMobile from '@/components/menus/CollectionsMegaMenuMobile';

import {UserContext} from '@/context/user-context';

import WishlistNum from '@/components/layout/WishlistNum';
import ComparelistNum from '@/components/layout/ComparelistNum';

import ChangingLogo from '@/components/layout/ChangingLogo';

import LogoTop1 from '@/assets/images/aquatica-logo-top-plain.png';
import LogoTop2 from '@/assets/images/aquatica-logo-top-text.png';

import LoginComponent from '@/components/login/Login';
import SearchComponent from '@/components/search/Search';



//Mobile menu
function MenuMobile(props) {

  
  const {classes} = props;
  const {loggedUser} = React.useContext(UserContext);

  let menuArr = props.menuData;
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const toggleMobileMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if(mobileMenuOpen===true){
      closeAllSlides();
    }
    setMobileMenuOpen(!mobileMenuOpen);
  }

  //  Megamenu state
  const [mmOpen, setMmOpen] = React.useState(false);
  const toggleMM = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if(collectionOpen===true){
      closeAllSlides();
    }
    setMmOpen(!mmOpen);
  }

  
  //Close all  open MegaMenus
  const closeAllSlides = () => {
    setMmOpen(false);
    setCollectionOpen(false);
    setMobileMenuOpen(false);
  }


  // Collection Megamenu state
  const [collectionOpen, setCollectionOpen] = React.useState(false);
  const toggleCollection = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if(mmOpen===true){
      closeAllSlides();
    }
    setCollectionOpen(!collectionOpen);
  }

  //Component to create the nav link
  const CustomNavLink = (props) => {

    if(props.href === '/products' || props.href === '/categories'){
      return (
        <NavLink to="/categories" onClick={toggleMM} className={`${props.class} ${props.locationPath === 'products' && props.classActive}`} activeClassName={`${props.classActive} ${classes.cursorPointer}`} title={props.title}>{props.title}</NavLink>
      );
    }
    if(props.href === '/collections'){
      return (
        <NavLink to="/collections" onClick={toggleCollection} className={ props.class } activeClassName={`${props.classActive} ${classes.cursorPointer}`} title={props.title}>{props.title}</NavLink>
      );
    }
    if(props.custom){
      return (
        <a href={props.href} className={ props.class } title={props.title}>{props.title}</a>
      );
    }
    else{
      return (
        <NavLink to={props.href} className={props.class} activeClassName={props.classActive} title={props.title} onClick={closeAllSlides}  dangerouslySetInnerHTML={{__html: props.title+(props.parent>0 ? '&nbsp;&nbsp;&#8212;&nbsp;&nbsp;' : '')}}>

        </NavLink>
      );
    }
  }

    //get location path to pass it to the CustomNavLink component
    let locationPath = props.location.pathname.split("/");
    locationPath = locationPath[1];

  return (
    <React.Fragment>

      {/* Mobile menu logo and hamburger */}
      <div className={classes.mobileMenuPlaceholder}></div>
      <div className={classes.menuContainer}>
        <Grid container className={classes.whiteNavContainer} alignItems="center" wrap="nowrap">
            <Grid item>
              <NavLink to={'/'} className={props.location.pathname === '/' ? classes.navLinkDisabled : ''}>
                  <ChangingLogo logo1={LogoTop1} logo2={LogoTop2}/>
              </NavLink>
            </Grid>
            <Grid item container className={classes.whiteNavItemsContainer} justify="flex-end" alignItems="center">
            <Box component="div"><SearchComponent/></Box>
            <Hamburger
                active={mobileMenuOpen}
                type="collapse"
                onClick={toggleMobileMenu}
              />
            </Grid>
        </Grid>
      </div>


      {/* Mobile menu slider */}
      <Slide direction="down" in={mobileMenuOpen} timeout={ 700 }>
        <Grid container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          className={classes.mobileMenuContainer}
          wrap="nowrap"
        >
          {
            menuArr.white.map((menuItem,index) => (
              <CustomNavLink 
                key={`mobileWhiteMenu-${index}`}
                custom={menuItem.custompath}
                href={menuItem.path}
                class={classes.mobileNavLink}
                classActive={classes.whiteNavLinkSelected}
                title={menuItem.title}
                locationPath = {locationPath}
              />
            ))
          }
          <Divider />
          {
            menuArr.main.map((menuItem,index) => (
              <CustomNavLink 
                key={`mobileTopMenu-${index}`}
                custom={menuItem.custompath}
                href={menuItem.path}
                class={classes.mobileNavLink}
                classActive={classes.whiteNavLinkSelected}
                title={menuItem.title}
                locationPath = {locationPath}
                parent={menuItem.parent}
              />
            ))
          }
          <Divider />
          <Box component="div" className={ classes.mobileNavLink }><LoginComponent /></Box>
          {
          loggedUser && (
            <React.Fragment>
              <WishlistNum class={classes.mobileNavLink} closeAllSlides={closeAllSlides}/>
              <ComparelistNum class={classes.mobileNavLink} closeAllSlides={closeAllSlides}/>
            </React.Fragment>
          )
          }
          {/*Mobile MegaMenu */}
          <Slide direction="down" in={mmOpen} timeout={ 700 } mountOnEnter unmountOnExit>
            <div className={classes.megamenu}>
              <MegamenuMobile toggleMM={toggleMM}  toggleMobileMenu={closeAllSlides}/>
            </div>
          </Slide>
          {/*Mobile Collections */}
            <Slide direction="down" in={collectionOpen} timeout={ 700 } mountOnEnter unmountOnExit>
            <div className={classes.megamenu}>
              <CollectionsMegaMenuMobile  toggleCollection={toggleCollection} toggleMobileMenu={closeAllSlides}/>
            </div>
          </Slide>
        </Grid>
      </Slide>
      

    </React.Fragment>
  )
}

export default withRouter(withStyles(styles)(MenuMobile));
