const dotenv=require('dotenv');
const result=dotenv.config();
if (result.error){
  throw result.error;
}
console.log(result.parsed);
var NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker");
var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey="bb74b607951d4e469dde2124c6320675";

var mnemonic_ropsten=process.env.mnemonic_ropsten;
var mnemonic_mainnet=process.env.mnemonic_mainnet;
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
   networks: {
  //   development: {
  //     host: "127.0.0.1",
  //     port: 7545,
  //     network_id: "*", // Match any network 
  //     gas : 3000000000
  //   },
  //   local: {
  //     host :"127.0.0.1",
  //     port: 8545,
  //     network_id:"*",
  //     gas : 30000000000
  //   }

    ropsten:{
      provider :new HDWalletProvider(mnemonic_ropsten,"https://ropsten.infura.io/"+infura_apikey),
      network_id: 3,
      gas: 7003605,
      gasPrice: 100000000000,
      networkCheckTimeout: 600000
    }
    // mainnet:{
    //   provider: function () {
    //     var wallet = new HDWalletProvider(mnemonic_mainnet, "https://mainnet.infura.io/v3/bb74b607951d4e469dde2124c6320675");
    //     var nonceTracker = new NonceTrackerSubprovider();
    //     wallet.engine._providers.unshift(nonceTracker);
    //     nonceTracker.setEngine(wallet.engine);
    //     return wallet;
    //   },
    //   gas: 6000000,
    //   network_id: 1,
    //   gasPrice: 10 * 1000000000
    // }
  }
};
