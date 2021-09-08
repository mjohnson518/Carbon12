import { Button, Flex, HStack, useColorModeValue as mode, useToast, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import * as React from 'react';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Footer } from './Footer';
import { MobileHamburgerMenu } from './Header/MobileHamburgerMenu';
import { NavMenu } from './Header/NavMenu';
import { ProfileDropdown } from './Header/ProfileDropdown';
import { useMobileMenuState } from './hooks/useMobileMenuState';
import { Logo } from './Logo';

const STATUSES = ["success", "error", "warning", "info"]

export const Layout = ({children}) => {
  const { isMenuOpen, toggle } = useMobileMenuState()
  const toast = useToast()

  return (
    <Flex direction="column" bg={mode('gray.100', 'gray.800')} minHeight="100vh">
      <Flex align="center" bg={mode('white', 'gray.700')} color="white" px="6" minH="15">
        <Flex justify="space-between" align="center" w="full">
          <MobileHamburgerMenu onClick={toggle} isOpen={isMenuOpen} />
          <NavMenu.Mobile isOpen={isMenuOpen} />

          {/* Desktop Logo placement */}
          <Logo display={{ base: 'none', lg: 'block' }} flexShrink={0} h="5" marginEnd="10" />

          {/* Desktop Navigation Menu */}
          <NavMenu.Desktop />

          {/* Mobile Logo placement */}
          {/* <Logo flex={{ base: '1', lg: '0' }} display={{ lg: 'none' }} flexShrink={0} h="5" /> */}
          {/* FOR DEMO PURPOSES RIGHT NOW - HOW TO TOAST */}
          {/* <Wrap m={5}>
            {STATUSES.map((status, i) => (
              <WrapItem key={i}>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() =>
                    toast({
                      title: `${status} toast`,
                      status: status,
                      isClosable: true,
                    })
                  }
                >
                  Show {status} toast
                </Button>
              </WrapItem>
            ))}
          </Wrap> */}

          <HStack spacing="3" flex-direction="row-reverse">
            <ColorModeSwitcher justifySelf="flex-end" color={mode('gray.500', 'gray.500')} />
            {/* <Notification display={{ base: 'none', lg: 'inline-flex' }} /> */}
            <ProfileDropdown />
          </HStack>
        </Flex>
      </Flex>

      <VStack height="100%" minHeight="700px">
        {children}
        <Footer/>
      </VStack>
    </Flex>
  )
}
