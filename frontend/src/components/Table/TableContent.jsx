import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  columns,
  getFormData,
  handleTypeFormField,
  getFormByID,
  parseAnswers,
} from './typeform';

import { ethers } from 'ethers';
import Capture12Artifact from '../../contracts/Capture12.json';
import contractAddresses from '../../contracts/contract-address.json';

export const TableContent = props => {
  const forms = getFormData() || [];
  const toast = useToast();
  const formAnswers = forms.map(form => {
    return {
      answers: form.answers,
      id: form.landing_id,
    };
  });

  // const formIDs = forms.map(form => form.landing_id);

  const [qrCodeAddress, setqrCodeAddress] = useState({});
  const [ipfsURI, setIpfsURI] = useState({});
  const [cid, setCID] = useState({});
  const [receipt, setreceipt] = useState({});
  const [mintedNfts, setmintedNfts] = useState([]);
  // const  window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [signer, setSigner] = useState(provider.getSigner(0));

  const [contract, setContract] = useState(() => {
    return new ethers.Contract(
      contractAddresses.Capture12,
      Capture12Artifact.abi,
      signer
    );
  });
  function findMintedNFTById(id) {
    const index = mintedNfts.findIndex(el => el.id === id);
    return mintedNfts[index];
  }

  function uploadToIPFS(questionaire, id) {
    console.log('QUEST ID', mintedNfts);
    // check if questionaire has already been minted

    if (!findMintedNFTById(id)) {
      // manipulate questionaire data
      const answersObj = parseAnswers(questionaire);

      axios
        .post('/upload-to-ipfs', answersObj)
        .then(res => {
          setCID(res.data.cid);
          setqrCodeAddress(res.data.qrCodeAddress);
          setIpfsURI(res.data.ipfsJsonLink);
          return ipfsURI;
        })
        .then(async ipfsJsonLink => {
          const tx = await contract.safeMint(signer.getAddress(), ipfsJsonLink);
          console.log(tx);

          const txMessage = `${tx.hash} transaction is minting your NFT`;
          toast({
            title: 'Minted Carbon12 NFT',
            description: txMessage,
            status: 'success',
            isClosable: true,
          });

          const receipt = await tx.wait();
          console.log(receipt);
          setmintedNfts(arr => [...mintedNfts, { id: id, hash: receipt.to }]);
          const receiptMessage = `minted NFT to ${receipt.to} on transaction ${receipt.transactionHash}`;

          toast({
            title: 'Minted Carbon12 NFT',
            description: receiptMessage,
            status: 'success',
            isClosable: true,
          });
        })
        .catch(err => {
          toast({
            title: 'Error',
            description: `Something went wrong with your upload: ${err.message}`,
            status: 'error',
            isClosable: true,
          });
        });
    } else {
      toast({
        title: 'Error',
        description: `Your NFT has already been minted.
          FormID: ${id}             
          NFT Hash: ${findMintedNFTById(id).hash}`,
        status: 'error',
        isClosable: true,
      });
    }

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
        {formAnswers.map((element, i) => (
          <Tr key={i}>
            {columns.map((column, index) => {
              const item = element.answers.find(col => {
                if (col.field) {
                  return col.field.ref === column.accessor;
                } else {
                  return col.id === column.accessor;
                }
              });
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
                onClick={() => uploadToIPFS(element.answers, element.id)}
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
