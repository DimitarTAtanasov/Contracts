// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
pragma abicoder v2;

contract Ownable {
    address public owner;
    
    modifier onlyOwner() {
        require(owner == msg.sender, "Not invoked by the owner");
        _;
    }
        
    constructor() {
        owner = msg.sender;
    }
 
}