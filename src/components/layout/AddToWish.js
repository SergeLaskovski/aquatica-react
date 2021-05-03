import React from 'react';
import axios from 'axios';

import {Box} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import {withStyles} from '@material-ui/core';
import styles from './AddToWishStyles';

import LoginComponent from '@/components/login/Login';

import {UserContext} from '@/context/user-context';
import {WishlistContext} from '@/context/wishlist-num-context';

import UseDataApi from '@/hooks/UseDataApi';


function AddToWish(props) {

    const {classes} = props;

    const {loggedUser} = React.useContext(UserContext);

    let {updateWishNum} = React.useContext(WishlistContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const popText = loggedUser ? "Product added to your Wishlist" : "Please login";
  
    const openPop = Boolean(anchorEl);
    const popId = openPop ? 'simple-popover' : undefined;

    const WISHLIST_CHECK_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_WISHLIST + "?username="+loggedUser+"&check="+props.productCode;;
    const wishlistCheckData = UseDataApi(WISHLIST_CHECK_API_URL);

    const [msg, setMsg] = React.useState('Add to wishlist');
    
    const addWishHandler = (event,whishItem) =>{
        event.preventDefault();
        const popEvent = event.currentTarget;
        if(loggedUser){
          const WISHLIST_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_WISHLIST + "?username="+loggedUser+"&add="+whishItem;
          axios
            .get(WISHLIST_API_URL)
            .then((res) => {
              setAnchorEl(popEvent);
              setMsg("Added to wishlist");
              updateWishNum(1);
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
        else{
          setAnchorEl(popEvent);
        }
  
    }

    const AddWishNotLogged = () => {
        return (
            <span
                className={`${classes.aButtonBlack}
                ${classes.justfyStart}`}
                onClick={props.handleMenuOpen}
            >
                <FavoriteBorderIcon fontSize="small"/>&nbsp;&nbsp;Add to Wishlist
            </span>
        )
    }
  

    return (
        <React.Fragment>
            <Popover
                id={popId}
                open={openPop}
                anchorEl={anchorEl}
                onClose={()=>setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                classes={{ paper: classes.popover }}
                >
                <Box p={5} className={classes.popoverContent}>{popText}</Box>
            </Popover>

            {
                loggedUser && wishlistCheckData.load? 
                    (
                        <a 
                            href='/#'
                            title="Add to Wishlist"
                            className={`${classes.aButtonBlack} ${classes.justfyStart}${wishlistCheckData.data ? classes.disabled : ''}`}
                            onClick={(event)=>addWishHandler(event,props.productCode)}
                            aria-describedby={popId}
                        >
                            <FavoriteBorderIcon fontSize="small"/>{wishlistCheckData.data ? '  Added to Wishlist' : `  ${msg}`}
                        </a>
                    ) : (
                        <LoginComponent>
                            <AddWishNotLogged/>
                        </LoginComponent>
                    )
            }
        </React.Fragment>
    )
}

export default withStyles(styles)(AddToWish);


