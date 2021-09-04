import { Box, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import theme from './theme';

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
