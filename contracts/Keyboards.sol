// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

contract Keyboards {
  enum KeyboardKind { 
	  SixtyPercent, 
	  SeventyFivePercent,
    EightyPercent, 
	  Iso105 
	}

  struct Keyboard {
    KeyboardKind kind; 
    // ABS = false, PBT = true
    bool isPBT;
    // tailwind filters to layer over
    string filter;
  }

  Keyboard[] public createdKeyboards;

  function getKeyboards() view public returns(string[] memory) {
    return createdKeyboards;
  }

  function create(string calldata _description) external {
    createdKeyboards.push(_description);
  }
}