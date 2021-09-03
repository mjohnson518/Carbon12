import { Button, useColorModeValue as mode } from '@chakra-ui/react';
import React, { Component } from 'react'
import postscribe from 'postscribe';

export default class TypeformIFrame extends Component {
  render() {
    return (
      <Button
        id="typeformButton"
        size="lg"
        colorScheme="teal"
        variant="solid"
        data-tf-popup="t4Wsz3R9">
        Start Carbon-12 Questionaire
      </Button>
    )
  }

  componentDidMount() {
    postscribe('#typeformButton', `<script src="//embed.typeform.com/next/embed.js"></script>`);
  }
}
