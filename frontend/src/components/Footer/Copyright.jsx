import { Text } from '@chakra-ui/layout'
import * as React from 'react'
import { PROJECT_NAME } from '../../constants'

export const Copyright = (props) => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} { PROJECT_NAME }, Inc. All rights reserved.
  </Text>
)
