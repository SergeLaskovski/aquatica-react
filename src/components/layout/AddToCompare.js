import React from 'react';
import axios from 'axios';

import {Box} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

import CompareIcon from '@material-ui/icons/Compare';

import {withStyles} from '@material-ui/core';
import styles from './AddToCompareStyles';

import LoginComponent from '@/components/login/Login';

import {UserContext} from '@/context/user-context';
import {ComparelistContext} from '@/context/comparelist-num-context';

import UseDataApi from '@/hooks/UseDataApi';


function AddToCompare(props) {

    const {classes} = props;

    const {loggedUser} = React.useContext(UserContext);

    let {updateCompareNum} = React.useContext(ComparelistContext);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const popText = loggedUser ? "Product added to your Comparelist" : "Please login";
  
    const openPop = Boolean(anchorEl);
    const popId = openPop ? 'simple-popover' : undefined;

    const COMPARELIST_CHECK_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_COMPARELIST + "?username="+loggedUser+"&check="+props.productCode;;
    const comparelistCheckData = UseDataApi(COMPARELIST_CHECK_API_URL);

    const [msg, setMsg] = React.useState('Add to compare');
    
    const addCompareHandler = (event,whishItem) =>{
        event.preventDefault();
        const popEvent = event.currentTarget;
        if(loggedUser){
          const COMPARELIST_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_COMPARELIST + "?username="+loggedUser+"&add="+whishItem;
          axios
            .get(COMPARELIST_API_URL)
            .then((res) => {
              setAnchorEl(popEvent);
              setMsg("Added to compare");
              updateCompareNum(1);
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
        else{
          setAnchorEl(popEvent);
        }
  
    }

    const AddCompareNotLogged = () => {
        return (
            <span
                className={`${classes.aButtonBlack}
                ${classes.justfyStart}`}
                onClick={props.handleMenuOpen}
            >
                <CompareIcon fontSize="small"/>&nbsp;&nbsp;Add to Compare
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
                loggedUser && comparelistCheckData.load? 
                    (
                        <a 
                            href='/#'
                            title="Add to Comparelist"
                            className={`${classes.aButtonBlack} ${classes.justfyStart}${comparelistCheckData.data ? classes.disabled : ''}`}
                            onClick={(event)=>addCompareHandler(event,props.productCode)}
                            aria-describedby={popId}
                        >
                            <CompareIcon fontSize="small"/>{comparelistCheckData.data ? '  Added to Compare' : `  ${msg}`}
                        </a>
                    ) : (
                        <LoginComponent>
                            <AddCompareNotLogged/>
                        </LoginComponent>
                    )
            }
        </React.Fragment>
    )
}

export default withStyles(styles)(AddToCompare);


