const FRNUToken = artifacts.require('FRNUToken');
const FRNUTokenCrowdsale = artifacts.require('FRNUTokenCrowdsale');

module.exports = function(deployer) {
  const acc1 = process.env.add1 || web3.eth.accounts[0];
  const acc2 = process.env.add2 || web3.eth.accounts[1];

  deployer.then(() => {
    let token, sale;
    return deployer.deploy(FRNUToken,
      Date.now(),
      '1546300800',
      acc2,
      acc2,
      acc2,
      acc2
    );
  }).then(() => FRNUToken.deployed()).then((instance) => {
    token = instance;


    return deployer.deploy(FRNUTokenCrowdsale,
      1,
      Date.parse('Feb 28, 2018'),
      170,
      acc1,
      token.address
    );
  }).then(() => FRNUTokenCrowdsale.deployed()).then((instance) => {
    sale = instance;

    return token.balanceOf.call(acc1);
  }).then((val) => {
    token.transfer(sale.address, val)
  })

};
