'use strict';

var helper = require('../helpers/helper');
var express = require('express');
var router = express.Router();

var contractArtifact = require('../build/contracts/DebtManager.json');
var Web3 = require('web3');
var web3 = new Web3();

var account = '0x8a0643dfe5a35c75e75bfe241ec6e63f2170e201';

var contract = require("truffle-contract");
var DebtManager = contract(contractArtifact);

/**
 * Get debts
 */
router.get('/', function (req, res) {

    console.log(DebtManager);

    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    var coinbase = web3.eth.coinbase;
    var balance = web3.eth.getBalance(account);

    var abi = web3.eth.contract(contractArtifact.abi);

    web3.eth.sendTransaction({data: code}, function(err, transactionHash) {
    if (!err)
        console.log(transactionHash); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
    });

    res.json({balance: balance, coinbase: coinbase});
});



module.exports = router;