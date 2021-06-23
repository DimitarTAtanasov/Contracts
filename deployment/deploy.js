const etherlime = require('etherlime-lib');
const LimeToken = require('../build/LimeToken.json');
const ETHWrapper = require('../build/ETHWrapper.json');
const deploy = async (network, secret, etherscanApiKey) => {

	const deployer = new etherlime.EtherlimeGanacheDeployer();
	const result = await deployer.deploy(ETHWrapper);

};

module.exports = {
	deploy
};