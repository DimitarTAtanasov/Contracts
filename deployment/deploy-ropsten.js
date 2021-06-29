const etherlime = require('etherlime-lib');
const LimeToken = require('../build/LimeToken.json');
const BookLibrary = require('../build/BookLibrary.json');
const WrapperContract = require('../build/WrapperContract.json');
const deploy = async (network, secret, etherscanApiKey) => {

	const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, '40c2813049e44ec79cb4d7e0d18de173');
	// const result = await deployer.deploy(WrapperContract);
	// const address = await result.LIBToken();
	// console.log(address)
	const result = await deployer.deploy(BookLibrary, {}, '0xBf906f71e605f54E0165B1b2775F91C7fa0CcfD8', '0x197D9C30849853501c47aF7453FA375a943aA969');
//0xFa31006FfC6e4d2D223e19690462BEff90FB973B lib contract

};

module.exports = {
	deploy
};