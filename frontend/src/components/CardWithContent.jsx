import { Box, Center, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';
import { viewCarbon12Decorator, KEY_TRANSLATIONS } from './ViewCarbon12Decorator'

const CardContent = (props) => <Box {...props} />

const CardLayout = (props) => (
  <Box
    bg={useColorModeValue('white', 'gray.700')}
    rounded={{
      md: 'lg',
    }}
    shadow="base"
    overflow="hidden"
    {...props}
  />
)

const CategoryHeader = (props) => {
  const { heading, ...flexProps } = props
  return (
    <Flex
      direction={{
        base: 'column',
        sm: 'row',
      }}
      px="6"
      py="4"
      justifyContent="center"
      _even={{
        bg: useColorModeValue('gray.50', 'gray.600'),
      }}
      {...flexProps}>
      <Box fontWeight="extrabold" fontSize="3xl" textAlign="center" p={4}>
        {heading}
      </Box>
    </Flex>
  )
}

const Property = (props) => {
  const { label, value, ...flexProps } = props
  return (
    <Flex
      as="dl"
      direction={{
        base: 'column',
        sm: 'row',
      }}
      px="6"
      py="4"
      _even={{
        bg: useColorModeValue('gray.50', 'gray.600'),
      }}
      {...flexProps}>
      <Box as="dt" fontWeight="semibold" minWidth="350px" textAlign="right" pr={4}>
        {label}
      </Box>
      <Box as="dd" flex="1" textAlign="left" pl={4} maxWidth="600px">
        {value}
      </Box>
    </Flex>
  )
}

export const CardWithContent = (props) => {
  const fields = props.fields;
  return (
    <Box
      as="section"
      bg={useColorModeValue('gray.100', 'inherit')}
      py="12"
      px={{
        md: '8',
      }}
    >
      <CardLayout maxWidth="100%" mx="auto">
        <CategoryHeader heading={props.heading}></CategoryHeader>
        <CardContent>
          {
            Object.keys(fields).map((fieldKey, i) => {
              return (
                fields[fieldKey] && (
                  <Property
                    key={i}
                    label={KEY_TRANSLATIONS[fieldKey].toString()}
                    value={fields[fieldKey].toString()} />
                )
              )
            })
          }
        </CardContent>
      </CardLayout>
    </Box>
  )
}

