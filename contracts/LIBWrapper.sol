// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;
// pragma abicoder v2;

import "./LibToken.sol";

contract WrapperContract {

	LibToken public LIBToken;

	event LogETHWrapped(address sender, uint256 amount);
	event LogETHUnwrapped(address sender, uint256 amount);
    event UnwrapInWrapperContract(uint _amount);


	constructor() public {
		LIBToken = new LibToken();
	}

	function wrap() public payable {
		require(msg.value > 0, "We need to wrap at least 1 wei");
		LIBToken.mint(msg.sender, msg.value);
		emit LogETHWrapped(msg.sender, msg.value);
	}

	function unwrap(uint value) public {
        emit UnwrapInWrapperContract(value);

		require(value > 0, "We need to unwrap at least 1 wei");
		LIBToken.transferFrom(msg.sender, address(this), value);
		LIBToken.burn(value);
		msg.sender.transfer(value);
		// emit LogETHUnwrapped(msg.sender, value);
	}

	receive() external payable {
		wrap();
	} 

}