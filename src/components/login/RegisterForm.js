import React, {useState} from 'react';
import axios from 'axios';

import {withStyles} from '@material-ui/core';
import styles from './LoginRegisterFormStyles';
import {Grid, Box, Typography, TextField} from '@material-ui/core';

//import Cookies from 'universal-cookie';
import {UserContext} from '@/context/user-context';

//Desktop Top black menu and White menu
function LoginForm(props) {

    const {classes} = props;

    const {updateLoggedUser} = React.useContext(UserContext);

    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [errMessage, setErrMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        const API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_REGISTER;
        const emailBody = {
            'username': username,
            'password': password,
            'email': email
        };
        // Create a FormData object, and append each field to the object
        const form = new FormData();

        for (const field in emailBody) {
            form.append(field, emailBody[field]);
        }
        axios.post(API_URL, form)
        .then((response) => {
            if(response.data === "OK"){
                //const cookies = new Cookies();
                //cookies.set('aqauaticaUser', name, { path: '/', expires: new Date(Date.now()+3600000*24*14) });
                setErrMessage();
                document.getElementById('registerform').submit();
                updateLoggedUser(username);
                setName('');
                setUserName('');
                setPassword('');
                setEmail('');
                setPhone('');
                setCompany('');
                setLocation('');
                setSuccessMessage('You are now registered and loged in');
                setTimeout( props.closeForm, 2500);
            }
            else{
                setSuccessMessage();
                setErrMessage(response.data);
            }

        }, (error) => {
            setErrMessage("Something wrong with connection. Try again later");
            console.log(error);
        });
    }


    return (
        <Grid container>
            <Grid item xs={false} md={6} className={classes.registerImg}>
                
            </Grid>
            <Grid item xs={12} md={6}>
                <span className={classes.closeBtn} onClick={props.closeForm}>&#215;</span>

                
                    <Box p={4}>
                        <Typography variant="h2">Register</Typography>
                        <Box py={2}>
                            Please fill out the below details to create an account.
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
                                                id="username" 
                                                label="Username"
                                                value={username}
                                                onChange = {(event) => setUserName(event.target.value)} 
                                                variant="outlined"
                                                className={classes.textFieldRoot} 
                                                InputProps={{
                                                    name: "username",
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
                                            <TextField
                                                required
                                                id="email" 
                                                label="Email"
                                                value={email}
                                                onChange = {(event) => setEmail(event.target.value)} 
                                                variant="outlined"
                                                className={classes.textFieldRoot} 
                                                InputProps={{
                                                    type: "email",
                                                    name: "emal",
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
                                                id="phone" 
                                                label="Phone number"
                                                value={phone}
                                                onChange = {(event) => setPhone(event.target.value)} 
                                                variant="outlined"
                                                className={classes.textFieldRoot} 
                                                InputProps={{
                                                    type: "phone",
                                                    name: "phone",
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
                                                id="company" 
                                                label="Company"
                                                value={company}
                                                onChange = {(event) => setCompany(event.target.value)} 
                                                variant="outlined"
                                                className={classes.textFieldRoot} 
                                                InputProps={{
                                                    name: "company",
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
                                                id="location" 
                                                label="Location"
                                                value={location}
                                                onChange = {(event) => setLocation(event.target.value)} 
                                                variant="outlined"
                                                className={classes.textFieldRoot} 
                                                InputProps={{
                                                    name: "location",
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
                                            <button type="Submit" className={classes.aButtonBrown}>Register now</button>
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
                        <iframe name="registerIframe" width="0" height="0" frameBorder="0" title="Register"></iframe>
                        <form 
                            id="registerform" 
                            target="registerIframe"
                            method="post"
                            action={`${process.env.REACT_APP_BASE_URL}/cms/new-user-register/`}
                        >
                            <input type="hidden" name="new-name" value={name}/>
                            <input type="hidden" name="new-username" value={username}/>
                            <input type="hidden" name="new-password" value={password}/>
                            <input type="hidden" name="new-email" value={email}/>
                            <input type="hidden" name="new-phone" value={phone}/>
                            <input type="hidden" name="new-company" value={company}/>
                            <input type="hidden" name="new-location" value={location}/>
                        </form>

                        <Box py={2}>
                            Have an account? <span onClick={()=>props.setShowForm()} className={classes.switchSpan}>Login here</span>
                        </Box>


                    </Box>

            </Grid>
        </Grid>
        

    )
}

export default withStyles(styles)(LoginForm);