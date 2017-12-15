const FRNCoin = artifacts.require("./FRNCoin.sol");
const FRNCoinCrowdsale = artifacts.require("./FRNCoinCrowdsale.sol");

contract('FRNCoinCrowdsale', async function(accounts) {

  coinbase = accounts[0];
  tokenReceiver = accounts[1];
  tokenPool = accounts[2];
  wallet = accounts[3];

  it("awards tokens from ether", async () => {
    token = await FRNCoin.new();
    sale = await FRNCoinCrowdsale.new(
      Date.parse('Feb 28, 2018'),
      170,
      wallet,
      token.address,
      tokenPool
    );

    await token.transfer(tokenPool, await token.balanceOf(coinbase));
    await token.approve(sale.address, await token.balanceOf(tokenPool), { from: tokenPool });

    web3.eth.coinbase = tokenReceiver
    console.log(await sale.send(1));




    assert.equal((await token.balanceOf(tokenReceiver)).toString(), 170);
  });
});
