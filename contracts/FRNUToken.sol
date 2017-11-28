/**
 * This smart contract is created Dec 2017 by Freydal to test migration to new ERC20 token contract.
 */

pragma solidity ^0.4.8;

import 'zeppelin/contracts/ownership/Ownable.sol';
import 'zeppelin/contracts/token/StandardToken.sol';


contract FRNUToken is Ownable, StandardToken {

  string public name;
  string public symbol;
  uint public decimals;

  /**
   * Construct the token.
   */
  function FRNUToken() Ownable() {
    name = "FRNUToken";
    symbol = "FRNU";

    totalSupply = 100 ether;

    decimals = 18;

    // Create initially all balance on owner
    balances[owner] = totalSupply;
  }
}