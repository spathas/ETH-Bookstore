const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  contracts_build_directory: './public/contracts',
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: '',
          },
          providerOrUrl: `https://ropsten.infura.io/v3/7d4ac39829874f1590ca8a3bbd322667`,
          addressIndex: 0,
        }),
      network_id: 3,
      gas: 5500000, // Gas Limit, How much gas we are willing to spent
      gasPrice: 20000000000, // how much we are willing to spent for unit of gas
      confirmations: 2, // number of blocks to wait between deployment
      timeoutBlocks: 200, // number of blocks before deployment times out
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.4', // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
};

// transaction hash:    0x67ee95126df792c7f87ad3c48251bf43f3c25e4fc4db17ae7b5df2a73b1f8428
// https://ropsten.etherscan.io/tx/0x67ee95126df792c7f87ad3c48251bf43f3c25e4fc4db17ae7b5df2a73b1f8428
// contract address:    0xBdE80E0B7488FE928883429A4f29f1838eabC7c8
