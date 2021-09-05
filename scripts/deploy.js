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
  const Capture12 = await hre.ethers.getContractFactory("Capture12");
  const capture12NFT = await Capture12.deploy();

  await capture12NFT.deployed();

  console.log("Capture12 deployed to:", capture12NFT.address);
  console.log("Capture12 deployed to:", capture12NFT.address);

  await hre.storageLayout.export();

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(capture12NFT, token);
}

function saveFrontendFiles(capture12NFT, token) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "/../frontend/src/contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  const addresses = {
    Capture12: capture12NFT.address,
    Token: token.address,
  };

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify(addresses, undefined, 2)
  );

  const Capture12Artifact = hre.artifacts.readArtifactSync("Capture12");
  const TokenArtifact = hre.artifacts.readArtifactSync("Token");

  fs.writeFileSync(
    contractsDir + "/Capture12.json",
    JSON.stringify(Capture12Artifact, null, 2)
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
