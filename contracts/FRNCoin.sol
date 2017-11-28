/**
 * This smart contract is modified Dec 2017 by Freydal to test migration to new ERC20 token contract.
 */

pragma solidity ^0.4.8;

import 'zeppelin/contracts/token/BurnableToken.sol';
import 'zeppelin/contracts/ownership/Ownable.sol';


/**
 * FRNCoin
 *
 * Capped, burnable, and transfer releaseable ERC20 token
 * for 4new.co.uk
 *
 */
contract FRNCoin is BurnableToken, Ownable {

    /** Name and symbol were updated. */
    event UpdatedTokenInformation(string newName, string newSymbol);

    string public name;

    string public symbol;

    uint public decimals;

    /**
     * Construct the token.
     */
    function FRNCoin() Ownable() {
        name = "FRNCoin";
        symbol = "FRNC";

        totalSupply = 100 ether;

        decimals = 18;

        // Create initially all balance on owner
        balances[owner] = totalSupply;
    }

    /**
     * To update token information at the end.
     *
     */
    function setTokenInformation(string _name, string _symbol) onlyOwner {
        name = _name;
        symbol = _symbol;

        UpdatedTokenInformation(name, symbol);
    }
}