const hre = require("hardhat");
const {ethers} = require("ethers");

async function main() {

  const Mathematics = await hre.ethers.getContractFactory("Mathematics");
  const mathematics = await Mathematics.deploy();
  await mathematics.deployed();

  console.log(`Mathematics contract deployed to ${mathematics.address}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
