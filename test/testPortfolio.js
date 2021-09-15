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
    const txp = await carbon12Portfolio.mintParent(owner.address, testUri);
    const txc = await carbon12Portfolio.mintChild(owner.address, testUri);

    const promiseP = await txp.wait();
    const promiseC = await txc.wait();
    // console.log(
    //   "parent",
    //   promiseP.events[0],
    //   "child",
    //   promiseC.events[0],
    //   rootOwner
    // );
    assert(
      (promiseP.events[0].args.to && promiseC.events[0].args.to) ===
        owner.address
    );
  });

  it("should return the number nft's owned by an address(owner)", async function () {
    const tx = await carbon12Portfolio.balanceOf(owner.address);

    assert(tx.toNumber() === 2);
  });

  it("should transfer ownership of childNFT from owner to the ownerNFT", async function () {
    const tx = await carbon12Portfolio[
      `safeTransferFrom(address,address,uint256,bytes)`
    ](owner.address, carbon12Portfolio.address, 1, 0).catch((err) =>
      console.log(err)
    );
    const promise = await tx.wait();
    console.log(promise.events[0]);
    assert(0 === 0);
  });
});
