import React, {useState} from 'react';
import axios from 'axios';

import {withStyles} from '@material-ui/core';
import styles from './ContactStyles.js';
import { Grid, Typography, Box, TextField} from '@material-ui/core';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

function Contact(props) {

    const {classes} = props;

    const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '/?page=contact-us';
    const pageData = UseDataApi(PAGE_API_URL);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errMessage, setErrMessage] = useState([]);
    const [sentMessage, setSentMessage] = useState('');

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const API_URL = process.env.REACT_APP_API_CONTACT7 + '5230/feedback';
        const emailBody = {
            'yourName': name,
            'yourEmail': email,
            'yourMessage': message
        };
        // Create a FormData object, and append each field to the object
        const form = new FormData();
        let errMsg = [];

        for (const field in emailBody) {
            form.append(field, emailBody[field]);
        }
        axios.post(API_URL, form)
        .then((response) => {
            if(response.data.invalid_fields){
                errMsg = [];
                response.data.invalid_fields.map(invalidField => {
                    errMsg.push(invalidField.message);
                    return true;
                })
                setErrMessage(errMsg);
                setSentMessage('');
            }
            if(response.data.status === 'mail_sent'){
                setSentMessage(response.data.message);
                setName('');
                setEmail('');
                setMessage('');
                setErrMessage('');
            }
        }, (error) => {
            console.log(error);
        });
    }

    return(
        <React.Fragment>
        {
            pageData.error ? (
              <Error />
            ) : pageData.load ? (
                <React.Fragment>
                    <form onSubmit={handleSubmit}>
                    <Box component="div" pb={5} dangerouslySetInnerHTML={{__html: pageData.data.gmap}} ></Box>
                    <Grid container justify="center">
                        {/*
                        <Grid item xs={12} md className={classes.addrItem}>
                            <Typography variant="h3">{pageData.data.addr1Title}</Typography><br/>
                            <div dangerouslySetInnerHTML={{__html: pageData.data.addr1}} ></div>
                        </Grid>
                        <Grid item xs={12} md className={classes.addrItem}>
                            <Typography variant="h3">{pageData.data.addr2Title}</Typography><br/>
                            <div dangerouslySetInnerHTML={{__html: pageData.data.addr2}} ></div>
                        </Grid>
                        <Grid item xs={12} md className={classes.addrItem}>
                            <Typography variant="h3">{pageData.data.addr3Title}</Typography><br/>
                            <div dangerouslySetInnerHTML={{__html: pageData.data.addr3}} ></div>
                        </Grid>
                        */}
                        <Grid item container justify="center" xs={12}>
                            <Grid container spacing={2} className={classes.contactFormContainer}>
                                <Grid item xs={12}>
                                    <Box pb={2}><Typography variant="h1">Contact us</Typography></Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required 
                                        id="outlined-basic" 
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
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        id="outlined-basic" 
                                        label="Email"
                                        value={email}
                                        onChange = {(event) => setEmail(event.target.value)} 
                                        variant="outlined"
                                        className={classes.textFieldRoot} 
                                        InputProps={{
                                            type: "email",
                                            name: "email",
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
                                        label="Message"
                                        value={message}
                                        onChange = {(event) => setMessage(event.target.value)} 
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                        className={classes.textFieldRoot} 
                                        InputProps={{
                                            name: "Message",
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
                                    <button type="Submit" className={classes.aButtonBrown}>Submit</button>
                                    {
                                            errMessage.length>0 && (
                                            errMessage.map((errMsg, index) => (
                                                <Box className={classes.errorMsg} textAlign="right" key={`errMsg${index}`}>
                                                    {errMsg}
                                                </Box>
                                            ))
                                            ) 
                                    }
                                    {
                                    sentMessage &&
                                        <Box className={classes.sentMsg} textAlign="right">{sentMessage}</Box>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    </form>
                </React.Fragment>
            ) : (
              <Loader />
            )
        }
        <Box p={6}/>
        </React.Fragment>
    )

}


export default withStyles(styles)(Contact);
