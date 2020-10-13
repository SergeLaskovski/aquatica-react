import React from 'react';
import {Box, makeStyles } from '@material-ui/core';

import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
  root:{
    width: "100%",
    height: '20px'
  }
}));

function Loader() {
  const classes = useStyles();
  return (
    <Box element="div" m={3} className={classes.root}>
      <LinearProgress />
    </Box>
  );
}

export default Loader;
