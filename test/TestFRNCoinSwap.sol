pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "contracts/FRNCoin.sol";
import "contracts/FRNUToken.sol";
import "contracts/FRNCoinSwap.sol";


contract TestFRNCoinSwap {

  function testDeployment() {
    FRNCoin source = new FRNCoin();
    FRNUToken dest = new FRNUToken();

    FRNCoinSwap swap = new FRNCoinSwap(source, dest);

    Assert.equal(source, swap.FRNC(), "The source should be the FRNC address");
    Assert.equal(dest, swap.FRNU(), "The dest should be the FRNU address");
  }
}