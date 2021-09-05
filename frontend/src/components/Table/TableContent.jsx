import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { columns, data } from './_data'

export const TableContent = () => {
  return (
    <Table my="8" borderWidth="1px" fontSize="sm">
      <Thead bg={mode('gray.50', 'gray.800')}>
        <Tr>
          {columns.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <Tr key={index}>
            {columns.map((column, index) => {
              const cell = row[column.accessor]
              const element = column.Cell?.(cell) ?? cell
              return (
                <Td whiteSpace="nowrap" key={index}>
                  {element}
                </Td>
              )
            })}
            <Td textAlign="right">
              <Button size="sm" colorScheme="teal">
                Mint
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
