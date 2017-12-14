const FRNCoin = artifacts.require('FRNCoin');
const FRNCoinCrowdsale = artifacts.require('FRNCoinCrowdsale');

module.exports = function(deployer) {
  const acc1 = process.env.add1 || web3.eth.accounts[0];
  const pw  = process.env.add1Password;

  if(pw) {
    web3.personal.unlockAccount(acc1, pw);
  }

  deployer.deploy(FRNCoinCrowdsale,
    1,
    Date.parse('Feb 28, 2018'),
    170,
    acc1,
    '0x77ae4cded8c197b4c503895368f077ef6288462b',
    '0x64c6f8c1d931978522e36008074a17f89b9016c9'
  );
};
