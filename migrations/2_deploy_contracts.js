var DebtManager = artifacts.require("./DebtManager.sol");

module.exports = function(deployer) {
  deployer.deploy(DebtManager);
};
