const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

// ABIs
const routerAbi = require('../artifacts/contracts/interfaces/IUniswapV2Router02.sol/IUniswapV2Router02.json').abi;

// XDAI STUFF
const router = "0x1C232F01118CB8B424793ae03F870aa7D0ac7f77"
const farm = "0xB44825cF0d8D4dD552f2434056c41582415AaAa1"
const comb = "0x38Fb649Ad3d6BA1113Be5F57B927053E97fC5bF7"
const pair = "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d"

describe("Test Suite", function () {
  let CVault;
  let UniRouter;
  let CombToken;
  let PairToken;
  let LPToken;

    beforeEach(async function () {
      const [owner] = await ethers.getSigners();
      const CVaultFactory = await ethers.getContractFactory("CVault");
      CVault = await CVaultFactory.deploy(
        farm,
        router,
        comb,
        pair
      );
      await CVault.deployed()

      UniRouter = await ethers.getContractAt(routerAbi, router, owner);

    })

  describe("Deployment", async function () {
    it("should deploy contract correctly", async function() {
      expect(await CVault.HoneyFarm()).to.equal(farm);
    })
  })

  describe("Mutations", async function () {

    it("should swapHalfComb()", async function() {

      // get current time
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
      
      // get some comb
      const path = [];
      path[0] = await UniRouter.WETH();
      path[1] = comb;
      await UniRouter.swapExactETHForTokens(0, path, CVault.address, deadline, {value: 1e18.toString()})
    })
  })
});
