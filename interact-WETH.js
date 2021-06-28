const { ethers } = require("ethers");
const ETHWrapper = require('./build/ETHWrapper.json')
const WETH = require('./build/WETH.json')
const WrapperContract = require('./build/WrapperContract.json');


const run = async function() {

	const providerURL = "http://localhost:8545";
	const walletPrivateKey = "0x7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8";
	const wrapperContractAddress = "0x9189CD08bd86962A69e2D7D23751f621AD6177B7";

	const provider = new ethers.providers.JsonRpcProvider(providerURL)
	
	const wallet = new ethers.Wallet(walletPrivateKey, provider)

	const wrapperContract = new ethers.Contract(wrapperContractAddress, WrapperContract.abi, wallet)
	const wethAddress = await wrapperContract.LIBToken();

	// const tokenContract = new ethers.Contract(wethAddress, WETH.abi, wallet)
	// const wrapValue = ethers.utils.parseEther("1")
	console.log(wethAddress);

	// const wrapTx = await wrapperContract.wrap({value: wrapValue})
	// // const wrapTx = await wallet.sendTransaction({to: wrapperContractAddress, value: wrapValue})
	// await wrapTx.wait();

	// let balance = await tokenContract.balanceOf(wallet.address)
	// console.log("Balance after wrapping:", balance.toString())

	// let contractETHBalance = await provider.getBalance(wrapperContractAddress);
	// console.log("Contract ETH balance after wrapping:", contractETHBalance.toString())


	// const approveTx = await tokenContract.approve(wrapperContractAddress, wrapValue)
	// await approveTx.wait()

	// const unwrapTx = await wrapperContract.unwrap(wrapValue)
	// await unwrapTx.wait()

	// balance = await tokenContract.balanceOf(wallet.address)
	// console.log("Balance after unwrapping:", balance.toString())

	// contractETHBalance = await provider.getBalance(wrapperContractAddress);
	// console.log("Contract ETH balance after unwrapping:", contractETHBalance.toString())


	
}

run()