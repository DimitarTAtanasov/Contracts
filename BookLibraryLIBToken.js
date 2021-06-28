const { ethers } = require("ethers");
const BookLibrary = require('./build/BookLibrary.json')
const LibToken = require('./build/LibToken.json')
const WrapperContract = require('./build/WrapperContract.json')

const run = async function() {

	// const providerURL = "http://localhost:8545";
	// const walletPrivateKey = "0x7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8";
	// const bookContarctAddress = "0xA5e2Df9f4B5A13dc33147500230a16c9Da33E55C";

	// const provider = new ethers.providers.JsonRpcProvider(providerURL)
	
	// const wallet = new ethers.Wallet(walletPrivateKey, provider)

	const provider = new ethers.providers.InfuraProvider("ropsten", "40c2813049e44ec79cb4d7e0d18de173")
		
	const wallet = new ethers.Wallet("7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8", provider)
	const balance = await wallet.getBalance();

	const wrapperContract = new ethers.Contract('0x2B59D6F7dBc9F2D274983b77a0A63379528252c3', WrapperContract.abi, wallet)

	const bookContract = new ethers.Contract('0x98832a37E5662457E405d0CF6234c8CfB7b2cA24', BookLibrary.abi, wallet)
	// const libTokenAddress = await bookContract.LIBToken();

	// console.log(libTokenAddress);

	// const tokenContract = new ethers.Contract(libTokenAddress, LibToken.abi, wallet)

	// const wrapperContractAddress = await bookContract.wrapperContract();

	// console.log(wrapperContractAddress);

	// const wrapperContract = new ethers.Contract(wrapperContractAddress, WrapperContract.abi, wallet);
	const wrapValue = ethers.utils.parseEther("0.1")
	// const wrapTx = await wallet.sendTransaction(
	// 	{to: bookContract, value: wrapValue})

	// const contractBalance1 = await tokenContract.balanceOf(bookContarctAddress);

    // const contractBalance = ethers.utils.formatEther(contractBalance1)
	// console.log(contractBalance);

    // const contractETHBalance1 = await provider.getBalance(bookContarctAddress)
    // const contractETHBalance = ethers.utils.formatEther(contractETHBalance1)

	// console.log(contractETHBalance);
	try {
		const transaction = await wrapperContract.unwrap(wrapValue)
		// const transaction = await bookContract.exchangeTokens();

	}
	catch(e) {
		console.log(e)
	}




	

	
}

run()