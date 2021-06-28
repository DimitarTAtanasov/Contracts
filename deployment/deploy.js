const etherlime = require('etherlime-lib');
const LimeToken = require('../build/LimeToken.json');
const BookLibrary = require('../build/BookLibrary.json');
const WrapperContract = require('../build/WrapperContract.json');
const deploy = async (network, secret, etherscanApiKey) => {

	const deployer = new etherlime.EtherlimeGanacheDeployer();
	const result = await deployer.deploy(BookLibrary,[], '0xDe8ec2fC9DEc5e76F6C9E4A90FAAb80a743D27bd', '0x9189CD08bd86962A69e2D7D23751f621AD6177B7');

};

module.exports = {
	deploy
};