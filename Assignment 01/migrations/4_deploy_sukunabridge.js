const BridgeSukuna = artifacts.require('BridgeSukuna');
const TokenSukuna = artifacts.require('TokenSukuna');

module.exports = function(deployer) {
    deployer.deploy(BridgeSukuna, TokenSukuna.address);
};