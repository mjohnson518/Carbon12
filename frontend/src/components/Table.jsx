import { Box, Heading, useToast } from '@chakra-ui/react'
import * as React from 'react'
import { TableActions } from './Table/TableActions';
import { TableContent } from './Table/TableContent';
import { TablePagination } from './Table/TablePagination';

import { PROJECT_NAME } from '../constants';
import { fetchFormData, getFormData } from './hooks/useTypeForm';

const typeFormData = getFormData() || [];

const data = typeFormData.length === 0 ? fetchFormData(typeFormData) : typeFormData;

export const Table = () => {
  const toast = useToast();

  return (
    <Box as="section" py="12">
      <Box maxW="100%" mx="auto" px={{ base: '6', md: '8' }}>
        <Box overflowX="auto">
          <Heading size="lg" mb="6">
            { PROJECT_NAME } Questionaires
          </Heading>
          <TableActions typeFormData={data} />
          <TableContent typeFormData={data} />
          <TablePagination typeFormData={data} />
        </Box>
      </Box>
    </Box>
  )
}
