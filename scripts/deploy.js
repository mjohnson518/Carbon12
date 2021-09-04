// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const path = require("path");

async function main() {
  // This is just a convenience check
  if (hre.network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // ethers is avaialble in the global scope
  const [deployer] = await hre.ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // deploy token for now.
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();

  console.log("Token address:", token.address);

  // We get the contract to deploy
  const C12NFT = await hre.ethers.getContractFactory("C12NFT");
  const c12nft = await C12NFT.deploy();

  await c12nft.deployed();

  console.log("C12NFT deployed to:", c12nft.address);
  console.log("C12NFT deployed to:", c12nft.address);

  await hre.storageLayout.export();

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(c12nft, token);
}

function saveFrontendFiles(c12nft, token) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "/../frontend/src/contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const addresses = {
    C12NFT: c12nft.address,
    Token: token.address,
  };

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify(addresses, undefined, 2)
  );

  const C12NFTArtifact = hre.artifacts.readArtifactSync("C12NFT");
  const TokenArtifact = hre.artifacts.readArtifactSync("Token");

  fs.writeFileSync(
    contractsDir + "/C12NFT.json",
    JSON.stringify(C12NFTArtifact, null, 2)
  );

  fs.writeFileSync(
    contractsDir + "/Token.json",
    JSON.stringify(TokenArtifact, null, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
