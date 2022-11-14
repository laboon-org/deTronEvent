require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config()


// Ensure that we have all the environment variables we need.
const privateKey = process.env.PRIVATE_KEY ?? "NO_PRIVATE_KEY";
// Make sure node is setup on Alchemy website
const alchemyApiKey = process.env.ALCHEMY_API_KEY ?? "NO_ALCHEMY_API_KEY";


const chainIds = {
  goerli: 5,
  hardhat: 1337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
};

function getChainConfig(network) {
  const url = `https://eth-${network}.alchemyapi.io/v2/${alchemyApiKey}`;
  return {
      accounts: [`${privateKey}`],
      chainId: chainIds[network],
      url,
  };
}

module.exports = {
  solidity: "0.8.6",
  gasReporter: {
      currency: "USD",
      enabled: process.env.REPORT_GAS ? true : false,
      excludeContracts: [],
      src: "./contracts",
  },
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${alchemyApiKey}`,
      accounts: [privateKey]
    },
    mainnet: getChainConfig("mainnet"),
  }
};