const etherlime = require('etherlime-lib');
const LimeToken = require('../build/LimeToken.json');
const BookLibrary = require('../build/BookLibrary.json');
const WrapperContract = require('../build/WrapperContract.json');
const deploy = async (network, secret, etherscanApiKey) => {

	const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, '40c2813049e44ec79cb4d7e0d18de173');
	const result = await deployer.deploy(WrapperContract);
	const address = await result.LIBToken();
	console.log(address)
	// const result = await deployer.deploy(BookLibrary, {}, '0x4feB00Cf2262E35B3055E788005cBfB7A24C59D9', '0x30d2029C2135Ba03d0c7959BDE334Dd4841Bd1aB');
//0x223d89FbE794D5619B96a00818B00A890641aB86 lib contract

};

module.exports = {
	deploy
};