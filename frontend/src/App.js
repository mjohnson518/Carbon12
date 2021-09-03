import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';

import { Dapp } from './components/Dapp';
import { Layout } from './components/Layout';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Layout>
          <Dapp />
        </Layout>
      </Box>
    </ChakraProvider>
  );
}

export default App;
