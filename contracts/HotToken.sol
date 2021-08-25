// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract HotToken is ERC20 {
  constructor() ERC20('Hot Token', 'MHK') {
    _mint(msg.sender, 1 * 10 ** 18);
  }
}