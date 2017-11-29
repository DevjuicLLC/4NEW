// const FRNCoin = artifacts.require("./FRNCoin.sol");
// const FRNUToken = artifacts.require("./FRNUToken.sol");
// const FRNCoinSwap = artifacts.require("./FRNCoinSwap.sol");
//
// contract('FRNCoinSwap', function(accounts) {
//
//   const owner = accounts[0];
//   const user = accounts[1];
//
//   it('should swap as expected', function() {
//     const amount = 1000000000;
//     const state = {
//       expectedFRNCTotalSupply: (web3.toWei(100) - amount),
//       expectedFRNUBalance: amount,
//       expectedFRNCBalance: 0
//     };
//
//     return FRNCoin.new().then((instance) => {
//       state.frnc = instance;
//
//       return FRNUToken.new()
//     }).then((instance) => {
//       state.frnu = instance;
//
//       return FRNCoinSwap.new(state.frnc.address, state.frnu.address)
//     }).then((instance) => {
//       state.swapContract = instance;
//
//       state.frnc.transfer(user, amount)
//     }).then(() => {
//       state.frnu.transfer(state.swapContract.address, amount)
//     }).then(() => {
//       state.frnc.approve(state.swapContract.address, amount, { from: user })
//     }).then(() => {
//       state.swapContract.swap(user)
//     }).then(() => {
//       return state.frnc.totalSupply.call()
//     }).then((val) => {
//       state.totalSupply = val;
//
//       return state.frnu.balanceOf.call(user)
//     }).then((val) => {
//       state.frnuUserBalance = val;
//
//       return state.frnc.balanceOf.call(user)
//     }).then((val) => {
//       state.frncUserBalance = val;
//     }).then(() => {
//       assert.equal(state.expectedFRNUBalance, state.frnuUserBalance, 'The user should receive the tokens');
//       assert.equal(state.expectedFRNCBalance, state.frncUserBalance, 'The user have no tokens in the previous contract');
//       assert.equal(state.expectedFRNCTotalSupply, state.totalSupply.toNumber(), 'The total supply should be reduced by burned coins');
//     });
//   });
// });
