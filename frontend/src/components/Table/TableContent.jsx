import {
  Button,
  ButtonGroup,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { GetProvider } from '../../helpers/GetProvider';
import { getNFTData, storeNftData } from '../../helpers/nftStorage';
import { CardWithContent } from '../CardWithContent';
import { FlipCard721 } from '../ImageNFT/FlipCard721';
import { columns, getFormData, handleTypeFormField, parseAnswers } from './typeform';


let tokenCounter = 0;

export const TableContent = _ => {
  const formsData = getFormData() || [];
  const toast = useToast();
  const forms = formsData.map(form => {
    return {
      answers: form.answers,
      id: form.landing_id,
    };
  });

  const { contract, signer, provider } = GetProvider("Carbon12")

  const nftDatas = getNFTData();

  const [disable, setDisable] = useState(false);
  const [ipfsURI, setIpfsURI] = useState({});
  const [cid, setCID] = useState({});
  const [receipts, setReceipts] = useState([]);
  const [mintedNfts, setmintedNfts] = useState([]);

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalContentDisplay, setModalContentDisplay] = useState([]);

  function mintIsDisabled(form) {
    return nftDatas.find((nft) => nft.id === form.id)
  }

  function viewIsDisabled(form) {
    return !nftDatas.some((nft) => nft.id === form.id)
  }

  function setModalandOpen(item) {
    const companyAttribute = item.find(i => i.field.ref === 'companyName');
    const productAttribute = item.find(i => i.field.ref === 'productName');
    setModalTitle(companyAttribute[companyAttribute.type]);
    setModalDescription(productAttribute[productAttribute.type]);
    setModalContentDisplay(item);
    onOpen();
  }

  function findMintedNFTById(id) {
    const index = mintedNfts.findIndex(el => el.id === id);
    return mintedNfts[index];
  }

  function findFormWithID(id) {
    const index = forms.findIndex(el => el.id === id);
    return forms[index];
  }

  const callToast = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      isClosable: true,
    });
  };

  function handleForm(id) {
    const form = findFormWithID(id);
    const answersObj = parseAnswers(form.answers);
    return answersObj;
  }

  function checkForm(id) {
    if (!findMintedNFTById(id)) {
      return handleForm(id);
    } else {
      const description = `Your NFT has already been minted. FormID: ${id} NFT Hash: ${
        findMintedNFTById(id).hash
      }`;
      callToast('Error', description, 'error');

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
      callToast(
        'Error',
        `Something went wrong with your upload to IPFS: ${err.message}`,
        'error'
      );
    }
  }

  async function mintNFT(ipfsuri, id) {
    try {
      const tx = await contract.safeMint(signer.getAddress(), ipfsuri)

      const txMessage = `${tx.hash} transaction is minting your NFT`;
      callToast('Minted Carbon12 NFT', txMessage, 'success');

      const receipt = await tx.wait();
      setReceipts([...receipts, receipt]);

      setmintedNfts([
        ...mintedNfts,
        { id: id, hash: receipt.to, ipfsURI: ipfsuri },
      ]);

      const receiptMessage = `minted NFT to ${receipt.to} on transaction ${receipt.transactionHash}`;
      callToast('Minted Carbon12 NFT', receiptMessage, 'success');

      storeNftData({id: id, to: receipt.from, metadataUri: ipfsuri, transactionHash: receipt.transactionHash})

    } catch (err) {
      callToast(
        'Error',
        `Something went wrong with your minting: ${err.message}`,
        'error'
      );
    }
  }


  function getQrCode(ipfsUri) {
    return `https://api.qrserver.com/v1/create-qr-code/?data=${ipfsUri}`;

  }

  async function mintNFTButton(id) {
    setDisable(true);
    try {
      const form = checkForm(id);
      if (form) {
        const formUpload = await uploadToIPFS(form);
        const qrCode = getQrCode(formUpload);

        const metadata = {
          id: tokenCounter,
          form_number: id,
          formData_url: formUpload,
          image: qrCode,
          time_stamp: Date.now(),
        };

        const metaDataUpload = await uploadToIPFS(metadata);
        await mintNFT(metaDataUpload, id).then(() => setDisable(false))

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
          {forms.map((form, i) => (
            <Tr key={i} spacing={5}>
              {columns.map((column, index) => {
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
              })}
              <Td textAlign="right">
                <ButtonGroup spacing="3">
                  {
                    mintIsDisabled(form) || disable ?
                      <Button size="sm" colorScheme="teal" isDisabled>Mint</Button> :
                      <Button
                        size="sm"
                        colorScheme="teal"
                        onClick={() => mintNFTButton(form.id)}>
                        Mint
                      </Button>
                  }
                  {
                    viewIsDisabled(form) ?
                      <Button size="sm" colorScheme="teal" isDisabled>Mint</Button> :
                      <RouterLink to={`/carbon12/${form.id}`}>
                        <Button
                          size="sm"
                          colorScheme="teal"
                          variant="outline">
                          View
                        </Button>
                      </RouterLink>
                  }
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth="1000px">
          <FlipCard721 />
          <ModalHeader>
            {modalTitle}
            <Heading size="xs">Product - {modalDescription}</Heading>
          </ModalHeader>

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
