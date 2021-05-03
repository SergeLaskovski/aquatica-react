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

    // const getAppStyle = () => {
    //     return {
    //         backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0) 70%, rgba(255,255,255,1) 100%), url('"+bgImage+"')"
    //     };
    // }
    verifyImageURL(imgSRC);
    console.log(bgImage);

    // return (
    //     <Box className={classes.topContainer}>
    //         <Box className={`${classes.imgContainer} ${bgImage.length>0 ? '': classes.imgContainerNarrow}`}  style={getAppStyle()} ></Box>
    //         <Typography variant="h1" component="h1" className={classes.h1}>{title}</Typography>
    //     </Box>
    // )
    return (
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

export default withStyles(styles)(LandingPageImage);
