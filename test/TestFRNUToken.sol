pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "contracts/FRNUToken.sol";

contract TestFRNUToken {

  function testDeployment() {
    FRNUToken coin = new FRNUToken();
    uint256 supply = 100 ether;

    Assert.equal(coin.totalSupply(), supply, "The total supply should be 1*10^20");
    Assert.equal(coin.balanceOf(this), supply, "The creator should get all the supply");
  }
}
