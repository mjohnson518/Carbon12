const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const {
  isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Capture12", function () {
  let owner;
  let addr1;
  let addr2;
  let addresses;
  let portfolio;
  const testUri =
    "ipfs://bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly/";
  before(async () => {
    const Portfolio = await ethers.getContractFactory("Portfolio");
    [owner, addr1, addr2, ...addresses] = await ethers.getSigners();
    portfolio = await Portfolio.deploy();
    await portfolio.deployed();
  });

  it("should mint an nft to the owner address", async function () {
    const tx = await portfolio.safeMint(owner.address, testUri);
    const promise = await tx.wait();
    const magicNumber = portfolio.magicNumber();
    console.log(magicNumber);

    assert(promise.events[0].args.to === owner.address);
  });

  it("should mint an nft to addr1", async function () {
    const tx = await portfolio.safeMint(addr1.address, testUri);
    const promise = await tx.wait();
    assert(promise.events[0].args.to === addr1.address);
  });

  it("should return the number nft's owned by an address(addr1)", async function () {
    const tx = await portfolio.balanceOf(addr1.address);
    assert(tx.toNumber() === 1);
  });
});
