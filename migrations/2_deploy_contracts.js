const FRNCoin = artifacts.require('FRNCoin');
const FRNCoinCrowdsale = artifacts.require('FRNCoinCrowdsale');

module.exports = function(deployer) {
  const acc1 = process.env.add1 || web3.eth.accounts[0];
  const pw  = process.env.add1Password;

  if(pw) {
    web3.personal.unlockAccount(acc1, pw);
  }

  deployer.then(() => {
   return deployer.deploy(FRNCoin)
  }).then(() => FRNCoin.deployed()).then((i) => {
    coin = i;

    return deployer.deploy(FRNCoinCrowdsale,
      Date.parse('Feb 28, 2018'),
      170,
      acc1,
      coin.address,
      acc1
    );
  }).then(() => FRNCoinCrowdsale.deployed()).then((i) => {
    sale = i;

    coin.approve(sale.address, web3.toWei('100000000'))
  })
};
