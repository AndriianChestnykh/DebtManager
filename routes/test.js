'use strict';

var helper = require('../helpers/helper');
var express = require('express');
var router = express.Router();
var funcs = require('./funcs');

var contractArtifact = require('../build/contracts/DebtManager.json');
var Web3 = require('web3');
var web3 = new Web3();

var account = '0xed9d02e382b34818e88b88a309c7fe71e65f419d';

var contract = require("truffle-contract");
var DebtManager = contract(contractArtifact);

var provider = new Web3.providers.HttpProvider("http://13.93.217.3:22000");
/**
 * Get debts
 */
router.get('/', function (req, res) {

    //console.log(DebtManager);
    web3 = new Web3(provider);
    DebtManager.setProvider(provider);
    var deployed;
    DebtManager.deployed().then(function(instance) {
        deployed = instance;
        //console.log(instance);
//        return instance.getOrderLength();
        return deployed.createOrder('test', account, {from: account, gas: 1000000});
        // Do something with the result or continue with more transactions.
    }).then(function(response) {
        console.log(response);
        return deployed.getOrderLength.call();
    }).then(function(response) {
        console.log(response.toNumber());
        //return instance.getOrderLength.call();
    });

    res.json({balance: 0, coinbase: 1});
});

router.get('/:id', function (req, res) {
    res.send('dummy');
});

module.exports = router;