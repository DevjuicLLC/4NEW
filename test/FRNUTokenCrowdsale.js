const FRNUToken = artifacts.require("./FRNUToken.sol");
const FRNUTokenCrowdsale = artifacts.require("./FRNUTokenCrowdsale.sol");

contract('FRNUTokenCrowdsale', async function(accounts) {

  it("awards tokens from ether", async () => {
    sale = await FRNUTokenCrowdsale.deployed();
    token = await FRNUToken.deployed();

    assert.equal(true, await sale.buyTokens.call('0x11123f0013', { value: 1 }));
    assert.equal(await token.balanceOf('0x11123f0013').toString(), await sale.rate.call().toString())
  });
});
