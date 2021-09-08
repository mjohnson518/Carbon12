import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import axios from 'axios';
import { create } from 'ipfs-http-client';
import * as React from 'react';
import { useState } from 'react';

import {
  columns,
  getFormData,
  handleTypeFormField,
  getFormByID,
  parseAnswers,
} from './typeform';

export const TableContent = props => {
  const forms = getFormData() || [];
  const formAnswers = forms.map(form => form.answers);

  const [ipfsURI, setIpfsURI] = useState({})

  function uploadToIPFS(questionaire) {
    // manipulate questionaire data
    const answersObj = parseAnswers(questionaire);

    // check if questionaire has already been minted
    // create ipfs link
    const ipfsData = JSON.stringify({
      path: '/',
      content: answersObj,
      mode: 'string',
      mtime: Date.now(),
    });
    debugger
    axios
      .post('/upload-to-ipfs', ipfsData)
      .then(res => {
        // setIpfsURI(res.data);
        console.log(res);
        // return ipfsURI;
      })
      .catch(err => {
        console.error(err);
      });

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
        {formAnswers.map((answers, i) => (
          <Tr key={i}>
            {columns.map((column, index) => {
              const item = answers.find(
                col => col.field.ref === column.accessor
              );
              const cell = item ? handleTypeFormField(item) : 'N/A';

              return (
                <Td whiteSpace="nowrap" key={index}>
                  {cell}
                </Td>
              );
            })}
            <Td textAlign="right">
              <Button
                size="sm"
                colorScheme="teal"
                onClick={() => uploadToIPFS(answers)}
              >
                Mint
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
