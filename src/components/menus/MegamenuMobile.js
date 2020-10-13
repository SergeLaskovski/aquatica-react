import React from 'react';
import {CategoriesContext} from '@/context/categories-context';
import {NavLink, withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core';
import styles from './MegamenuMobileStyles';

import Loader from '@/components/Loader';
import Error from '@/components/Error';

import {Grid} from '@material-ui/core';

import Collapse from '@material-ui/core/Collapse';


function MegamenuMobile(props) {

    const {classes} = props;


    const mmData = React.useContext(CategoriesContext);

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
                        <a href="#expand" className={classes.mmItem} onClick={handleChange}>
                        <Grid container justify="flex-end" alignItems="flex-end" wrap="nowrap">
                            <Grid item>
                                {props.data.title}
                            </Grid>
                            <Grid item className={classes.arrow}>
                                {checked ? <span>&#9652;</span> : <span>&#9662;</span>}
                            </Grid>
                        </Grid>
                        </a>
                        <Collapse in={checked} timeout={700}>
                            <div className={classes.mmSubContainer}>
                                {
                                mmData.data[props.data.id].map((mmSubSub,index) => (
                                    <NavLink to={`/products/${mmSubSub.slug}`} key={`mm-subsubitem-${index}`} className={classes.mmItem} onClick={props.toggleMobileMenu}>
                                        {mmSubSub.title}
                                    </NavLink>
                                ))
                                }
                                <NavLink to={`/products/${props.data.slug}`} className={classes.mmViewAll} onClick={props.toggleMobileMenu}>
                                    VIEW ALL
                                </NavLink>
                            </div>
                        </Collapse>
                    </React.Fragment>
                ) : (//if no subsubmenu
                    <NavLink to={`/products/${props.data.slug}`} className={classes.mmItem} onClick={props.toggleMobileMenu}>
                        {props.data.title}
                    </NavLink>
                )
                }
            </div>
           
        )
    }


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
                                <MegaCollapsible data={mmSub}  toggleMobileMenu={props.toggleMobileMenu}/>
                            </div>
                        ))
                    ) : ''
                    }
                    <div className={classes.subItems}>
                        <NavLink to={`/products/${mmTop.slug}`} className={classes.mmViewAll}>
                            VIEW ALL
                        </NavLink>
                    </div>
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
                    <a href="#back" className={classes.mmViewAll} onClick={props.toggleMM}>&#9666;&nbsp;BACK&nbsp;&#9666;</a>
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

export default withRouter(withStyles(styles)(MegamenuMobile));
