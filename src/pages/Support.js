import React, {useState} from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core';
import styles from './SupportStyles.js';
import { Grid, Typography, Box, TextField } from '@material-ui/core';

import UseDataApi from '@/hooks/UseDataApi';

function SupportPage(props) {
  
    const { classes } = props;

    const PAGE_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_CUSTOMPAGES + '/?page=support';
    const pageData = UseDataApi(PAGE_API_URL);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [message, setMessage] = useState('');
    const [errMessage, setErrMessage] = useState([]);
    const [sentMessage, setSentMessage] = useState('');

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const API_URL = process.env.REACT_APP_API_CONTACT7 + '5204/feedback';
        const emailBody = {
            'yourName': name,
            'yourEmail': email,
            'yourPhone': phone,
            'yourCompany': company,
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
                setPhone('');
                setCompany('');
                setMessage('');
                setErrMessage('');
            }
        }, (error) => {
            console.log(error);
        });
    }

    return (
            <Grid container>
                <Grid item xs={12} md={6} lg={4}>
                    {
                    pageData.load &&
                    <img src={pageData.data.img} className={classes.imgFluid} alt="Aquatica Support"/>
                    }
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    <Box p={6}>
                        <Box pb={2}><Typography variant="h1">Contact our support team</Typography></Box>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <Grid container spacing={2}>
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
                                <Grid item xs={12} md={6}>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Phone"
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
                                <Grid item xs={12} md={6}>
                                    <TextField 
                                        id="outlined-basic" 
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
                        </form>
                    </Box>
                </Grid>
            </Grid>
    )
}

export default withStyles(styles)(SupportPage);