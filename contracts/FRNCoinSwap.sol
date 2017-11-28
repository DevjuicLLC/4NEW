/**
 * This smart contract is modified Dec 2017 by Freydal to test migration to new ERC20 token contract.
 */

pragma solidity ^0.4.8;

import 'zeppelin/contracts/token/BurnableToken.sol';
import 'zeppelin/contracts/token/StandardToken.sol';
import 'zeppelin/contracts/ownership/Ownable.sol';


/**
 * FRNCoin
 *
 * Capped, burnable, and transfer releaseable ERC20 token
 * for 4new.co.uk
 *
 */
contract FRNCoinSwap is Ownable {

  BurnableToken public FRNC;
  StandardToken public FRNU;

  function FRNCoinSwap(address _FRNCAddress, address _FRNUAddress) Ownable() {
    FRNC = BurnableToken(_FRNCAddress);
    FRNU = StandardToken(_FRNUAddress);
  }

  function swap(address _sourceAddress) onlyOwner returns(bool) {
    uint amount = FRNC.allowance(_sourceAddress, this);
    require(FRNC.transferFrom(_sourceAddress, this, amount));
    FRNU.transfer(_sourceAddress, amount);
    FRNC.burn(amount);

    return true;
  }
}