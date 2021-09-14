import { Spinner } from "@chakra-ui/react";
import React from "react";

export function Loading() {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="teal.500"
      size="xl"
    />
  );
}
