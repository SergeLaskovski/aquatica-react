import React from 'react';

import {withStyles} from '@material-ui/core';
import {Box,Typography} from '@material-ui/core';

import styles from './LandingPageImageStyles';


function LandingPageImage(props) {

    const {img,title,classes} = props;
    const imgSRC = process.env.REACT_APP_BASE_URL + '/assets/images' + img;

    const [bgImage, setBgImage] = React.useState(false);

    //function to check if img exists
    const verifyImageURL = (url) => {
        var img = new Image();
        img.src = url;
        img.onload = function () {
            setBgImage(url);
        };
        img.onerror = function () {
            setBgImage('');
        };
    }

    verifyImageURL(imgSRC);

    return (
        <React.Fragment>
            {   
                title !== 'undefined' && (
                    <React.Fragment>
                    {
                        bgImage && (
                            <img src={bgImage} className={classes.imgFluid} alt={title}/>
                        )
                    }
                    <Box p={6}><Typography variant="h1" component="h1" >{title}</Typography></Box>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    )
}

export default withStyles(styles)(LandingPageImage);
