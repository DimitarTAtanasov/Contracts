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

	function wrapWithSignature(bytes32 hashedMessage, uint8 v, bytes32 r, bytes32 s, address receiver) public payable {
		require(msg.value > 0, "We need to wrap at least 1 wei");
		require(recoverSigner(hashedMessage, v,r,s) == receiver, 'Receiver does not signed the message');
		LIBToken.mint(receiver, msg.value);
		emit LogETHWrapped(receiver, msg.value);
	}

    function recoverSigner(bytes32 hashedMessage, uint8 v, bytes32 r, bytes32 s) internal returns (address) {
		bytes32 messageDigest = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hashedMessage));
        return ecrecover(messageDigest, v, r, s);
	}

	// receive() external payable {
	// 	wrap();
	// } 

}