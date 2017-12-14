const FRNCoin = artifacts.require("./FRNCoin.sol");
const FRNCoinCrowdsale = artifacts.require("./FRNCoinCrowdsale.sol");

contract('FRNCoinCrowdsale', async function(accounts) {

  it("awards tokens from ether", async () => {
    // sale = await FRNCoinCrowdsale.deployed();TODO: deploy new in test
    // token = await FRNCoin.deployed();

    // assert.equal(true, await sale.buyTokens.call('0x11123f0013', { value: 1 }));
    // assert.equal(await token.balanceOf('0x11123f0013').toString(), await sale.rate.call().toString())
  });
});
