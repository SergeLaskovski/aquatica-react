import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';


import {withStyles} from '@material-ui/core';
import styles from './SearchStyles';
import {Grid, Box, Typography, TextField} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import SearchIcon from '@material-ui/icons/Search';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



function SearchComponent(props) {
  
    const {classes} = props;

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
   
   
    const SearchItems = (str) => {
        
        const [search, setSearch] = React.useState('');
        const [searchFor, setSearchFor] = React.useState('');

        const setSearchDelay = (str) => {
            setSearch(str) 
            setTimeout(
                () => setSearchFor(str), 
                300
            );
        }

        const DisplayResults = (props) =>{

            const searchStr = props.searchStr;

            const PRODUCTS_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_PRODUCTS + "?search="+searchStr;
            const productsData = UseDataApi(PRODUCTS_API_URL);


            return (
                <Box pt={3}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box fontWeight="Bold">Search results for "{searchStr}"</Box>
                        </Grid>
                    {
                        productsData.error ? (
                            <Error />
                        ) : productsData.load ? (
                                productsData.data.length<1 ?
                                    <Box p={6}>No results matching your search</Box>
                                :
                                productsData.data.map((product,index)=>(
                                    <React.Fragment key={`wish${index}`}>
                                        <Grid item xs={12} md={3}>
                                            <NavLink exact to={`/products/${product.catSlug}/${product.slug}`} className={classes.noLink}>
                                                <Box mt={{xs: 3, md: 2}} mb={{xs: 2, md: 2}} className={classes.imgContainer}>
                                                    <img src={product.img} alt={product.name} className={classes.wishProductImg}/>
                                                </Box>
                                            </NavLink>
                                        </Grid>
                                        <Grid item container xs={12} md={9}
                                            direction="column"
                                            justify="center"
                                            alignItems="flex-start"
                                        >
                                            <Box py={2} px={{xs:0,md:3}}>
                                                <Box fontWeight="Bold">
                                                    <NavLink exact to={`/products/${product.catSlug}/${product.slug}`} className={classes.noLink}>
                                                        <Typography variant="h4" dangerouslySetInnerHTML={{__html: product.title}}></Typography>
                                                    </NavLink>
                                                </Box>
                                                
                                                <Box component="div" fontStyle="italic" pt={2}>
                                                    <Typography component="div" variant="caption">{product.code}</Typography>
                                                </Box>
                                                {/*
                                                product.colour.length>0 &&
                                                    <Box component="div" pt={2}  dangerouslySetInnerHTML={{__html: product.colour}}></Box>
                                                */}
                                            </Box>
                                        </Grid>
                                    </React.Fragment>
                                ))
                        ) : (
                            <Loader />
                        )
                    }
                    </Grid>
                </Box>
            )
        }

        return(
            <React.Fragment>
                <Box pt={3}>
                    <TextField
                        id="search-field" 
                        label="Search (3 symbols and more)"
                        value={search}
                        onChange = {(event) => setSearchDelay(event.target.value)} 
                        variant="outlined"
                        className={classes.textFieldRoot} 
                        InputProps={{
                            name: "search",
                            classes: {
                                root: classes.textFieldInput,
                                notchedOutline: classes.notchedOutline
                            },
                        }}
                        InputLabelProps={{
                        }}
                        fullWidth={true}
                    />
                </Box>
                {
                    searchFor.length>2 && <DisplayResults searchStr={searchFor}/>
                }
                
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Box component="span" className={classes.searchIcon} onClick={()=>setOpen(true)}><SearchIcon/></Box>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-labelledby="serchModal"
                aria-describedby="serchModal-description"
                fullWidth
                maxWidth = "sm"
                classes={{ paper: classes.dialogRoot }}
            >
                <span className={classes.closeBtn} onClick={handleClose}>&#215;</span>
                <SearchItems/>
            </Dialog>
        </React.Fragment>
    )
}

export default withRouter(withStyles(styles)(SearchComponent));