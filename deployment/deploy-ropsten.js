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
//0x5D5FE3092daa844B827E852dd1A3F078A428495f lib contract

};

module.exports = {
	deploy
};