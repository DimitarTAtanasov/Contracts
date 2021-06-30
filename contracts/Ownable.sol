// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
// pragma abicoder v2;

contract Ownable {
    address public _owner;
    
    modifier onlyOwner() {
        require(_owner == msg.sender, "Not invoked by the owner");
        _;
    }
        
    constructor() {
        _owner = msg.sender;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }
 
}