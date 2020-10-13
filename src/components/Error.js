import React from 'react';
import {Box, Typography} from '@material-ui/core';

function Error() {
  return (
    <Box element="div" m={2}>
      <Typography color="error">Something wrong =(</Typography>
    </Box>
  );
}

export default Error;
