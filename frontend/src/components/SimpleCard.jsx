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
            <Text as="h3" fontWeight="bold" fontSize="lg">
              { title }
            </Text>
            <Text fontSize="lg" mt="1" color={mode('gray.600', 'gray.200')}>
              { children }
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
