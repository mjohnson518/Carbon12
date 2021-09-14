import { Box, ChakraProvider, toast } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Dapp } from './components/Dapp';
import { Layout } from './components/Layout';
import ViewCarbon12 from './components/ViewCarbon12';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Layout>
          <Router>
            <Switch>
              <Route exact path="/">
                <Dapp />
              </Route>
              <Route path="/carbon12/:id">
                <ViewCarbon12 />
              </Route>
            </Switch>
          </Router>
        </Layout>
      </Box>
    </ChakraProvider>
  );
}

export default App;
