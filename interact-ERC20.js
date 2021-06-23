const { ethers } = require("ethers");
const LimeToken = require('./build/LimeToken.json')

const run = async function() {
	const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
	const wallet = new ethers.Wallet("0x7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8", provider);
	const LimeTokenContract = new ethers.Contract("0xc9707E1e496C12f1Fa83AFbbA8735DA697cdBf64", LimeToken.abi, wallet)

	//Mint user
	const transactionMint = await LimeTokenContract.mint("0xd9995bae12fee327256ffec1e3184d492bd94c31", 900000);

	// console.log("State Result Submission Transaction:", transactionOhio.hash);
	const transactionReceipt = await transactionMint.wait();
	if (transactionReceipt.status != 1) {
		console.log("Transaction was not successfull")
		return 
	}

	const deployerBalanceAfterMint = await LimeTokenContract.balanceOf("0xd9995bae12fee327256ffec1e3184d492bd94c31");

	console.log("user1 after mint", deployerBalanceAfterMint.toString());


	//Transfer from one user to another

	const transactionTransfer = await LimeTokenContract.transfer("0x465b2b6CC578268BA33f24A7e151D144b0E44D29", 500000);

	// console.log("State Result Submission Transaction:", transactionOhio.hash);
	const transactionTransferReceipt = await transactionTransfer.wait();
	if (transactionTransferReceipt.status != 1) {
		console.log("Transaction was not successfull")
		return 
	}

	const deployerBalanceAfterTransfer = await LimeTokenContract.balanceOf("0xd9995bae12fee327256ffec1e3184d492bd94c31");
	const receiverBalanceAfterTransfer = await LimeTokenContract.balanceOf("0x465b2b6CC578268BA33f24A7e151D144b0E44D29");


	//Check balances after transaction

	console.log("user1 after transfer", deployerBalanceAfterTransfer.toString());
	console.log("user2 after transfer", receiverBalanceAfterTransfer.toString());


	//Burn deployer balance

	const transactionBurn = await LimeTokenContract.burn(deployerBalanceAfterTransfer);

	const transactionBurnReceipt = await transactionBurn.wait();
	if (transactionBurnReceipt.status != 1) {
		console.log("Transaction was not successfull")
		return 
	}

	const deployerBalanceAfterBurn = await LimeTokenContract.balanceOf("0xd9995bae12fee327256ffec1e3184d492bd94c31");
	console.log("user1 after burn", deployerBalanceAfterBurn.toString());

}

run()