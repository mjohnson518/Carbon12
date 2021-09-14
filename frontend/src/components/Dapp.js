import { useToast, VStack } from '@chakra-ui/react';
import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

import { Table } from '../components/Table';
import { GetProvider } from '../helpers/GetProvider';
import { getNFTData, storeNftData } from '../helpers/nftStorage';
import { ConnectWallet } from './ConnectWallet';
import { Loading } from './Loading';
import { Logo } from './Logo';
import { NoWalletDetected } from './NoWalletDetected';
import TypeFormIFrame from './TypeformIFrame';

// We'll use ethers to interact with the Ethereum network and our contract
// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
// All the logic of this dapp is contained in the Dapp component.
// These other components are just presentational ones: they don't have any
// logic. They just render HTML.
// This is the Hardhat Network id, you might change it in the hardhat.config.js
// Here's a list of network ids https://docs.metamask.io/guide/ethereum-provider.html#properties
// to use when deploying to other networks.
console.log(process.env.REACT_APP_HARDHAT_NETWORK_ID);

const HARDHAT_NETWORK_ID = process.env.REACT_APP_HARDHAT_NETWORK_ID;

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

// This component is in charge of doing these things:
//   1. It connects to the user's wallet
//   2. Initializes ethers and the Token contract
//   3. Renders the whole application
//

export const Dapp = (props) => {
  const toast = useToast();
  const localProvider = new ethers.providers.StaticJsonRpcProvider('http://127.0.0.1:8545/');
  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [ selectedAddress, setSelectedAddress] = useState(null)
  const [ tokenData, setTokenData ] = useState({})
  const [ pollDataInterval, setPollDataInterval ] = useState(null);

  const { contract, signer } = GetProvider();

  contract.on('NFTMinted(uint256,address)', (tid, owner, other) => {
    const transactionHash = other.transactionHash
    const nftDatas = getNFTData();
    const nftData = nftDatas.find((d) => d.transactionHash === transactionHash)
    const tokenId = BigNumber.from(tid).toNumber();

    const newNftData = {
      ...nftData,
      tokenId,
      owner,
      transactionHash
    }

    storeNftData(newNftData)
  })

  // The next two methods just read from the contract and store the results
  // in the component state.
  const getTokenData = async() => {
    const name = await contract.name();
    const symbol = await contract.symbol();

    setTokenData({ ...tokenData, name, symbol })
  }

  const connectWallet = async() => {
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.

    // Once we have the address, we can initialize the application.
    // First we check the network
    if (!checkNetwork()) {
      toast({
        title: 'Error',
        description: 'Please connect Metamask to Localhost:8545',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      })

      return;
    }

    setSelectedAddress(signer.getAddress());
    await window.ethereum.enable()

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on('accountsChanged', ([newAddress]) => {
      stopPollingData();
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state
      if (newAddress === undefined) {
        return resetState();
      }

      setSelectedAddress(newAddress);
    });

    // We reset the dapp state if the network is changed
    window.ethereum.on('networkChanged', ([networkId]) => {
      stopPollingData();
      resetState();
    });
  }

  useEffect(() => {
    try {
      getTokenData();
      stopPollingData();
    } catch (e) {
      console.error(e);
    }
  }, [])

  // The next two methods are needed to start and stop polling data. While
  // the data being polled here is specific to this example, you can use this
  // pattern to read any data from your contracts.
  //
  // Note that if you don't need it to update in near real time, you probably
  // don't need to poll it. If that's the case, you can just fetch it when you
  // initialize the app, as we do with the token data.
  // function startPollingData() {
  //   const pollDataInterval = setInterval(() => updateBalance(), 1000);

  //   setPollDataInterval(pollDataInterval);

  //   // We run it once immediately so we don't have to wait for it
  //   updateBalance();
  // }

  function stopPollingData() {
    clearInterval(pollDataInterval);
    setPollDataInterval(undefined);
  }

  // const updateBalance = async() => {
  //   console.log(`address ${selectedAddress}`)
  //   const balance = await nft721Contract.balanceOf(selectedAddress);
  //   console.log(balance)
  //   setBalance(balance);
  // }

  // This is an utility method that turns an RPC error into a human readable
  // message.
  function getRpcErrorMessage(error) {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }

  // This method resets the state
  function resetState() {
    setSelectedAddress(null)
    setTokenData({})
    setPollDataInterval(null);
  }

  // This method checks if Metamask selected network is Localhost:8545
  function checkNetwork() {
    console.log(`ethereum network version: ${window.ethereum.networkVersion}`);
    console.log(`HARDHAT NETWORK ID: ${HARDHAT_NETWORK_ID}`);

    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    return false;
  }

  // Ethereum wallets inject the window.ethereum object. If it hasn't been
  // injected, we instruct the user to install MetaMask.
  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }

  // The next thing we need to do, is to ask the user to connect their wallet.
  // When the wallet gets connected, we are going to save the users's address
  // in the component's state. So, if it hasn't been saved yet, we have
  // to show the ConnectWallet component.
  //
  // Note that we pass it a callback that is going to be called when the user
  // clicks a button. This callback just calls the _connectWallet method.
  if (!selectedAddress) {
    return (<ConnectWallet connectWallet={() => connectWallet()} />);
  }

  // If the token data or the user's balance hasn't loaded yet, we show
  // a loading component.
  if (!tokenData) {
    return <Loading />;
  }

  // If everything is loaded, we render the application.
  return (
    <VStack>
      <Logo bodyLogo="true" />
      <TypeFormIFrame />
      <Table/>
    </VStack>
  )
}
