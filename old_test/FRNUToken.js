const FRNUToken = artifacts.require("./FRNUToken.sol");

contract('FRNUToken', function(accounts) {
  const john = accounts[0];
  const barb = accounts[1];
  const seth = accounts[2];
  const jpMo = accounts[3]; // Institutional Wallet --> e.g. JP Morgan
  const hugh = accounts[4]; // Insider 1
  const stef = accounts[5]; // Insider 2
  const kris = accounts[6]; // Insider 3

  const feb_1_18 = 1517443200;
  const jan_1_10 = 1262304000;
  const jan_1_19 = 1546300800;

  it("gives 2.8M tokens to the contract creator", function() {
    return FRNUToken.new(feb_1_18, jan_1_19, jpMo, hugh, stef, kris, { from: barb }).then((instance) => {
      return instance.balanceOf.call(barb);
    }).then((barbsBalance) => {
      assert.equal(web3.toWei(2800000), barbsBalance.toNumber());
    });
  });

  it("gives 1M tokens to the institutional wallet, with 800k locked", async function() {
    let tokenContract    = await FRNUToken.new(feb_1_18, jan_1_19, jpMo, hugh, stef, kris, { from: barb })
    let balance          = await tokenContract.balanceOf.call(jpMo);
    let tradeableBalance = await tokenContract.tradeableBalance.call(jpMo);

    assert.equal(web3.toWei(1000000), balance.toNumber());
    assert.equal(web3.toWei(200000), tradeableBalance.toNumber());
  });

  it("gives 1.2M tokens to the insider wallets, split evenly, all locked", async function() {
    let tokenContract    = await FRNUToken.new(feb_1_18, jan_1_19, jpMo, hugh, stef, kris, { from: barb })

    let hughBalance          = await tokenContract.balanceOf.call(hugh);
    let hughTradeableBalance = await tokenContract.tradeableBalance.call(hugh);

    assert.equal(web3.toWei(400000), hughBalance.toNumber());
    assert.equal(web3.toWei(0), hughTradeableBalance.toNumber());

    let stefBalance          = await tokenContract.balanceOf.call(stef);
    let stefTradeableBalance = await tokenContract.tradeableBalance.call(stef);

    assert.equal(web3.toWei(400000), stefBalance.toNumber());
    assert.equal(web3.toWei(0), stefTradeableBalance.toNumber());

    let krisBalance          = await tokenContract.balanceOf.call(kris);
    let krisTradeableBalance = await tokenContract.tradeableBalance.call(kris);

    assert.equal(web3.toWei(400000), krisBalance.toNumber());
    assert.equal(web3.toWei(0), krisTradeableBalance.toNumber());
  });

  it("always lets the owner transfer tokens", async function() {
    let amountToTransfer = web3.toWei(1500);
    let tokenContract    = await FRNUToken.new(feb_1_18, jan_1_19, jpMo, hugh, stef, kris, { from: barb })

    await tokenContract.transfer(john, amountToTransfer, { from: barb });

    let balance  = await tokenContract.balanceOf.call(john);

    assert.equal(amountToTransfer, balance.toNumber());
  });

  it("prevents transfers before trading is active unless authorized", async function() {
    let amountFromBarb = web3.toWei(25000);
    let amountFromJohn = web3.toWei(7500);
    let tokenContract  = await FRNUToken.new(feb_1_18, jan_1_19, jpMo, hugh, stef, kris, { from: barb });

    await tokenContract.transfer(john, amountFromBarb, { from: barb })

    // This throws "INVALID OPCODE"
    try {
      await tokenContract.transfer(seth, amountFromJohn, { from: john })
    } catch (error) {
      // console.log(error);
    }

    let balance = await tokenContract.balanceOf.call(seth);
    assert.equal(0, balance.toNumber());
  })

  it("allows transfers after trading is active", async function() {
    let amountFromBarb = web3.toWei(25000);
    let amountFromJohn = web3.toWei(7500);
    let tokenContract  = await FRNUToken.new(jan_1_10, jan_1_19, jpMo, hugh, stef, kris, { from: barb });

    await tokenContract.transfer(john, amountFromBarb, { from: barb })
    await tokenContract.transfer(seth, amountFromJohn, { from: john })

    let balance = await tokenContract.balanceOf.call(seth);

    assert.equal(amountFromJohn, balance.toNumber());
  });

  it("prevents locked tokens from being traded prior to the 1 yr cliff", async function() {
    // IMPORTANT: need to use jan 1, 2010 so that transfer works!
    let tokenContract  = await FRNUToken.new(jan_1_10, jan_1_19, jpMo, hugh, stef, kris, { from: barb });
    let insiderBalance = web3.toWei(400000);
    let transferAmount = web3.toWei(8000);

    let tradeableBalance = await tokenContract.tradeableBalance.call(hugh);
    let hughsBalance     = await tokenContract.balanceOf.call(hugh);

    assert.equal(0, tradeableBalance.toNumber());
    assert.equal(insiderBalance, hughsBalance.toNumber());

    // This throws "INVALID OPCODE"
    try {
      await tokenContract.transfer(seth, transferAmount, { from: hugh })
    } catch (error) {
      // console.log(error);
    }
    let sethsBalance = await tokenContract.balanceOf.call(seth);
    assert.equal(0, sethsBalance.toNumber());
  });

  it("allows locked tokens to be traded after the 1 yr cliff", async function() {
    let tokenContract  = await FRNUToken.new(jan_1_10, jan_1_10, jpMo, hugh, stef, kris, { from: barb });
    let insiderBalance = web3.toWei(400000);
    let transferAmount = web3.toWei(8000);

    let tradeableBalance = await tokenContract.tradeableBalance.call(stef);
    let balance          = await tokenContract.balanceOf.call(stef);

    assert.equal(insiderBalance, tradeableBalance.toNumber());
    assert.equal(insiderBalance, balance.toNumber());

    await tokenContract.transfer(seth, transferAmount, { from: stef })

    let sethsBalance = await tokenContract.balanceOf.call(seth);
    assert.equal(transferAmount, sethsBalance.toNumber());
  });
})
