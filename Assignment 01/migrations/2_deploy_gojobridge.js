const BridgeGojo = artifacts.require('BridgeGojo');
const TokenGojo = artifacts.require('TokenGojo');

module.exports = function(deployer) {
    deployer.deploy(BridgeGojo, TokenGojo.address);
};