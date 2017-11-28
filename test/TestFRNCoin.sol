pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "contracts/FRNCoin.sol";

contract TestFRNCoin {

  function testDeployment() {
    FRNCoin coin = new FRNCoin();
    uint256 supply = 100 ether;

    Assert.equal(coin.totalSupply(), supply, "The total supply should be 1*10^20");
    Assert.equal(coin.balanceOf(this), supply, "The creator should get all the supply");
  }

  function testBurn() {
    FRNCoin coin = new FRNCoin();
    uint256 supply = 100 ether;

    coin.burn(supply);

    Assert.equal(coin.totalSupply(), 0, "The total supply should be gone");
    Assert.equal(coin.balanceOf(this), 0, "The creator should have all their coins burned");
  }

}
