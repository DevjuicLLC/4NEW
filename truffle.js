module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    staging: {
      host: 'localhost',
      port: 8545,
      network_id: '3',
      from: process.env.add1,
      gas: 4612388
    }
  }
};
