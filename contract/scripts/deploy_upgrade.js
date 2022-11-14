const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const StakingToken = await ethers.getContractFactory("StakingToken");
  console.log("Upgrading StakingToken...");
  await upgrades.upgradeProxy(
    "0x7808607e40822bbDB882e40326DBEF466F90fd5C",
    StakingToken
  );
  console.log("StakingToken upgraded");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
