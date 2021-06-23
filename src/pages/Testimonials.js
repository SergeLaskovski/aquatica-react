import React from 'react';

import { withStyles } from '@material-ui/core';
import styles from './TestimonialsStyles.js';
import { Typography, Box } from '@material-ui/core';

import UseDataApi from '@/hooks/UseDataApi';
import Loader from '@/components/Loader';
import Error from '@/components/Error';


function Testimonials(props) {

    const { classes } = props;
  
    const TESTIMONIAL_API_URL = process.env.REACT_APP_API_BASE + '/testimonials';
    const testimonialsData = UseDataApi(TESTIMONIAL_API_URL);
    
    console.log(TESTIMONIAL_API_URL);

    return (
        <React.Fragment>
            <Typography variant="h1" component="div">
                <Box pt={6} px={6}>Testimonials</Box>
            </Typography>
            <Box p={6}>
                <div className={classes.columns}>
                {
                    testimonialsData.error ? (
                        <Error />
                        ) : testimonialsData.load ? (
                            testimonialsData.data.map((testimonial,index)=>(
                                <Box p={3} key={`testimonial${index}`} className={classes.avoidBrake}>
                                    &#9733;&#9733;&#9733;&#9733;&#9733;
                                    <Box textAlign="justify" dangerouslySetInnerHTML={{__html: testimonial['content']['rendered']}}></Box>
                                    <Box textAlign="right" fontWeight="bold" dangerouslySetInnerHTML={{__html:testimonial['title']['rendered']}}></Box>
                                </Box>
                        ))
                    ) : (
                        <Loader />
                    )
                }
                </div>
            </Box>
            <Box p={6}/>
        </React.Fragment>
    )
}

export default withStyles(styles)(Testimonials);