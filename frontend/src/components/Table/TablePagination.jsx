import { Button, ButtonGroup, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
// import { data } from './_data'

export const TablePagination = ({typeFormData, ...props}) => {
  return (
    <Flex align="center" justify="space-between" m={5}>
      <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
        {typeFormData?.length || 'NA'} members
      </Text>
      <ButtonGroup variant="outline" size="sm">
        <Button as="a" rel="prev">
          Previous
        </Button>
        <Button as="a" rel="next">
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  )
}
