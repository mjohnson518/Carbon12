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

  function findFormWithID(id) {
    const index = formAnswers.findIndex(el => el.id === id);
    return formAnswers[index];
  }

  function handleForm(id) {
    // check if questionaire has already been minted
    if (!findMintedNFTById(id)) {
      // manipulate questionaire data
      const form = findFormWithID(id);
      const answersObj = parseAnswers(form.answers);
      return answersObj;
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
  }

  async function uploadToIPFS(object) {
    try {
      let res = await axios.post('/upload-to-ipfs', object);
      setCID(res.data.cid);
      setIpfsURI(res.data.ipfsJsonLink);
      return res.data.ipfsJsonLink;
    } catch (err) {
      toast({
        title: 'Error',
        description: `Something went wrong with your upload to IPFS: ${err.message}`,
        status: 'error',
        isClosable: true,
      });
    }
    // store questionaire in localstorage
  }

  async function mintNFT(ipfsuri, id) {
    try {
      const tx = await contract.safeMint(signer.getAddress(), ipfsuri);
      //console.log(tx);
      const txMessage = `${tx.hash} transaction is minting your NFT`;
      toast({
        title: 'Minted Carbon12 NFT',
        description: txMessage,
        status: 'success',
        isClosable: true,
      });
      const receipt = await tx.wait();
      //console.log(receipt);
      setmintedNfts(arr => [
        ...mintedNfts,
        { id: id, hash: receipt.to, ipfsURI: ipfsuri },
      ]);
      const receiptMessage = `minted NFT to ${receipt.to} on transaction ${receipt.transactionHash}`;
      toast({
        title: 'Minted Carbon12 NFT',
        description: receiptMessage,
        status: 'success',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: `Something went wrong with your minting: ${err.message}`,
        status: 'error',
        isClosable: true,
      });
    }
  }

  function getQrCode(ipfsUri) {
    return `https://api.qrserver.com/v1/create-qr-code/?data=${ipfsUri}&size=100x100`;
  }

  async function mintNFTButton(id) {
    const { form } = handleForm(id);
    const dataUpload = await uploadToIPFS(form);
    const qrCode = getQrCode(dataUpload);
    let tokenCounter = 0;
    const metadata = {
      id: tokenCounter,
      form_number: id,
      formData_url: dataUpload,
      image: qrCode,
      time_stamp: Date.now(),
    };
    const metaDataUpload = await uploadToIPFS(metadata);
    mintNFT(metaDataUpload, id);
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
                onClick={() => mintNFTButton(element.id)}
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
