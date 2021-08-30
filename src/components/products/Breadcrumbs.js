import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core';
import styles from './BreadcrumbsStyles.js';

import {CurrentProductContext} from '@/context/current-product-context';

import UseDataApi from '@/hooks/UseDataApi'
import Error from '@/components/Error';
import {Grid} from '@material-ui/core';


function Breadcrumbs(props) {

    const {currProdContext} = React.useContext(CurrentProductContext);

    const {classes,currentCat} = props;
    let initial = {};
    let breadcrumbsData = {};

    if(props.currentCol){   
        //Breadcrumbs for collections
        initial = {
            title: 'ALL COLLECTIONS',
            url: '/collections/',
            productsUrl: '/collections/'
        }
        breadcrumbsData = {
            error: false,
            load: true,
            data: [{
                name: props.currentCol.title,
                slug: props.currentCol.url
            }]
        }
    }
    else{
        //Breadcrumbs for categories/products
        initial = {
            title: 'ALL PRODUCTS',
            url: '/categories/',
            productsUrl: '/products/'
        }
        const BREADCRUMBS_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_WOOCAT_PARENTS + '/?cat='+currentCat;
        breadcrumbsData = UseDataApi(BREADCRUMBS_API_URL);
    }

    return  (
        <React.Fragment>
            {
            breadcrumbsData.error ? (
              <Error />
            ) : breadcrumbsData.load && (
                <Grid container 
                    className={classes.breadcrumbContainer}
                    justify="flex-start"
                    alignItems="center"
                >
                    <NavLink 
                        exact to={initial.url}
                        className={classes.breadcrumbLink}
                        title={initial.title}
                        dangerouslySetInnerHTML={{__html: initial.title}}
                    >
                    </NavLink>
                    {
                    breadcrumbsData.data.map((breadcrumbsItem,index)=>(
                        (breadcrumbsItem.slug !== currentCat) ? (
                            <NavLink 
                                key={`breadcrumb${index}`}
                                exact to={`${initial.url}${breadcrumbsItem.slug}`}
                                className={classes.breadcrumbLink}
                                title={breadcrumbsItem.name}
                                dangerouslySetInnerHTML={{__html: breadcrumbsItem.name}}
                            >
                            </NavLink>
                        ) : (
                            (props.isShowProduct) ? (
                                <React.Fragment key={`breadcrumb${index}`}>
                                    <NavLink 
                                        exact to={`${initial.productsUrl}${breadcrumbsItem.slug}`}
                                        className={classes.breadcrumbLink}
                                        title={breadcrumbsItem.name}
                                        dangerouslySetInnerHTML={{__html: breadcrumbsItem.name}}
                                    >
                                    </NavLink>
                                    <Grid item className={classes.breadcrumbCurrent} key={`breadcrumb${index}`} dangerouslySetInnerHTML={{__html: currProdContext.title}}>
                                    </Grid>
                                </React.Fragment>
                            ) : (
                                <Grid item className={classes.breadcrumbCurrent} key={`breadcrumb${index}`} dangerouslySetInnerHTML={{__html: breadcrumbsItem.name}}>
                                </Grid>
                            )
                        )
                    ))
                    }

                </Grid>

            )
            }
        </React.Fragment>
    )
}

export default withRouter(withStyles(styles)(Breadcrumbs));