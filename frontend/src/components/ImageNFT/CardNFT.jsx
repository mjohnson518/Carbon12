import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  StackDivider,
  Text,
  useBoolean,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';

import { GetProvider } from '../../helpers/getProvider';
import { Loading } from '../Loading';

const Description = (props) => {
  const { title, location, children } = props

  return (
    <Box position="relative">
      <Box fontWeight="bold" maxW="xl" color="teal">
        {title}
      </Box>
      <HStack fontSize="sm" fontWeight="medium" color={mode('gray.500', 'white')} mt="1">
        <Box as={HiLocationMarker} fontSize="md" color="teal" />
        <Box color="black">{location}</Box>
      </HStack>
      <Box mt="3" maxW="xl" color={mode('gray.600', 'gray.700')}>
        {children}
      </Box>
      <HStack
        position={{
          sm: 'absolute',
        }}
        top={{
          sm: '0',
        }}
        insetEnd={{
          sm: '0',
        }}
        mt={{
          base: '4',
          sm: '0',
        }}
      >
        {/* insert something */}
      </HStack>
    </Box>
  )
}


export const CardNFT = (props) => {
  const {
    tokenId,
    title,
    qrCodeImage,
    ipfsDataString
  } = props

  const [data, setData] = useState({tokenId, qrCodeImage, ipfsData: JSON.parse(ipfsDataString)})
  const { contract, signer, provider } = GetProvider();


  const [ tokenURI, setTokenURI ] = useState('')
  const [ ownerAddress, setOwnerAddress ] = useState('')
  const [ shortAddr, setShortAddr ] = useState('')
  const [ shortContractAddr, setShortContractAddr ] = useState('')

  const [loading, loadingActions] = useBoolean(true);

  const TokenHeading = `Token ID - ${tokenId}`

  console.log(data)

  useEffect(() => {
    (async () => {
      try {
        const tokenURI = await contract.tokenURI(tokenId);
        const ownerAddress = await contract.ownerOf(tokenId)

        const shortAddr = `${ownerAddress.substring(0, 6)}...${ownerAddress.slice(-9)}`
        const shortContractAddr = `${contract.address.substring(0, 6)}...${contract.address.slice(-9)}`

        setTokenURI(tokenURI)
        setOwnerAddress(ownerAddress)
        setShortAddr(shortAddr)
        setShortContractAddr(shortContractAddr)

        loadingActions.off()
      } catch (e) {
          console.error(e);
      }
    })()
  }, [contract, tokenId])

  if (loading) {
    <Center mb="50px">
      Loading...
      <Loading />
    </Center>
  }

  return (
    <Box as="section" py="12" bg={mode('gray.100', 'gray.800')}>
      <Box
        maxW={{
          base: 'xl',
          md: '7xl',
        }}
        mx="auto"
        px={{
          md: '8',
        }}
      >
        <Box
          rounded={{
            lg: 'lg',
          }}
          bg={mode('white', 'gray.300')}
          maxW="3xl"
          mx="auto"
          shadow="base"
          overflow="hidden"
        >
          <Flex align="center" justify="space-between" px="6" py="4">
            <Stack spacing={6}>
              <Text as="sub" fontSize="24px" display="flex" color="teal" fontWeight="bolder">
                { data.ipfsData?.companyName }
              </Text>
              <Text fontWeight="bold" as="sub" fontSize="18px" display="flex">
                { data.ipfsData.productName }
              </Text>
            </Stack>
            <Link href={tokenURI} _hover={undefined} isExternal fontSize="sm" minW="20">
              <Button variant="outline" colorScheme="teal">
                View Data
              </Button>
            </Link>
          </Flex>
          <Divider />
          <Stack spacing="6" py="5" px="8" divider={<StackDivider />}>
            <Center>
              <Image
                boxShadow="2xl"
                boxSize="lg"
                objectFit="cover"
                src={data?.qrCodeImage}
                alt="qr-code-for-metadata"
              />
            </Center>

            <Description title={TokenHeading} location={data?.ipfsData?.geographyOfData}>
              <Flex spacing={2} justifyContent="space-between">
                <Box>
                  <Box><Heading color="teal" fontSize="18px" display="flex">Owner</Heading></Box>
                  <Text fontSize="16px">{shortAddr}</Text>
                </Box>
                <Box>
                  <Heading color="teal" fontSize="18px">Contract Address</Heading>
                  <Text fontSize="16px">{shortContractAddr}</Text>
                </Box>
                <Box>
                  <Heading color="teal" fontSize="18px">Product Code</Heading>
                  <Text display="flex" justifyContent="flex-end" fontSize="16px">{data.ipfsData.uniqueProductCode}</Text>
                </Box>
              </Flex>
            </Description>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
