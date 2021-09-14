import { useBoolean } from '@chakra-ui/hooks';
import { ethers } from 'ethers';
import { useCallback, useEffect } from 'react';
import Capture12Artifact from '../contracts/Capture12.json';
import contractAddresses from '../contracts/contract-address.json';

export const GetProvider = (contractName) => {
  let contract;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(0);

  switch (contractName) {
    case 'Capture12':
      contract = new ethers.Contract(
        contractAddresses.Capture12,
        Capture12Artifact.abi,
        signer
      );
      break;
    default:
      contract = new ethers.Contract(
        contractAddresses.Capture12,
        Capture12Artifact.abi,
        signer
      );
      break;
  }

  return {
    provider,
    contract,
    signer,
  }
}
