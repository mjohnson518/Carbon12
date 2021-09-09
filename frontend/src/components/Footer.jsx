import { Box, Stack, StackDivider, Text } from '@chakra-ui/react'
import * as React from 'react'
import { Copyright } from './Footer/Copyright'
import { LinkGrid } from './Footer/LinkGrid'
import { Logo } from './Logo'
import { SocialMediaLinks } from './Footer/SocialMediaLinks'

export const Footer = (props) => (
  <Box as="footer" role="contentinfo" width="100%" minWidth="100%" p={5} {...props}>
    <Stack spacing="5" divider={<StackDivider />}>
      <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: '10', lg: '28' }}>
        <Box flex="1">
          <Logo />
        </Box>

        <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '10', md: '20' }}>
          <LinkGrid spacing={{ base: '10', md: '20', lg: '28' }} flex="1" />
        </Stack>
      </Stack>

      <Stack
        direction={{ base: 'column-reverse', md: 'row' }}
        justifyContent="space-between"
        alignItems="center">
        <Copyright />
        <SocialMediaLinks />
      </Stack>
    </Stack>
  </Box>
)
