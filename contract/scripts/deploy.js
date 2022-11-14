async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const StakingToken = await ethers.getContractFactory("StakingToken");
  const stakingToken = await upgrades.deployProxy(StakingToken, [deployer.address], { initializer: 'initialize' });
  await stakingToken.deployed();
  console.log("StakingToken address:", stakingToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
