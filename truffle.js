module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    stage: {
      host: "13.93.217.3",
      port: 22000,
      network_id: "*" // Match any network id
    }
  }
};
