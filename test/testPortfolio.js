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
  let carbon12Portfolio;
  let carbon12;
  const testUri =
    "ipfs://bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly/";
  let tokenCounter = 0;
  let tokensById = [];
  before(async () => {
    const Carbon12Portfolio = await ethers.getContractFactory(
      "Carbon12Portfolio"
    );
    [owner, addr1, addr2, ...addresses] = await ethers.getSigners();
    carbon12Portfolio = await Carbon12Portfolio.deploy();
    await carbon12Portfolio.deployed();

    const Carbon12 = await ethers.getContractFactory("Capture12");
    [owner, addr1, addr2, ...addresses] = await ethers.getSigners();
    carbon12 = await Carbon12.deploy();
    await carbon12.deployed();
  });

  it("should mint a parentNFT and a childNFT to the owner address", async function () {
    //mint parent
    const txp = await carbon12Portfolio
      .mintParent(owner.address, testUri)
      .catch((err) => console.log("PARENT MINT ERROR", err));

    //mint child
    const txc = await carbon12Portfolio
      .mintChild(tokenCounter, testUri)
      .catch((err) => console.log("CHILD MINT ERROR", err));
    const parentId = tokenCounter;
    tokensById.push({ parent0: parentId });
    const promiseP = await txp.wait().then((res) => tokenCounter++);
    const childId = tokenCounter;
    tokensById.push({ child0: childId });
    const promiseC = await txc.wait().then((res) => tokenCounter++);

    const parentOwner = await carbon12Portfolio.ownerOf(parentId);
    const childOwner = await carbon12Portfolio.ownerOf(childId);
    console.log(
      "PARENT OWNER",
      parentOwner,
      "CHILD OWNER",
      childOwner,
      parentId,
      childId
    );
    //promiseP.events[0].args.to;
    assert((parentOwner && childOwner) === owner.address);
  });

  it("should mint a child and parent nft to addr1", async function () {
    //store parentCounter
    const parentId = tokenCounter;
    tokensById.push({ parent1: parentId });
    //mint parent
    const txp = await carbon12Portfolio
      .mintParent(addr1.address, testUri)
      .catch((err) => console.log("PARENT MINT ERROR", err));

    //mint child
    const txc = await carbon12Portfolio
      .mintChild(parentId, testUri)
      .catch((err) => console.log("CHILD MINT ERROR", err));

    const promiseP = await txp.wait().then((res) => tokenCounter++);
    const childId = tokenCounter;
    tokensById.push({ child1: childId });
    const promiseC = await txc.wait().then((res) => tokenCounter++);

    const parentOwner = await carbon12Portfolio.ownerOf(parentId);
    const childOwner = await carbon12Portfolio.ownerOf(childId);
    console.log(
      "PARENT OWNER",
      parentOwner,
      "CHILD OWNER",
      childOwner,
      parentId,
      childId
    );
    //promiseP.events[0].args.to;
    assert((parentOwner && childOwner) === addr1.address);
  });

  it("should return the number nft's owned by an address(owner)", async function () {
    const tx = await carbon12Portfolio.balanceOf(owner.address);

    assert(tx.toNumber() === 2, "address holds incorrect number of tokens");
  });

  it("should return the number nft's owned by an address(addr1)", async function () {
    const tx = await carbon12Portfolio.balanceOf(addr1.address);

    assert(tx.toNumber() === 2, "address holds incorrect number of tokens");
  });

  it("should transfer childtoken 0 from owner to parent nft(parent 1) owned by address 1", async function () {
    //approve(current owner address, token to be transfered)
    const approve = await carbon12Portfolio
      .approve(owner.address, 1)
      .catch((err) => console.log("approval error", err));
    //safeTransferFrom(current Owner wallet Address, address of contract that minted ChildNFT, tokenid of ChildNFT, tokenId of ParentNFT)
    const tx = await carbon12Portfolio[
      `safeTransferFrom(address,address,uint256,bytes)`
    ](owner.address, carbon12Portfolio.address, 1, 2).catch((err) =>
      console.log("add child error", err)
    );

    const promise = await tx.wait();
    const ownerOf1 = await carbon12Portfolio.rootOwnerOf(1);
    const ownerof2 = await carbon12Portfolio.ownerOf(2);
    console.log("ownerOf1", ownerOf1, "ownerof2", ownerof2);
    assert(ownerOf1 === ownerof2, "token not transfered");
  });

  it("owner should only own 1 nft", async function () {
    const tx = await carbon12Portfolio
      .balanceOf(owner.address)
      .catch((err) => console.log(err));
    assert(tx.toNumber() === 2);
  });

  // it("should NOT transfer ownership of childNFT from owner to the ownerNFT", async function () {
  //   const tx = await carbon12Portfolio[
  //     `safeTransferFrom(address,address,uint256,bytes)`
  //   ](owner.address, carbon12Portfolio.address, 1, 0).catch((err) =>
  //     console.log(err)
  //   );
  //   const promise = await tx.wait();
  //   console.log(promise.events[0]);
  //   assert(0 === 0);
  // });
});
