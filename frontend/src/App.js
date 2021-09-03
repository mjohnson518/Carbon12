import { Box, ChakraProvider, Grid, theme, VStack } from '@chakra-ui/react';
import React from 'react';

import { Layout } from "./components/Layout"

import { Dapp } from './components/Dapp';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <Layout>
            <VStack spacing={8}>
              <Dapp />
            </VStack>
          </Layout>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;

{/* <Logo h="40vmin" pointerEvents="none" />
<Text>
  Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
</Text>
<Link
  color="teal.500"
  href="https://chakra-ui.com"
  fontSize="2xl"
  target="_blank"
  rel="noopener noreferrer"
>
  Learn Chakra
</Link> */}
