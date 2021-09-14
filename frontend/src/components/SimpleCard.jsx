import { Box, Text, useColorModeValue as mode } from '@chakra-ui/react';
import * as React from 'react';

export const SimpleCard = (props) => {
  const { title, children } = props
  return (
    <Box as="section" py="12" bg={mode('gray.100', 'inherit')} {...props}>
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ md: '8' }}>
        <Box
          maxW="xl"
          mx="auto"
          py="6"
          px="8"
          rounded={{ md: 'lg' }}
          bg={mode('white', 'teal')}
          shadow="base"
        >
          <Box mb="5">
            <Text as="h1" fontWeight="bold" fontSize="3xlg" pb={50}>
              { title }
            </Text>

            { children }
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
