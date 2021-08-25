// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./HotToken.sol";

 contract Contribution {
    string public name = "Donate";
    address public owner;
    HotToken public hotToken;


    address[] public donationNames;
    mapping(address => uint) public donationBalance;
    mapping(address => bool) public hasDonated;
    mapping(address => bool) public isDonating;

    constructor(HotToken _hotToken) payable {
        hotToken = _hotToken;
        owner = msg.sender;
    }
   
    function donateTokens(uint _amount) public {
 /*
  * @dev Requires the owner to have more than 0 tokens to donate
  */        require(_amount > 0, "amount cannot be 0");

 /*
  * @dev Transfer Hot tokens to this contract for donations
  */
        hotToken.transferFrom(msg.sender, address(this), _amount);

 /*
  * @dev Update donation balance
  */
        donationBalance[msg.sender] = donationBalance[msg.sender] + _amount;
/*
  * @dev Add user to donation array *only* if they haven't donated already
  */
        if(!hasDonated[msg.sender]) {
            donationNames.push(msg.sender);
        }
/*
  * @dev Update donation status
  */
        isDonating[msg.sender] = true;
        hasDonated[msg.sender] = true;
    }
}