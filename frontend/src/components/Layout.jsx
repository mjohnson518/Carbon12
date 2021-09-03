import { Flex, HStack, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import { Logo } from './Header/Logo'
import { MobileHamburgerMenu } from './Header/MobileHamburgerMenu'
import { NavMenu } from './Header/NavMenu'
import { Notification } from './Header/Notification'
// import { PageContent } from './PageContent'
// import { PageHeader } from './PageHeader'
import { ProfileDropdown } from './Header/ProfileDropdown'
import { useMobileMenuState } from "./hooks/useMobileMenuState"

import { Center, Square, Circle } from "@chakra-ui/react"

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Loading } from './Loading'

export const Layout = ({children}) => {
  const { isMenuOpen, toggle } = useMobileMenuState()
  return (
    <Flex direction="column" bg={mode('gray.100', 'gray.800')} height="100vh">
      <Flex align="center" bg={mode('white', 'gray.700')} color="white" px="6" minH="16">
        <Flex justify="space-between" align="center" w="full">
          <MobileHamburgerMenu onClick={toggle} isOpen={isMenuOpen} />
          <NavMenu.Mobile isOpen={isMenuOpen} />

          {/* Desktop Logo placement */}
          <Logo display={{ base: 'none', lg: 'block' }} flexShrink={0} h="5" marginEnd="10" />

          {/* Desktop Navigation Menu */}
          <NavMenu.Desktop />

          {/* Mobile Logo placement */}
          {/* <Logo flex={{ base: '1', lg: '0' }} display={{ lg: 'none' }} flexShrink={0} h="5" /> */}

          <HStack spacing="3">
            <ColorModeSwitcher justifySelf="flex-end" />
            {/* <Notification display={{ base: 'none', lg: 'inline-flex' }} /> */}
            <ProfileDropdown />
          </HStack>
        </Flex>
      </Flex>
      <Center minHeight="100%">
        {children}
      </Center>
    </Flex>
  )
}
