module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network 
      gas : 3000000000
    },
    local: {
      host :"127.0.0.1",
      port: 8545,
      network_id:"*",
      gas : 30000000000
    }
  }
};
