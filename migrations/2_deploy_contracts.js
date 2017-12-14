const FRNCoin = artifacts.require('FRNCoin');
const FRNCoinCrowdsale = artifacts.require('FRNCoinCrowdsale');

module.exports = function(deployer) {
  const acc1 = process.env.add1 || web3.eth.accounts[0];
  const pw  = process.env.add1Password;

  if(pw) {
    web3.personal.unlockAccount(acc1, pw);
  }

  // deployer.deploy(FRNCoin)

  deployer.deploy(FRNCoinCrowdsale,
    1,
    Date.parse('Feb 28, 2018'),
    170,
    acc1,
    '0xaccaf49428bce5e5787c6ff86c49f32769af8360',
    acc1
  );
};
