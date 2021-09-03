import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
} from '@chakra-ui/react'
import * as React from 'react'
import { BsSearch } from 'react-icons/bs'
import { RiAddFill, RiArrowRightUpLine } from 'react-icons/ri'

export const TableActions = () => {
  return (
    <Stack spacing="4" direction={{ base: 'column', md: 'row' }} justify="space-between">
      <HStack>
        <FormControl minW={{ md: '320px' }} id="search">
          <InputGroup size="sm">
            <FormLabel srOnly>Filter by name or email</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400">
              <BsSearch />
            </InputLeftElement>
            <Input rounded="base" type="search" placeholder="Filter by name or email..." />
          </InputGroup>
        </FormControl>
        <Select w={{ base: '300px', md: 'unset' }} rounded="base" size="sm" placeholder="All roles">
          <option>All roles</option>
          <option>UI Designers</option>
          <option>Marketing Directors</option>
        </Select>
      </HStack>
      <ButtonGroup size="sm" variant="outline">
        <Button iconSpacing="1" leftIcon={<RiAddFill fontSize="1.25em" />}>
          New member
        </Button>
        <Button iconSpacing="1" leftIcon={<RiArrowRightUpLine fontSize="1.25em" />}>
          Export CSV
        </Button>
      </ButtonGroup>
    </Stack>
  )
}
