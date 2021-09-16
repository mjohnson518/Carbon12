import { Text } from '@chakra-ui/layout';
import { Box, useColorModeValue as mode } from '@chakra-ui/react';
import * as React from 'react';
import { FaHeart } from 'react-icons/fa';
import { PROJECT_NAME } from '../../constants';

const Heart = () => (
  <Box
    display="inline-block"
    mx="1"
    color={mode('red.500', 'teal.300')}
    fontSize="sm"
    role="img"
    aria-label="Love"
    as={FaHeart}
  />
);

export const Copyright = props => (
  <Box>
    <Text fontSize="md">
      &copy; {new Date().getFullYear()} {PROJECT_NAME}, Inc. All rights
      reserved.
    </Text>
    <Text fontSize="md">
      Made with <Heart /> in Denver.
    </Text>
  </Box>
);
