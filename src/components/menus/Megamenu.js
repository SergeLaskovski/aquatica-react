import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import {CategoriesContext} from '@/context/categories-context';
import {MmBgImageContextProvider} from '@/context/mm-bgimage-context';
import {MmBgImageContext} from '@/context/mm-bgimage-context';

import Loader from '@/components/Loader';
import Error from '@/components/Error';

import {withStyles} from '@material-ui/core';
import styles from './MegamenuStyles';
import {Grid} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

import defaultBG from '@/assets/images/products_mm.jpg';

function Megamenu(props) {

    const {classes} = props;

    const mmData = React.useContext(CategoriesContext);


    //third level items
    const MegaCollapsible = (props) => {
        const [checked, setChecked] = React.useState(false);
        const handleChange = (event) => {
            event.preventDefault();
            event.stopPropagation();
            setChecked((prev) => !prev);
        };
        return (
            <div>
                {
                mmData.data[props.data.id] ? (
                    //if has subsubmenu
                    <React.Fragment>
                        
                        <Grid container alignItems="center" wrap="nowrap">
                            <Grid item xs={8}>
                                <NavLink to={`/categories/${props.data.slug}`} className={classes.mmItem}>
                                    {props.data.title}
                                </NavLink>
                            </Grid>
                            <a href="/#" className={classes.mmItem} onClick={handleChange}>
                            <Grid item xs={4} className={classes.arrowContainer}>
                                {checked ? <span className={classes.arrow}>&#9652;</span> : <span className={classes.arrow}>&#9662;</span>}
                            </Grid>
                            </a>
                        </Grid>
                        <Collapse in={checked} timeout={700}>
                            <div className={classes.mmSubContainer}>
                            {
                            mmData.data[props.data.id].map((mmSubSub,index) => (
                                <NavLink to={`/products/${mmSubSub.slug}`} key={`mm-subsubitem-${index}`} className={classes.mmItem}>
                                    {mmSubSub.title}
                                </NavLink>
                            ))
                            }
                                <NavLink to={`/products/${props.data.slug}`} className={classes.mmViewAll}>
                                    ALL <span className={classes.darker}>{props.data.title}</span> PRODUCTS
                                </NavLink>
                            </div>
                        </Collapse>
                    </React.Fragment>
                ) : (//if no subsubmenu
                    <NavLink to={`/products/${props.data.slug}`} className={classes.mmItem}>
                        {props.data.title}
                    </NavLink>
                )
                }
            </div>


           
        )
    }


    //first and second level items
    const MegamenuItems = (props) => {
        const {updateBgImage} = React.useContext(MmBgImageContext);

        return (

            <Grid item xs={9} container justify="space-between" className={classes.mmContainer}>
                {
                mmData.data[0].map((mmTop,index) => (
                    <Grid item key={`mm-column-${index}`} className={classes.mmColumn} onMouseOver={()=>updateBgImage(mmTop.img)}>
                        <NavLink  to={`/categories/${mmTop.slug}`} className={classes.topLvlItem}>{mmTop.title}</NavLink>
                        {
                        mmData.data[mmTop.id] ? (
                            mmData.data[mmTop.id].map((mmSub,index2) => (
                                <MegaCollapsible data={mmSub} key={`mm-collapsible-${index2}`}/>
                            ))
                        ) : ''
                        }
                        <NavLink to={`/products/${mmTop.slug}`} className={classes.mmViewAll}>
                            ALL <span className={classes.darker}>{mmTop.title}</span> PRODUCTS
                        </NavLink>
                    </Grid>
                ))
                }
                                          
            </Grid>

        )
    }

    const BgImageComponent = () =>{
        const {bgImage,updateBgImage} = React.useContext(MmBgImageContext);
        return (
            <Grid item xs={3}
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
                <MmBgImageContextProvider>
                    <BgImageComponent/>
                    <MegamenuItems/>
                </MmBgImageContextProvider>
            </Grid>

        </React.Fragment>
      ) : (
        <Loader />
      );
}

export default withRouter(withStyles(styles)(Megamenu));
