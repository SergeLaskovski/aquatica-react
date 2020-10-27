import React, {useState} from 'react';
import axios from 'axios';

import {withStyles} from '@material-ui/core';
import styles from './LoginRegisterFormStyles';
import {Grid, Box, Typography, TextField} from '@material-ui/core';

import {UserContext} from '@/context/user-context';


//Desktop Top black menu and White menu
function LoginForm(props) {

    const {classes} = props;

    const {updateLoggedUser} = React.useContext(UserContext);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        const API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_LOGIN;
        const emailBody = {
            'yourName': name,
            'yourPassword': password,
        };
        // Create a FormData object, and append each field to the object
        const form = new FormData();

        for (const field in emailBody) {
            form.append(field, emailBody[field]);
        }
        axios.post(API_URL, form)
        .then((response) => {
            if(response.data.ID){
                //const cookies = new Cookies();
                //cookies.set('aqauaticaUser', name, { path: '/', expires: new Date(Date.now()+3600000*24*14) });
                setErrMessage('');
                document.getElementById('loginform').submit();
                updateLoggedUser(name);
                setName('');
                setPassword('');
                setSuccessMessage('You are now looged in');
                setTimeout( props.closeForm, 2000);
            }
            else{
                setSuccessMessage('');
                setErrMessage("User login/password incorrect");
            }

        }, (error) => {
            setErrMessage("Something wrong with connection. Try again later");
            console.log(error);
        });
    }


    return (
        <Grid container>
            <Grid item xs={false} md={6} className={classes.loginImg}>
                
            </Grid>
            <Grid item xs={12} md={6}>
                <span className={classes.closeBtn} onClick={props.closeForm}>&#215;</span>

                
                    <Box p={4}>
                        <Typography variant="h2">Log in</Typography>
                        <Box py={2}>
                            Please log in to your account before trying to save items to your list, if you don’t log in, your items will not save.
                        </Box>
                        {
                        successMessage ? (
                            <Box className={classes.sentMsg} textAlign="center" py={8} px={2}>
                                {successMessage}
                            </Box>
                        ) : (
                            <React.Fragment>
                                <form
                                    onSubmit={handleSubmit}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                required 
                                                id="name" 
                                                label="Name"
                                                value={name}
                                                onChange = {(event) => setName(event.target.value)} 
                                                variant="outlined"
                                                className={classes.textFieldRoot} 
                                                InputProps={{
                                                    name: "name",
                                                    classes: {
                                                        root: classes.textFieldInput,
                                                        notchedOutline: classes.notchedOutline
                                                    },
                                                }}
                                                InputLabelProps={{
                                                }}
                                                fullWidth={true}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="password" 
                                                label="Password"
                                                value={password}
                                                onChange = {(event) => setPassword(event.target.value)} 
                                                variant="outlined"
                                                className={classes.textFieldRoot} 
                                                InputProps={{
                                                    type: "password",
                                                    name: "password",
                                                    classes: {
                                                        root: classes.textFieldInput,
                                                        notchedOutline: classes.notchedOutline
                                                    },
                                                }}
                                                InputLabelProps={{
                                                }}
                                                fullWidth={true}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <button type="Submit" className={classes.aButtonBrown}>Log in</button>
                                            {
                                                errMessage && (
                                                    <Box className={classes.errorMsg} textAlign="right" pt={2}>
                                                        {errMessage}
                                                    </Box>
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                </form>
                            </React.Fragment>
                        )
                    }
                        <iframe name="iframe" width="0" height="0" frameBorder="0" title="Login"></iframe>
                        <form 
                            id="loginform" 
                            target="iframe"
                            method="post" action={`${process.env.REACT_APP_BASE_URL}/cms/user-login/`}
                        >
                            <input type="hidden" name="username" value={name}/>
                            <input type="hidden" name="password" value={password}/>
                        </form>
                        <Box py={2}>
                            Don't have account? <span onClick={()=>props.setShowForm()} className={classes.switchSpan}>Register here</span>
                        </Box>


                    </Box>

            </Grid>
        </Grid>
        

    )
}

export default withStyles(styles)(LoginForm);