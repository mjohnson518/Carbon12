import { Box, Heading, useToast } from '@chakra-ui/react'
import * as React from 'react'
import { TableActions } from './Table/TableActions';
import { TableContent } from './Table/TableContent';
import { TablePagination } from './Table/TablePagination';

import { PROJECT_NAME } from '../constants';
import { getFormData, fetchFormData } from './Table/typeform'


export const Table = () => {
  const toast = useToast();

  let typeFormData = (getFormData() || []);

  if (typeFormData.length === 0) {
    toast({
      title: "fetching table data...",
      status: 'info',
      isClosable: true,
    })

    fetchFormData()
      .then((response) => {
        typeFormData = response;
        toast({
          title: "table data set",
          status: 'info',
          isClosable: true,
        })
      })
      .catch((error) => {
        toast({
          title: `error fetching table data - ${error}`,
          status: 'error',
          isClosable: true,
        })
      })
  }

  return (
    <Box as="section" py="12">
      <Box maxW="100%" mx="auto" px={{ base: '6', md: '8' }}>
        <Box overflowX="auto">
          <Heading size="lg" mb="6">
            { PROJECT_NAME } Questionaires
          </Heading>
          <TableActions typeFormData={typeFormData} />
          <TableContent typeFormData={typeFormData} />
          <TablePagination typeFormData={typeFormData} />
        </Box>
      </Box>
    </Box>
  )
}
