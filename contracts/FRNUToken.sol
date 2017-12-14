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
  uint public transfersActiveAt;
  uint public insiderCliff;
  address crowdsaleContractAddress;
  address crowdsalePoolAddress;

  mapping(address => uint256) lockedBalances;

  function FRNUToken(
    uint _transfersActiveAt,
    uint _insiderCliff,
    address _institutionalWallet,
    address _insider1,
    address _insider2,
    address _insider3
  ) Ownable() {
    name = "4NEW Token";
    symbol = "FRNU";
    totalSupply = 5000000 ether;
    decimals = 18;

    transfersActiveAt = _transfersActiveAt; // We expect this to be Feb 1, 2018 (1517443200)
    insiderCliff = _insiderCliff; // We expect this to be Jan 1, 2019 (1546300800)

    balances[_institutionalWallet] = 1000000 ether;
    lockedBalances[_institutionalWallet] = 800000 ether; // 20% is liquid on Feb 1, 2018

    balances[_insider1] = 400000 ether;
    lockedBalances[_insider1] = 400000 ether; // 100% locked

    balances[_insider2] = 400000 ether;
    lockedBalances[_insider2] = 400000 ether; // 100% locked

    balances[_insider3] = 400000 ether;
    lockedBalances[_insider3] = 400000 ether; // 100% locked

    balances[owner] = 2800000 ether;
  }

  modifier transferAllowed() {
    require(isOwner() || transfersActive());
    _;
  }

  function isOwner() public returns (bool) {
    return msg.sender == owner;
  }

  function transfersActive() public returns (bool) {
    return (now > transfersActiveAt);
  }

  function transfer(address _to, uint256 _value) transferAllowed public returns (bool) {
    require(_to != address(0));
    require(_value <= tradeableBalance(msg.sender));

    // SafeMath.sub will throw if there is not enough balance.
    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    require(_to != address(0));
    require(_value <= tradeableBalance(_from));
    require(_value <= allowed[_from][msg.sender]);

    balances[_from] = balances[_from].sub(_value);
    balances[_to] = balances[_to].add(_value);
    allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
    Transfer(_from, _to, _value);
    return true;
  }

  function configureCrowdsale(address _crowdsaleContractAddress, address _crowdsalePoolAddress) onlyOwner public {
    crowdsaleContractAddress = _crowdsaleContractAddress;
    crowdsalePoolAddress = _crowdsalePoolAddress;
  }

  function crowdsalePoolTransfer(address _to, uint _value) onlyCrowdsaleContract public returns (bool) {
    require(_to != address(0));
    require(_value > 0);

    allowed[crowdsalePoolAddress][crowdsaleContractAddress].sub(_value);
    balances[crowdsalePoolAddress].sub(_value);

    balances[_to].add(_value);

    return true;
  }

  modifier onlyCrowdsaleContract() {
    require(msg.sender == crowdsaleContractAddress);
    _;
  }

  function tradeableBalance(address _owner) public returns (uint tradeableBalance) {
    // NOTE: Balances are "locked" until after the cliff. At that point, the lockedBalances become meaningless.
    if (now > insiderCliff) {
      return balances[_owner];
    } else {
      return balances[_owner].sub(lockedBalances[_owner]);
    }
  }
}
