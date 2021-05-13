import { Box, Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Page1 = () => {
  const history = useHistory();
  return (
    <Box width={'100%'} height={'100%'} bgcolor="assist.blue">
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.goBack()}
      >
        返回
      </Button>
    </Box>
  );
};

export default Page1;
