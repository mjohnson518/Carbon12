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
import { columns } from './_data'

import flatten from 'lodash/flatten'

import  { create } from "ipfs-http-client";

import { getFormData } from "../hooks/useTypeForm"
import { handleTypeFormField } from './typeform'

export const TableContent = (props) => {
  const client = create();
  const forms = getFormData() || [];
  const formAnswers = forms.map((form) => form.answers);

  const tableRows = formAnswers.map((answers, index) => (
    <Tr key={index}>
      {columns.map((column, index) => {
        const item = answers.find((col) => col.field.ref === column.accessor);
        const cell = item ? handleTypeFormField(item) : 'N/A';
        {/* const element = column.Cell?.(cell) ?? cell */}
        return (
          <Td whiteSpace="nowrap" key={index}>
            {cell}
          </Td>
        )
      })}
      <Td textAlign="right">
        <Button size="sm" colorScheme="teal" onClick={ async () => uploadToIPFS(answers) }>
          Mint
        </Button>
      </Td>
    </Tr>
  ))

  async function uploadToIPFS(questionaire) {
    // manipulate questionaire data

    // check if questionaire has already been minted

    // create ipfs link
    const carbonForm = await client.dag.put(questionaire);

    // manipulate data post questionaire upload to ipfs

    // store questionaire in localstorage

  }

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
        { tableRows }
      </Tbody>
    </Table>
  )
}
