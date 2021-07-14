// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

// XDAI STUFF
const router = "0x1C232F01118CB8B424793ae03F870aa7D0ac7f77"
const farm = "0xB44825cF0d8D4dD552f2434056c41582415AaAa1"
const comb = "0x38Fb649Ad3d6BA1113Be5F57B927053E97fC5bF7"
const pair = "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d"

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const CVault = await hre.ethers.getContractFactory("CVault");
  const cVault = await CVault.deploy(
    farm,
    router,
    comb,
    pair
  );

  await cVault.deployed();

  console.log("CVault deployed to:", cVault.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
