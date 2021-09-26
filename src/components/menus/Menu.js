import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import Megamenu from '@/components/menus/Megamenu';
import CollectionsMegaMenu from '@/components/menus/CollectionsMegaMenu';

import {withStyles} from '@material-ui/core';
import styles from './MenuStyles';
import {Grid, Box, Slide} from '@material-ui/core';

import LoginComponent from '@/components/login/Login';
import SearchComponent from '@/components/search/Search';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {UserContext} from '@/context/user-context';
import WishlistNum from '@/components/layout/WishlistNum';
import ComparelistNum from '@/components/layout/ComparelistNum';


//Desktop Top black menu and White menu
function TopMenus(props) {
  
  const {classes} = props;

  const {loggedUser} = React.useContext(UserContext);

  let menuArr = props.menuData;

  //Component to create the nav link
  const CustomNavLink = (props) => {

    const [anchorDropEl, setAnchorDropEl] = React.useState(null);

    const handleDropOpen = (event) => {
      setAnchorDropEl(event.currentTarget);
    };
  
    const handleDropClose = () => {
      setAnchorDropEl(null);
    };

    if(props.parent>0) return ('');

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
      let dropChildren = [];
      menuArr.main.map(menuItem => {
        if (menuItem.parent*1 === props.ID){
          dropChildren.push(menuItem)
        }
        return true;
      })
      if(dropChildren.length>0){
        return (
          <React.Fragment>
            <NavLink 
              exact to={props.href}
              className={props.class}
              activeClassName={props.classActive}
              title={props.title}
              onMouseEnter={(event)=>handleDropOpen(event)}
              aria-controls={props.ID}
              aria-haspopup="true"
              dangerouslySetInnerHTML={{__html: props.title}}>
            </NavLink>
            <Menu
              id={props.ID}
              anchorEl={anchorDropEl}
              keepMounted
              open={Boolean(anchorDropEl)}
              onClose={handleDropClose}
              disableAutoFocusItem 
              disableScrollLock={true}
              classes={{ paper: classes.menuPaper }}
              PaperProps={{onMouseLeave: handleDropClose}}
            >
              <MenuItem>
                <NavLink exact to={props.href} className={props.class} activeClassName={props.classActive} title={props.title} dangerouslySetInnerHTML={{__html: props.title}}></NavLink>
              </MenuItem>
              {
              dropChildren.map((dropChild, index) => (
                <MenuItem key={`dropChild${index}`}>
                  &nbsp;&nbsp;&#8212;&nbsp;&nbsp;<NavLink exact to={dropChild.path} className={props.class} activeClassName={props.classActive} title={dropChild.title} dangerouslySetInnerHTML={{__html: dropChild.title}}></NavLink>
                </MenuItem>
              ))
              }
            </Menu>
          </React.Fragment>
        );
      } else {
        
        return (
          <React.Fragment>
            {
              props.href==="/" ? (
                <NavLink exact to={props.href} className={props.class} activeClassName={props.classActive} title={props.title} dangerouslySetInnerHTML={{__html: props.title}}></NavLink>
              ) : (
                <NavLink to={props.href} className={props.class} activeClassName={props.classActive} title={props.title} dangerouslySetInnerHTML={{__html: props.title}}></NavLink>
              )
            }
          </React.Fragment>
        );
      }

    }
  }

  const [mmOpen, setMmOpen] = React.useState(false);
  const toggleMM = (event) => {

    event.preventDefault();
    event.stopPropagation();
    if(collectionOpen===true){
      closeAllSlides();
    }
    setMmOpen(!mmOpen);
  }

  //Desktop Collection Megamenu state
  const [collectionOpen, setCollectionOpen] = React.useState(false);
  const toggleCollection = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if(mmOpen===true){
      closeAllSlides();
    }
    setCollectionOpen(!collectionOpen);
  }

  //Close all Desktop open MegaMenus
  const closeAllSlides = () => {
    setMmOpen(false);
    setCollectionOpen(false);
  }

  //get location path to pass it to the CustomNavLink component
  let locationPath = props.location.pathname.split("/");
  locationPath = locationPath[1];

  return (
    <React.Fragment>
      <div className={classes.topMenuPlaceholder}>(_!_)</div>
      <div className={classes.menuContainer} onClick={closeAllSlides}>
      <Grid container 
        className={classes.topNavContainer}
        justify="flex-end"
        alignItems="center"
      >
        {
          loggedUser && (
            <React.Fragment>
              <WishlistNum class={classes.topNavLink}/>
              <ComparelistNum class={classes.topNavLink}/>
            </React.Fragment>
          )
        }
        {
          menuArr.main.map((menuItem,index) => (
            <CustomNavLink 
              key={`topmenuhref-${index}`}
              ID = {menuItem.ID}
              custom={menuItem.custompath}
              href={menuItem.path}
              class={classes.topNavLink}
              parent={menuItem.parent}
              classActive={classes.topNavLinkSelected}
              title={menuItem.title}
              locationPath = {locationPath}
            />
          ))
        }
        <Box component="div" className={ classes.topNavLink }><LoginComponent /></Box>
      </Grid>
      <Grid container className={classes.whiteNavContainer} alignItems="center" wrap="nowrap">
          <Grid item>
                <NavLink to={'/'} className={props.location.pathname === '/' ? classes.navLinkDisabled : ''}>
                   <img src={`${process.env.REACT_APP_BASE_URL}/assets/images/aquatica-logo-top.png`} alt="Aquatica" className={classes.logo}/>
                </NavLink>
          </Grid>
          <Grid item container className={classes.whiteNavItemsContainer} justify="flex-end" alignItems="center">
            {
            menuArr.white.map((menuItem,index) => (
              <CustomNavLink 
                key={`whitemenuhref-${index}`}
                custom={menuItem.custompath}
                href={menuItem.path}
                class={classes.whiteNavLink}
                classActive={classes.whiteNavLinkSelected}
                title={menuItem.title}
                locationPath = {locationPath}
              />
            ))
            }
            <Box component="div" className={classes.whiteNavLink }><SearchComponent /></Box>
          </Grid>
          <Slide direction="down" in={mmOpen} timeout={ 700 }  >
            
              <div className={classes.megamenu}>
                <Megamenu closeAllSlides={closeAllSlides}/>
              </div>
            
          </Slide>
          <Slide direction="down" in={collectionOpen} timeout={ 700 }  >
            <div className={classes.megamenu}>
              <CollectionsMegaMenu closeAllSlides={closeAllSlides}/>
            </div>
          </Slide>
      </Grid>
      </div>       
    </React.Fragment>
  )
}

export default withRouter(withStyles(styles)(TopMenus));