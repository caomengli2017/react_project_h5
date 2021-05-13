import { Box, Button, Container } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const DemoPage = () => {
  const history = useHistory();
  return (
    <Box width={'100%'} height={'100%'} bgcolor="assist.green">
      <Button
        color="secondary"
        variant="contained"
        onClick={() => history.push('/page1')}
      >
        前往
      </Button>
      <Container fixed>123</Container>
    </Box>
  );
};

export default DemoPage;
