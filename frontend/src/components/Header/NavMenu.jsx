import { Box, Button, Flex, HStack, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react';

import { NavItem } from './NavItem';

import { Link as RouterLink } from 'react-router-dom'

const MobileNavMenu = (props) => {
  const { isOpen } = props
  return (
    <Flex
      hidden={!isOpen}
      as="nav"
      direction="column"
      bg="blue.600"
      position="fixed"
      height="calc(100vh - 4rem)"
      top="16"
      insetX="0"
      zIndex={10}
      w="full"
    >
      <Box px="4">
        <NavItem.Mobile active label="Dashboard" color={mode('gray.500', 'gray.500')}/>
        {/* <NavItem.Mobile label="Campaigns" />
        <NavItem.Mobile label="Forms" />
        <NavItem.Mobile label="Sites" />
        <NavItem.Mobile label="Automation" /> */}
      </Box>
    </Flex>
  )
}

const DesktopNavMenu = () => (
  <HStack
    spacing="3"
    flex="1"
    display={{
      base: 'none',
      lg: 'flex',
    }}
  >


    <RouterLink to={`/`}>
      <Button
        size="lg"
        m={4}
        colorScheme="red"
        color={mode('gray.500', 'teal.500')}
        variant="outline">
        Home
      </Button>
    </RouterLink>
    {/* <NavItem.Desktop icon={<HiMail />} label="Campaigns" />
    <NavItem.Desktop icon={<HiDuplicate />} label="Forms" />
    <NavItem.Desktop icon={<HiTemplate />} label="Sites" />
    <NavItem.Desktop icon={<HiRefresh />} label="Automation" /> */}
  </HStack>
)

export const NavMenu = {
  Mobile: MobileNavMenu,
  Desktop: DesktopNavMenu,
}
