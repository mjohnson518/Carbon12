import { Box, Button, Center, Image, useBoolean } from '@chakra-ui/react';
import React from 'react';
import ReactCardFlip from 'react-card-flip';

import { CardNFT } from './CardNFT';

export const FlipCard721 = (props) => {
  const [isFlipped, actions] = useBoolean();

  const { tokenId, title, qrCodeImage, ipfsDataString } = props;

  return (
    <Center p={10}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Box>
          { qrCodeImage && <CardNFT
              tokenId={tokenId}
              title={title}
              qrCodeImage={qrCodeImage}
              ipfsDataString={ipfsDataString}
            />
          }
            {/* <NFTE contract="0x3b3ee1931dc30c1957379fac9aba94d1c48a5405" tokenId="467"/> */}
            {/* <Image
              boxShadow="2xl"
              boxSize="lg"
              objectFit="cover"
              src="https://bit.ly/sage-adebayo"
              alt="Segun Adebayo"
            /> */}

            {/* <Center p={2}>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => actions.toggle()}>
                Click to flip
              </Button>
            </Center> */}
        </Box>

        <Box>
          <Image
            boxShadow="2xl"
            boxSize="lg"
            objectFit="cover"
            src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
            alt="Segun Adebayo"
          />
          <Center p={2}>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => actions.toggle()}>
              Click to flip
            </Button>
          </Center>
        </Box>

      </ReactCardFlip>
    </Center>
  )
}
