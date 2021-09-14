import { useBoolean } from '@chakra-ui/hooks';
import { Box, Center, SimpleGrid } from '@chakra-ui/layout';
import { Button, Heading } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { GetProvider } from '../helpers/GetProvider';
import { getNFTData } from '../helpers/nftStorage';
import { CardWithContent } from './CardWithContent';
import { FlipCard721 } from './ImageNFT/FlipCard721';
import { Loading } from './Loading';
import { getFormData } from './Table/typeform';
import { viewCarbon12Decorator } from './ViewCarbon12Decorator';

export default function ViewCarbon12() {
  let { id } = useParams();
  const { signer, contract } = GetProvider('Cabon12')
  const formData = getFormData()
  const form = formData.find((f) => f.id === id)

  const nftData = getNFTData().find((nft) => nft.id === id);
  const tokenId = nftData.tokenId
  const [loading, loadingActions] = useBoolean(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentDisplay, setContentDisplay] = useState([]);
  const [qrCodeImage, setQrCodeImage] = useState([]);

  function setData(data) {
    setQrCodeImage(data.imageLink)
    setTitle(data.answers?.companyName);
    setDescription(data.answers?.productName);
    setContentDisplay(data.answers);
  }

  const getIpfsData = (async() => {
    return await contract.tokenURI(tokenId).then(async(uri) => {
      return await axios.get(uri).then(async(resp1) =>{
        const dataUrl = resp1.data.content.formData_url

        return await axios.get(dataUrl).then(async(resp2) => {
          return {
            imageLink: resp1.data.content.image,
            answers: resp2.data.content,
            uri: uri,
            ipfsDataLink: resp1.data.formData_url
          }
        });
      })
    })
  })

  useEffect(() => {
    getIpfsData().then(async (data) => {
      await setData(data)

      loadingActions.off();
    });
  }, [])

  if (loading && Object.keys(contentDisplay).length === 0) {
    return (
      <Box minHeight="800px">
        <Center>
          <Loading/>
        </Center>
      </Box>
    )
  }

  const {
    generalFields,
    boundaryFields,
    dataCollectionFields,
    allocationFields
  } = viewCarbon12Decorator(contentDisplay);

  const BackButton = () => {
    return (
      <RouterLink to={`/`}>
        <Button
          size="lg"
          m={4}
          colorScheme="red"
          variant="outline">
          Back
        </Button>
      </RouterLink>
    )
  }

  return (
    <>
      <FlipCard721 />
      <BackButton/>
      <Heading as="h1">{title}</Heading>
      <Heading size="xs">Product - {description}</Heading>
      <SimpleGrid columns={2} spacing={10}>
        <Box height="100%">
          { boundaryFields && <CardWithContent fields={boundaryFields} heading="Boundary"/> }
        </Box>
        <Box height="100%">
          { allocationFields && <CardWithContent fields={allocationFields} heading="Allocation"/> }
        </Box>
        <Box height="100%">
          { generalFields && <CardWithContent fields={generalFields} heading="General"/> }
        </Box>
        <Box height="100%">
          { dataCollectionFields && <CardWithContent fields={dataCollectionFields} heading="Data Collection"/> }
        </Box>
      </SimpleGrid>
    </>
  )
}

