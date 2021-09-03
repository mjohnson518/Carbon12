import {
  Avatar,
  Box,
  Flex,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  Text,
  useMenuButton,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'

const UserAvatar = () => (
  <Avatar
    size="sm"
    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    name="Manny Brooke"
  />
)

const ProfileMenuButton = (props) => {
  const buttonProps = useMenuButton(props)
  return (
    <Flex
      {...buttonProps}
      as="button"
      flexShrink={0}
      rounded="full"
      outline="0"
      _focus={{
        shadow: 'outline',
      }}
    >
      <Box srOnly>Open user menu</Box>
      <UserAvatar />
    </Flex>
  )
}

export const ProfileDropdown = () => (
  <Menu>
    <ProfileMenuButton />
    <MenuList rounded="md" shadow="lg" py="1" color={mode('gray.600', 'inherit')} fontSize="sm">
      <HStack px="3" py="4">
        <UserAvatar />
        <Box lineHeight="1">
          <Text fontWeight="semibold">Manny Broke</Text>
          <Text mt="1" fontSize="xs" color="gray.500">
            manny@chakra-ui.com
          </Text>
        </Box>
      </HStack>
      <MenuItem fontWeight="medium">Your Profile</MenuItem>
      <MenuItem fontWeight="medium">Feedback & Support</MenuItem>
      <MenuItem fontWeight="medium">Account Settings</MenuItem>
      <MenuItem fontWeight="medium" color={mode('red.500', 'red.300')}>
        Sign out
      </MenuItem>
    </MenuList>
  </Menu>
)
