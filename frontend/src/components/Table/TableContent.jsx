import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  ButtonGroup,
  HStack,
  Center,
  Image,
  useBoolean,
  Box,
} from '@chakra-ui/react';
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';

import { NFTE } from '@nfte/react';

import ReactCardFlip from 'react-card-flip';

import {
  columns,
  getFormData,
  handleTypeFormField,
  parseAnswers,
} from './typeform';

import { ethers } from 'ethers';
import Capture12Artifact from '../../contracts/Capture12.json';
import contractAddresses from '../../contracts/contract-address.json';
import { CardWithContent } from '../CardWithContent';

let tokenCounter = 0;
export const TableContent = (props) => {
  const formsData = getFormData() || [];
  const toast = useToast();
  const forms = formsData.map(form => {
    return {
      answers: form.answers,
      id: form.landing_id,
    };
  });


  const [disable, setDisable] = useState(false);
  const [ipfsURI, setIpfsURI] = useState({});
  const [cid, setCID] = useState({});
  const [receipt, setreceipt] = useState({});
  const [mintedNfts, setmintedNfts] = useState([]);
  // const  window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [ signer, setSigner ] = useState(provider.getSigner(0));
  const [contract, setContract] = useState(() => {
    return new ethers.Contract(
      contractAddresses.Capture12,
      Capture12Artifact.abi,
      signer
    );
  });

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ modalTitle, setModalTitle ] = useState('')
  const [ modalDescription, setModalDescription] = useState('')
  const [ modalContentDisplay, setModalContentDisplay ] = useState([])
  const [isFlipped, actions] = useBoolean();

  function setModalandOpen(item) {
    const companyAttribute = item.find((i) => i.field.ref === 'companyName')
    const productAttribute = item.find((i) => i.field.ref === 'productName')
    setModalTitle(companyAttribute[companyAttribute.type])
    setModalDescription(productAttribute[productAttribute.type])
    setModalContentDisplay(item)
    onOpen()
  }

  function findMintedNFTById(id) {
    const index = mintedNfts.findIndex(el => el.id === id);
    return mintedNfts[index];
  }

  function findFormWithID(id) {
    const index = forms.findIndex(el => el.id === id);
    return forms[index];
  }

  function handleForm(id) {
    // check if questionaire has already been minted
    if (!findMintedNFTById(id)) {
      const form = findFormWithID(id);
      // manipulate questionaire data
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
      return false;
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
      console.log('id', id, 'hash', receipt.to, 'metadata uri', ipfsuri);
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
    setDisable(true);
    try {
      const form = handleForm(id);
      if (form) {
        const dataUpload = await uploadToIPFS(form);
        const qrCode = getQrCode(dataUpload);

        const metadata = {
          id: tokenCounter,
          form_number: id,
          formData_url: dataUpload,
          image: qrCode,
          time_stamp: Date.now(),
        };

        const metaDataUpload = await uploadToIPFS(metadata);
        mintNFT(metaDataUpload, id).then(response => {
          setDisable(false);
        });
        tokenCounter += 1;
      } else {
        setDisable(false);
      }
    } catch (err) {
      console.log(err);
      setDisable(false);
    }
  }
  return (
    <>
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
          {
            forms.map((form, i) => (
              <Tr key={i} spacing={5}>
                {
                  columns.map((column, index) => {
                    const item = form.answers.find(col => {
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
                  })
                }
                <Td textAlign="right">
                  <ButtonGroup spacing="3">
                    <Button
                      size="sm"
                      colorScheme="teal"
                      onClick={() => mintNFTButton(form.id)}
                    >
                      Mint
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => setModalandOpen(form.answers)}>
                      View
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth="1000px">
          <ModalHeader>
            {modalTitle}
            <Heading size="xs">
              Product - {modalDescription}
            </Heading>
          </ModalHeader>
          <Center p={10}>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
              <Box>
                <NFTE contract="0x3b3ee1931dc30c1957379fac9aba94d1c48a5405" tokenId="467"/>
                {/* <Image
                  boxShadow="2xl"
                  boxSize="lg"
                  objectFit="cover"
                  src="https://bit.ly/sage-adebayo"
                  alt="Segun Adebayo"
                /> */}

                <Button onClick={() => actions.toggle()}>Click to flip</Button>
              </Box>

              <Box>
                <Image
                  boxShadow="2xl"
                  boxSize="lg"
                  objectFit="cover"
                  src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
                  alt="Segun Adebayo"
                />
                <Button onClick={() => actions.toggle()}>Click to flip</Button>
              </Box>

            </ReactCardFlip>
          </Center>
          <ModalCloseButton />
          <ModalBody minWidth="600px">
            <CardWithContent answers={modalContentDisplay} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
