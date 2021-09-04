import { Image, Box } from "@chakra-ui/react"
import * as React from 'react'

import logo from "../assets/logo_transparent_solo.png";
import bodyLogo from "../assets/logo_transparent_secondary.png";

export const Logo = (props) => (
  <>
    {
      props.bodyLogo ? (
        <Box width="200px">
          <Image src={bodyLogo} width="100%" alt="Carbon12Logo" />
        </Box>
      ) : (
        <Box width="60px">
          <Image src={logo} mt={2} width="100px" alt="Carbon12Logo" />
        </Box>
      )
    }
  </>
)
