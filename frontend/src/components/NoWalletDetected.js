import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Link, Text, VStack } from '@chakra-ui/layout';
import { Container } from '@chakra-ui/react';
import React from 'react';

import { SimpleCard } from './SimpleCard';

export function NoWalletDetected() {
  return (
    <Container maxW="xl" centerContent mb={40}>
      <VStack spacing={4} align="stretch" minHeight="55vh">
        <SimpleCard mt="100px" title="No Ethereum wallet was detected.">
          Please install{" "}
          <Link
            href="http://metamask.io"
            target="_blank"
            rel="noopener noreferrer"
            color="teal"
            isExternal>
            MetaMask <ExternalLinkIcon mx="2px" />
          </Link>
        </SimpleCard>
      </VStack>
    </Container>
  );
}
