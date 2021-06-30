const etherlime = require('etherlime-lib');
const LimeToken = require('../build/LimeToken.json');
const BookLibrary = require('../build/BookLibrary.json');
const WrapperContract = require('../build/WrapperContract.json');
const deploy = async (network, secret, etherscanApiKey) => {

	const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, '40c2813049e44ec79cb4d7e0d18de173');
	// const result = await deployer.deploy(WrapperContract);
	// const address = await result.LIBToken();
	// console.log(address)
	const result = await deployer.deploy(BookLibrary, {}, '0xA6F9bf0babA0595d853673e4e29c137e73B660BE', '0x180e1DecD40562C5B6b5f61A5F865178FC666BBC');
//0x67CFB2f80E53102EF11630E51f4B352DCc21bC0a lib contract

};

module.exports = {
	deploy
};