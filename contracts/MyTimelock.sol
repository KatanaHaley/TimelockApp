// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

/*
 * @dev end time is computed when the contract is deployed
 */

contract MyTimelock {
    uint public constant duration = 365 days;
    uint public immutable _endTime;
    address payable public owner;

/*
 * @dev The end of the contract is set to now + 365 days
 */
    constructor(address payable _owner, uint256 _startTime) {
        _endTime = block.timestamp + duration;
        owner = _owner;
        _startTime = block.timestamp;
    
    }
 /*
  * @dev A function that allows the owner of the contract to deposit tokens
  */
    function deposit(address token, uint amount) external {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
    }
    
    receive() external payable {}
    
 /*
  * @dev A function that ensures tokens cannot be withdrawn before 365 days
  */
    function withdraw(address token, uint amount) external {
        require(msg.sender == owner, 'Only the owner is allowed');
        require(block.timestamp >= _endTime, 'Oops! You are too early');
        if(token == address(0)) {
            owner.transfer(amount);
        } else {
            IERC20(token).transfer(owner, amount);
        }
    }
}

