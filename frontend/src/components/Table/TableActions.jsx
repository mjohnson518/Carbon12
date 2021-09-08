import { RepeatIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, HStack, Select, Stack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';

import { fetchFormData } from './typeform';

export const TableActions = (props) => {
  const toast = useToast();

  function handleFormData() {
    toast({
      title: "resyncing table data...",
      status: 'info',
      isClosable: true,
    })

    fetchFormData(toast)
  }

  return (
    <Stack spacing="4" direction={{ base: 'column', md: 'row' }} m={5} justify="space-between">
      <HStack>
        {/* <FormControl minW={{ md: '320px' }} id="search">
          <InputGroup size="sm">
            <FormLabel srOnly>Filter by name or email</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <BsSearch />
            </InputLeftElement>
            <Input rounded="base" type="search" placeholder="Filter by name or email..." />
          </InputGroup>
        </FormControl> */}
        <Select w={{ base: '300px', md: 'unset' }} rounded="base" size="sm" placeholder="All roles">
          <option>All roles</option>
          <option>UI Designers</option>
          <option>Marketing Directors</option>
        </Select>
      </HStack>
      <ButtonGroup size="sm" variant="outline">
        <Button
          iconSpacing="1"
          leftIcon={<RepeatIcon fontSize="1.25em"/>}
          onClick={() => handleFormData()}>
          re-sync
        </Button>
        <Button iconSpacing="1" leftIcon={<RiArrowRightUpLine fontSize="1.25em" />}>
          Export CSV
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
