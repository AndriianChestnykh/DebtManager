'use strict';

var helper = require('../helpers/helper');
var express = require('express');
var router = express.Router();

var contractArtifact = require('../build/contracts/DebtManager.json');
var Web3 = require('web3');
var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var web3 = new Web3(provider);

var account = '0x8a0643dfe5a35c75e75bfe241ec6e63f2170e201';

var contract = require("truffle-contract");
var DebtManager = contract(contractArtifact);
DebtManager.providers

/**
 * Get debts
 */
router.get('/', function (req, res) {

    //console.log(DebtManager);

    DebtManager.setProvider(provider);

    var meta;
    DebtManager.deployed().then(function(instance) {
    meta = instance;
    return meta.createOrder('test', account, {from: account});
    }).then(function(result) {
    // If this callback is called, the transaction was successfully processed.
    alert("Transaction successful!")
    }).catch(function(e) {
    // There was an error! Handle it.
    })

    res.json([]);
});



module.exports = router;