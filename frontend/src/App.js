import { Box, ChakraProvider, toast } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Dapp } from './components/Dapp';
import { Layout } from './components/Layout';
import ViewCarbon12 from './components/ViewCarbon12';
import theme from './theme';

import useIpfsFactory from './components/hooks/useIpfsFactory'
import useIpfs from './components/hooks/useIpfs'

function App() {
  const { ipfs, ipfsInitError } = useIpfsFactory()
  const id = useIpfs(ipfs, 'id')
  const [version, setVersion] = useState(null)

  useEffect(() => {
    if (!ipfs) return;

    const getVersion = async () => {
      const nodeId = await ipfs.version();
      setVersion(nodeId);
    }

    getVersion();
  }, [ipfs])

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Router>
          <Switch>
            <Layout>
              <Route exact path="/">
                <Dapp />
              </Route>
              <Route path="/carbon12/:id">
                <ViewCarbon12 />
              </Route>
            </Layout>
          </Switch>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
