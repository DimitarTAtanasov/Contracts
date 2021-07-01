const etherlime = require('etherlime-lib');
const LimeToken = require('../build/LimeToken.json');
const BookLibrary = require('../build/BookLibrary.json');
const WrapperContract = require('../build/WrapperContract.json');
const deploy = async (network, secret, etherscanApiKey) => {

	const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, '40c2813049e44ec79cb4d7e0d18de173');
	// const result = await deployer.deploy(WrapperContract);
	// const address = await result.LIBToken();
	// console.log(address)
	const result = await deployer.deploy(BookLibrary, {}, '0x9caEc5354b88b3dA265B69de6AB27EE5f3A073F0', '0x8f7144ade7424139115A51c14F2a3332fff80060');
//0x6a172f8361cA5d6A226e93924a8aF77d6C2D41Ef lib contract

};

module.exports = {
	deploy
};