import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';

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
      {...flexProps}
    >
      <Box as="dt" minWidth="275px">
        {label}
      </Box>
      <Box as="dd" flex="1" fontWeight="semibold">
        {value}
      </Box>
    </Flex>
  )
}


export const CardWithContent = (props) => (
  <Box
    as="section"
    bg={useColorModeValue('gray.100', 'inherit')}
    py="12"
    px={{
      md: '8',
    }}
  >
    <CardLayout maxWidth="100%" mx="auto">
      <CardContent>
        {
          props.answers.map((answer, i) => {
            return (<Property key={i} label={answer.field.ref} value={answer[answer.type]} />)
          })
        }
      </CardContent>
    </CardLayout>
  </Box>
)
