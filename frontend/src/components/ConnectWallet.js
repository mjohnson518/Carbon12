import React from "react";

import { NetworkErrorMessage } from "./NetworkErrorMessage";

import { Button, Flex, Box, Stack, StackDivider, Text, useColorModeValue as mode } from '@chakra-ui/react'

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

export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <Box as="section" bg={mode('gray.100', 'gray.800')} py="12">
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
            {/* Metamask network should be set to Localhost:8545. */}
            {networkError && (
              <NetworkErrorMessage
                message={networkError}
                dismiss={dismiss}
              />
            )}
            <Text color="gray.500" fontSize="sm">
              Please connect to your wallet.
            </Text>
          </Box>
          <Stack spacing="4" divider={<StackDivider />}>
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
