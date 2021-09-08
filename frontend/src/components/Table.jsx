import { Box, Heading, useToast } from '@chakra-ui/react';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { PROJECT_NAME } from '../constants';
import { TableActions } from './Table/TableActions';
import { TableContent } from './Table/TableContent';
import { TablePagination } from './Table/TablePagination';
import { fetchFormData, getFormData } from './Table/typeform';


export const Table = () => {
  const toast = useToast();

  const [typeFormData, setTypeFormData] = useState(getFormData() || []);

  useEffect(() => {
    if (typeFormData.length === 0) {
      toast({
        title: "fetching table data...",
        status: 'info',
        isClosable: true,
      })

      fetchFormData(toast)
        .then((formData) => setTypeFormData(formData))
        .catch((error) => console.log(error))
    }
  }, [ toast, typeFormData ]
  )

  return (
    <Box as="section" py="12">
      <Box maxW="100%" mx="auto" px={{ base: '6', md: '8' }}>
        <Box overflowX="auto">
          <Heading as="h1" mb="6">
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
