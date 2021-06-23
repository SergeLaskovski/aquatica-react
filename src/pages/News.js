import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import { withStyles } from '@material-ui/core';
import styles from './NewsStyles.js';
import { Grid, Typography, Box } from '@material-ui/core';

import moment from 'moment'

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import FourtyFour from '@/components/FourtyFour';


function NewsPage(props) {

  
    const { classes } = props;

    let postSlug=null;
    if(props.match.params.postSlug){postSlug = encodeURIComponent(props.match.params.postSlug);}

    const DisplayOnePost = () => {
        const POST_API_URL = process.env.REACT_APP_API_BASE + '/posts?slug='+postSlug;
        const postData = UseDataApi(POST_API_URL);
        return(
            <React.Fragment>
            {
                postData.error  ? (
                    <Error />
                ) : postData.load ? 
                        postData.data.length>0 ? (
                            <React.Fragment>
                                <Box px={3} pt={3}><NavLink to="/news" className={classes.arrow}>&#9666; Back to News &#9666;</NavLink></Box>
                                <Box p={6}>
                                    <Box py={2}><Typography variant="caption">{moment(postData.data[0].date).format("Do MMM YYYY")}</Typography></Box>
                                    <Typography variant="h2" dangerouslySetInnerHTML={{__html: postData.data[0].title.rendered}}></Typography>
                                    <Box pt={2} dangerouslySetInnerHTML={{__html: postData.data[0].content.rendered}}/>

                                </Box>
                                <Box px={3} pt={3}><NavLink to="/news" className={classes.arrow}>&#9666; Back to News &#9666;</NavLink></Box>
                            </React.Fragment>
                        ) : (
                            <FourtyFour msg="No Posts"/>
                        )
                 : (
                    <Loader />
                )
            }
            </React.Fragment>
        )
    }

    const DisplayCategories = () => {
        const POSTS_CATEGORIES_URL = process.env.REACT_APP_API_BASE + '/categories';
        const newsCatsData = UseDataApi(POSTS_CATEGORIES_URL);
        const [chosenCat, setChosenCat] = React.useState();
        return(
            <React.Fragment>
            {
                newsCatsData.error ? (
                    <Error />
                ) : newsCatsData.load ? (
                    <React.Fragment>
                        <Box className={classes.newsHeaders}>
                            {
                                newsCatsData.data.map((oneCategory, index) => (
                                    oneCategory.name !== 'Uncategorized' && (
                                        <Box 
                                            onClick={()=>setChosenCat(oneCategory.id)}
                                            key={`NewsCategory${index}`}
                                            className={`${classes.newsHeader} ${chosenCat === oneCategory.id || (!chosenCat && oneCategory.id === newsCatsData.data[0]['id']) ? classes.newsHeaderSelected : ''}`}
                                        >
                                            {oneCategory.name}
                                        </Box>
                                    )
                                ))
                            }
                        </Box>
                        <DisplayAllPosts cat={chosenCat ? chosenCat : newsCatsData.data[0]['id']}/>
                    </React.Fragment>
                ) : (
                    <Loader />
                )
            }
            </React.Fragment>
        )
    }

    const DisplayLastPost = () =>{
        const POSTS_API_URL = process.env.REACT_APP_API_BASE + '/posts?filter[orderby]=date&order=asc';
        const postsData = UseDataApi(POSTS_API_URL);

        return(
            <React.Fragment>
            {
                postsData.error ? (
                    <Error />
                ) : postsData.load ? (
                    <React.Fragment>
                        <Grid container>
                            <Grid xs={12} md={6} item>
                                <img src={postsData.data[0].featuredImgUrl} className={classes.imgFluid} alt={postsData.data[0].title.rendered}/>
                            </Grid>
                            <Grid xs={12} md={6} item container alignItems="center">
                                <Box p={6}>
                                    <Box py={2}><Typography variant="caption">{moment(postsData.data[0].date).format("Do MMM YYYY")}</Typography></Box>
                                    <Typography variant="h2" dangerouslySetInnerHTML={{__html: postsData.data[0].title.rendered}}></Typography>
                                    <Box pt={2} dangerouslySetInnerHTML={{__html: postsData.data[0].shortText}}></Box>
                                    <Box pt={3}><NavLink to={`/news/${postsData.data[0].slug}`} className={classes.aButtonBrown}>Continue reading</NavLink></Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                ) : (
                    <Loader />
                )
            }
            </React.Fragment>
        )
    }

    const DisplayAllPosts = (postListProps) => {
        const cat = postListProps.cat;
        const POSTS_API_URL = process.env.REACT_APP_API_BASE + '/posts?filter[orderby]=date&order=asc';
        const postsData = UseDataApi(POSTS_API_URL);

        return(
            <React.Fragment>
            {
                postsData.error ? (
                    <Error />
                ) : postsData.load ? (
                    <React.Fragment>
                        <Box p={6}>
                            <Grid container className={classes.catsContainer} alignItems="stretch" justify="flex-start">
                                {
                                postsData.data.map((onePost, index) => (
                                    onePost.categories[0] === cat && (
                                        <Grid item className={classes.catItemContainer} key={`News${index}`}>
                                            <div className={classes.hoverCard}>
                                                <NavLink to={`/news/${onePost.slug}`} className={classes.aNone}>
                                                <Grid
                                                    container
                                                    direction="column"
                                                    justify="space-between"
                                                    alignItems="stretch"
                                                    className={classes.h100}
                                                >
                                                    <Grid
                                                        item
                                                        className={classes.productImgContainer}
                                                        style={{backgroundImage: 'url("' + onePost.featuredImgUrl + '")'}}
                                                    ></Grid>
                                                    <Grid item container 
                                                        direction="column"
                                                        justify="space-between"
                                                        alignItems="stretch"
                                                        className={classes.flexGrow}
                                                    >
                                                    <Box component="div" p={3}>
                                                        <Typography variant="caption">{moment(onePost.date).format("Do MMM YYYY")}</Typography>
                                                        <Box fontWeight="fontWeightBold" dangerouslySetInnerHTML={{__html: onePost.title.rendered}}></Box>
                                                    </Box>
                                                    </Grid>
                                                </Grid>
                                                </NavLink>
                                            </div>
                                        </Grid>
                                    )
                                ))
                                }
                            </Grid>
                        </Box>
                    </React.Fragment>
                ) : (
                    <Loader />
                )
            }
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {
            postSlug ?
                <DisplayOnePost/>
            :
                <React.Fragment>
                    <DisplayLastPost/>
                    <DisplayCategories/>
                </React.Fragment>
            }
            <Box p={6}/>
        </React.Fragment>
    )
}

export default withRouter(withStyles(styles)(NewsPage));