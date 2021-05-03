import React from 'react';
import {/*NavLink,*/ withRouter} from 'react-router-dom';

import {UserContext} from '@/context/user-context';

import {withStyles} from '@material-ui/core';
import styles from './LoginStyles';
import {Box, Typography} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import LoginForm from '@/components/login/LoginForm';
import RegisterForm from '@/components/login/RegisterForm';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function LoginComponent(props) {
  
    const {classes} = props;

    let {loggedUser,updateLoggedUser} = React.useContext(UserContext);

    const [open, setOpen] = React.useState(false);
    const [showForm, setShowForm] = React.useState('login');

    const [anchorEl, setAnchorEl] = React.useState(null);

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        document.getElementById('logoutform').submit();
        updateLoggedUser('');
        handleMenuClose();

    }

    return (
        <React.Fragment>
            {
                (loggedUser.length<1) ? (
                    <React.Fragment>
                        <Box component="span" onClick={handleClickOpen}>
                            {
                                props.children ? (props.children) : 'login'
                            }
                        </Box>
                    </React.Fragment>

                ) : (
                    <React.Fragment>
                        <Box component="span" onClick={handleMenuOpen} aria-controls="account-menu" aria-haspopup="true">
                            My account
                        </Box>
                        <Menu
                            id="account-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            TransitionComponent={Fade}
                            disableAutoFocusItem
                            disableScrollLock={true}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                            <Box textAlign="right" px={2} py={1}>
                                <Typography variant="caption">Logged&nbsp;in&nbsp;as:&nbsp;<Box component="span" fontWeight="Bold">{loggedUser}</Box></Typography>
                            </Box>
                        </Menu>

                  </React.Fragment>
                )
            }
            <Dialog
                id={Math.random()}
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                classes = {{
                    root: classes.dialogRoot,
                }}
                fullWidth
                maxWidth = "md"
            >
                {
                    showForm === 'login' ?
                        <LoginForm setShowForm={()=>setShowForm('register')} closeForm={handleClose}/>
                    :
                        <RegisterForm setShowForm={()=>setShowForm('login')} closeForm={handleClose}/>
                }
            </Dialog>
            <iframe name="iframeLogout" width="0" height="0" frameBorder="0" title="Logout"></iframe>
            <form 
                id="logoutform" 
                target="iframeLogout"
                method="post" action={`${process.env.REACT_APP_BASE_URL}/cms/user-logout/`}
            >
            </form>
            
        </React.Fragment>
    )
}

export default withRouter(withStyles(styles)(LoginComponent));