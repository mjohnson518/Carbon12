# Carbon 12

This is the final project for the [Chainshot Ethereum Developers Bootcamp](https://www.chainshot.com/bootcamp). This project was created by [Brian Rossetti](https://github.com/brossetti1), [Paul Nelson](https://github.com/Spazzaroth), and [me](https://github.com/mjohnson518).

The aim of the project is to leverage the web3 tech stack to showcase how we can track and trace embodied emissions through industrial supply chains. For additional info, please check out the [Chainshot Forum post here](https://forum.chainshot.com/t/carbon12-final-project/57).

# Setup

1. add the packages with `yarn install`

2. start hardhat with `yarn chain`

3. start react with `yarn start`

4. run `yarn deploy` - this will deploy the contracts to the local chain, you should see them in your hardhat logs.

# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Rinkeby.

In this project, copy the .env.template file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.js
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```


# Resources

- [ERC-998 -- Composable Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-998): An extension of the ERC-721 standard to enable ERC721 tokens to own other ERC721 tokens and ERC20 tokens.

- [ERC-721 Standard Extension](https://github.com/ethereum/EIPs/pull/3551/commits/cc3a2725ad7cdc24f717cfb2c4e72fc48cc03b28): Ernest & Young EIP draft specifying how location metadata should be represented in an ERC-721 token

- [Energy Web DID Registry](https://github.com/energywebfoundation/ew-did-registry): the EW-DID library implementation confirms to the requirements specified in the DID Specification published by the W3C Credential Community Group.

- [Energy Web IAM Client Examples](https://github.com/energywebfoundation/iam-client-examples): repo containing client examples which leverage the iam-client-lib and communicate with a hosted backend to authenticate and authorize a user using DIDs (Decentralized Identifiers) and VCs (Verifiable Credentials)

- [IPFS TalentTree Repo](https://github.com/Dan-Nolan/TalentTreeIPFS): Dan's repo with example code for uploading JSON Objects to IPFS via the `dag` API.
