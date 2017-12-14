var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {

  const acc1 = process.env.add1 || web3.eth.accounts[0];
  const pw  = process.env.add1Password;

  if(pw) {
    web3.personal.unlockAccount(acc1, pw);
  }

  deployer.deploy(Migrations, { overwrite: false });
};
