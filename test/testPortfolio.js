const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const {
  isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Carbon12Portfolio", function () {
  let owner;
  let addr1;
  let addr2;
  let addresses;
  let Carbon12Portfolio;
  const testUri =
    "ipfs://bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly/";
  before(async () => {
    const Carbon12Portfolio = await ethers.getContractFactory("Portfolio");
    [owner, addr1, addr2, ...addresses] = await ethers.getSigners();
    carbon12Portfolio = await Carbon12Portfolio.deploy();
    await carbon12Portfolio.deployed();
  });

  it("should mint an nft to the owner address", async function () {
    const tx = await carbon12Portfolio.safeMint(owner.address, testUri);
    const promise = await tx.wait();

    assert(promise.events[0].args.to === owner.address);
  });

  it("should mint an nft to addr1", async function () {
    const tx = await carbon12Portfolio.safeMint(addr1.address, testUri);
    const promise = await tx.wait();
    assert(promise.events[0].args.to === addr1.address);
  });

  it("should return the number nft's owned by an address(addr1)", async function () {
    const tx = await carbon12Portfolio.balanceOf(addr1.address);
    assert(tx.toNumber() === 1);
  });
});
