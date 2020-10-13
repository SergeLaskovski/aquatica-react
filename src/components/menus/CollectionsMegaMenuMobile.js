import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import {CollectionsContext} from '@/context/collections-context';

import Loader from '@/components/Loader';
import Error from '@/components/Error';

import {withStyles} from '@material-ui/core';
import styles from './MegamenuMobileStyles';
import Collapse from '@material-ui/core/Collapse';
import {Grid} from '@material-ui/core';


function CollectionsMegamenuMobile(props) {

    const {classes} = props;

    const mmData = React.useContext(CollectionsContext);

    const MegamenuItems = (props) => {

      const mmTop = props.data;

      const [checked, setChecked] = React.useState(false);
      const handleChange = (event) => {
          event.preventDefault();
          event.stopPropagation();
          setChecked((prev) => !prev);
      };

      return (
          <React.Fragment>
              <Grid container justify="flex-end" alignItems="center" wrap="nowrap"  onClick={handleChange}>
                  <Grid item>
                      <div className={classes.topLvlItem} >{mmTop.title}</div>
                  </Grid>
                  <Grid item className={classes.arrow}>
                      {checked ? <span>&#9652;</span> : <span>&#9662;</span>}
                  </Grid>
              </Grid>
             
              <Collapse in={checked} timeout={700}>
                  {

                  mmData.data[mmTop.id] ? (
                      mmData.data[mmTop.id].map((mmSub,index2) => (
                          <div className={classes.subItems} key={`mm-collapsible-${index2}`}>
                              <NavLink to={`/collections/${mmSub.slug}`} onClick={props.toggleMobileMenu} className={classes.mmItem}>{mmSub.title}</NavLink>
                          </div>
                      ))
                  ) : ''
                  }
              </Collapse>
          </React.Fragment>
      )
  }


  return mmData.error ? (
      <Error />
    ) : mmData.load ? (
          <Grid 
              container 
              direction="column"
              justify="flex-start"
              alignItems="flex-end"
              className={classes.mmContainer}
              wrap="nowrap"
          >
              <Grid item className={classes.backButton}>
                  <a href="#back" className={classes.mmViewAll} onClick={props.toggleCollection}>&#9666;&nbsp;BACK&nbsp;&#9666;</a>
              </Grid>


              {
              mmData.data[0].map((mmTop,index) => (
                  <Grid item key={`mm-column-${index}`} >
                      <MegamenuItems data={mmTop} toggleMobileMenu={props.toggleMobileMenu}/>
                  </Grid>
              ))
              }
                                        

          </Grid>
    ) : <Grid container alignItems="center"><Loader/></Grid>
}

export default withRouter(withStyles(styles)(CollectionsMegamenuMobile));
