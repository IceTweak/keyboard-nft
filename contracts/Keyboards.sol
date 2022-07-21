// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

contract Keyboards {
  string[] public createdKeyboards;

  function getKeyboards() view public returns(string[] memory) {
    return createdKeyboards;
  }
}