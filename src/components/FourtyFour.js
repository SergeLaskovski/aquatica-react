import React from 'react';
import {Box, Typography} from '@material-ui/core';

function FourtyFour(props) {
  return (
    <Box element="div" m={2}>
      <Typography variant="h2">{props.msg}</Typography>
    </Box>
  );
}

export default FourtyFour;
