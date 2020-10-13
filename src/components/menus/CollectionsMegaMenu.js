import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import {CollectionsContext} from '@/context/collections-context';
import {ColMmBgImageContextProvider} from '@/context/collections-mm-bgimage-context';
import {ColMmBgImageContext} from '@/context/collections-mm-bgimage-context';

import Loader from '@/components/Loader';
import Error from '@/components/Error';

import {withStyles} from '@material-ui/core';
import styles from './MegamenuStyles';
import {Grid, Typography, Box} from '@material-ui/core';

import defaultBG from '@/assets/images/collections_mm.jpg';

function CollectionsMegamenu(props) {

    const {classes} = props;

    const mmData = React.useContext(CollectionsContext);


    //first and second level items
    const MegamenuItems = (props) => {
        const {updateBgImage} = React.useContext(ColMmBgImageContext);

        return (

            <Grid item xs={12} md={9} container justify="space-between" className={classes.mmContainer}>
                {
                mmData.data[0].map((mmTop,index) => (
                    <Grid item xs={12} md key={`mm-column-${index}`} className={`${classes.mmColumn}`} onMouseOver={()=>updateBgImage(mmTop.img)}>
                        <Box pb={2}><Typography variant="h3">{mmTop.title}</Typography></Box>
                        <div className={mmData.data[mmTop.id].length>10 ? classes.columns : ''}>
                          {
                          mmData.data[mmTop.id] && (
                              mmData.data[mmTop.id].map((mmSub,index2) => (
                                  <NavLink to={`/collections/${mmSub.slug}`} className={classes.mmItem} key={index2}>
                                    {mmSub.title}
                                  </NavLink>
                              ))
                          )
                          }
                        </div>
                    </Grid>
                ))
                }
                                          
            </Grid>

        )
    }

    const BgImageComponent = () =>{
        const {bgImage,updateBgImage} = React.useContext(ColMmBgImageContext);
        return (
            <Grid item xs={12} md={3}
                className={classes.imgBG}
                style={{backgroundImage: 'url('+bgImage+')'}} 
                onMouseOver={()=>updateBgImage(defaultBG)}
            />
        )
    }

    return mmData.error ? (
        <Error />
      ) : mmData.load ? (
        <React.Fragment>

            <Grid container className={classes.root}>
                <span className={classes.closeBtn} onClick={props.closeAllSlides}>&#215;</span>
                <ColMmBgImageContextProvider>
                    <BgImageComponent/>
                    <MegamenuItems/>
                </ColMmBgImageContextProvider>
            </Grid>

        </React.Fragment>
      ) : (
        <Loader />
      );
}

export default withRouter(withStyles(styles)(CollectionsMegamenu));
