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
  const testUri =
    "ipfs://bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly/";
  before(async () => {
    const Capture12 = await ethers.getContractFactory("Capture12");
    [owner, addr1, addr2, ...addresses] = await ethers.getSigners();
    capture12 = await Capture12.deploy();
    await capture12.deployed();
  });

  it("should mint an nft to the owner address", async function () {
    const tx = await capture12.safeMint(owner.address, testUri);
    const promise = await tx.wait();

    assert(promise.events[0].args.to === owner.address);
  });

  it("should mint an nft to addr1", async function () {
    const tx = await capture12.safeMint(addr1.address, testUri);
    const promise = await tx.wait();
    assert(promise.events[0].args.to === addr1.address);
  });

  it("should return the number nft's owned by an address(addr1)", async function () {
    const tx = await capture12.balanceOf(addr1.address);
    assert(tx.toNumber() === 1);
  });

  it("should return owner of nft by tokenID (token 0)", async function () {
    const tx = await capture12.ownerOf(0);
    assert(tx === owner.address);
  });

  it("should transfer token 0 from owner to address 1", async function () {
    const tx = await capture12.transferFrom(owner.address, addr1.address, 0);
    const promise = await tx.wait();
    const ownerOf = await capture12.ownerOf(0);
    assert(
      promise.events[1].args.to === addr1.address && ownerOf === addr1.address
    );
  });

  it("should NOT transter token 0 back to owner when called by owner", async function () {
    const tx = await capture12
      .transferFrom(addr1.address, owner.address, 0)
      .catch((err) => console.log("transaction reverted"));
    const ownerOf = await capture12.ownerOf(0);
    assert(ownerOf === addr1.address);
  });

  it("should transfer token 0 to owner when connected to addr1", async function () {
    const tx = await capture12
      .connect(addr1)
      .transferFrom(addr1.address, owner.address, 0);
    const ownerOf = await capture12.ownerOf(0);
    assert(ownerOf === owner.address);
  });

  it("should pause token transfer and minting", async function () {
    const tx = await capture12.pause();
    const transfer = await capture12
      .transferFrom(owner.address, addr1.address, 0)
      .catch((err) => console.log("transfer reverted"));
    const mint = capture12
      .safeMint(addr1.address, testUri)
      .catch((err) => console.log("minting reverted"));
    const balance = await capture12.balanceOf(addr1.address);

    assert(balance.toNumber() === 1);
  });

  it("should unpause the contract for transfers and minting", async function () {
    const tx = await capture12.unpause();
    const transfer = await capture12
      .transferFrom(owner.address, addr1.address, 0)
      .catch((err) => console.log("transfer reverted"));
    const mint = capture12
      .safeMint(addr1.address, testUri)
      .catch((err) => console.log("minting reverted"));
    const balance = await capture12.balanceOf(addr1.address);
    assert(balance.toNumber() === 3);
  });
});
