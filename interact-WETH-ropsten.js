const { ethers } = require("ethers");
// const ETHWrapper = require('./build/ETHWrapper.json')
const LIBToken = require('./build/LibToken.json')
const WrapperContract = require('./build/WrapperContract.json');
const BookLibrary = require('./build/BookLibrary.json')



const run = async function() {

	const provider = new ethers.providers.InfuraProvider("ropsten", "40c2813049e44ec79cb4d7e0d18de173")
		
	const wallet = new ethers.Wallet("7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8", provider)
	// const balance = await wallet.getBalance();

	const wrapperContract = new ethers.Contract("0x3Dec8a0135325B5a9812b8347A2c0abF10736c26", WrapperContract.abi, wallet)
	const wethAddress = await wrapperContract.LIBToken();

	const tokenContract = new ethers.Contract(wethAddress, LIBToken.abi, wallet)
	const wrapValue = ethers.utils.parseEther("1")
	console.log(wrapValue);
	// const wrapTx = await wrapperContract.wrap({value: wrapValue})
	// await wrapTx.wait();

	// let balance = await tokenContract.balanceOf(wallet.address)
	// console.log("Balance after wrapping:", balance.toString())

	// let contractETHBalance = await provider.getBalance('0x2B59D6F7dBc9F2D274983b77a0A63379528252c3');
	// console.log("Contract ETH balance after wrapping:", contractETHBalance.toString())
	


	// const approveTx = await tokenContract.approve('0x2B59D6F7dBc9F2D274983b77a0A63379528252c3', wrapValue)
	// await approveTx.wait()

	// const unwrapTx = await wrapperContract.unwrap(wrapValue)
	// await unwrapTx.wait()

	// balance = await tokenContract.balanceOf(wallet.address)
	// console.log("Balance after unwrapping:", balance.toString())

	// contractETHBalance = await provider.getBalance('0x2B59D6F7dBc9F2D274983b77a0A63379528252c3');
	// console.log("Contract ETH balance after unwrapping:", contractETHBalance.toString())


	// const bookContract = new ethers.Contract('0x83f9F5E330442d1ee12f119Bf84250e10eB30AF3', BookLibrary.abi, wallet)

	// contractBalance = await tokenContract.balanceOf('0x83f9F5E330442d1ee12f119Bf84250e10eB30AF3')
	// console.log("Contract Balance after unwrapping:", contractBalance.toString())
	const unwrapTx = await bookContract.unwrapToken()
	await unwrapTx.wait()
}

run()