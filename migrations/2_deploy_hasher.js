const RPS = artifacts.require("Hasher");

module.exports = function(deployer) {
  deployer.deploy(RPS)
};
