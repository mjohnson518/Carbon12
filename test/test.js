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

  let capture12;
  before(async () => {
    const Capture12 = await ethers.getContractFactory("Capture12");
    [owner, addr1, addr2, ...addresses] = await ethers.getSigners();
    capture12 = await Capture12.deploy();
    await capture12.deployed();
  });
  it("should mint an nft to the owner address", async function () {
    const tx = await capture12.safeMint(
      owner.address,
      "ipfs://bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly/"
    );
    const promise = await tx.wait();

    assert(promise.events[0].args.to === owner.address);
  });
  it("should mint an nft to addr1", async function () {
    const tx = await capture12.safeMint(
      addr1.address,
      "ipfs://bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly/"
    );
    const promise = await tx.wait();
    assert(promise.events[0].args.to === addr1.address);
  });
});
