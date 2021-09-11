import { Box, Button, Flex, Stack, StackDivider, Text, useColorModeValue as mode, useToast } from '@chakra-ui/react';
import React from 'react';

import { Logo } from './Logo';

export const Description = (props) => {
  const { title, children } = props
  return (
    <Flex align="center" pos="relative" justify="space-between">
      <Box flex="1">
        <Box as="h4" fontWeight="medium" maxW="xl">
          {title}
        </Box>
        {children && (
          <Box maxW="xl" color="gray.500" fontSize="sm">
            {children}
          </Box>
        )}
      </Box>
    </Flex>
  )
}

export function ConnectWallet({ connectWallet}) {
  return (
    <Box as="section" bg={mode('gray.100', 'gray.800')} mt={40} minHeight="650px">
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Box
          maxW="3xl"
          mx="auto"
          py="6"
          px="8"
          rounded="lg"
          bg={mode('white', 'gray.700')}
          shadow="base"
          overflow="hidden"
        >
          <Box mb="8">
            <Text color="gray.500" fontSize="sm">
              Please connect to your wallet.
            </Text>
          </Box>
          <Stack spacing="4" divider={<StackDivider />}>
            <Logo bodyLogo="true" />
            <Stack>
              <Button
                onClick={connectWallet}
                colorScheme="teal"
                align="center"
                variant="outline">
                Connect Wallet
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
