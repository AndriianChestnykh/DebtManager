'use strict';

var helper = require('../helpers/helper');
var express = require('express');
var router = express.Router();

var contractArtifact = require('../build/contracts/DebtManager.json');
var Web3 = require('web3');
var web3 = new Web3();

var account = '0x7f786d3f183ff6f9c6a97f69921414a14b2f7dbb';

var contract = require("truffle-contract");
var DebtManager = contract(contractArtifact);

/**
 * Get debts
 */
router.get('/', function (req, res) {

    //console.log(DebtManager);

   var provider = new Web3.providers.HttpProvider("http://localhost:8545");

    web3 = new Web3(provider);

    DebtManager.setProvider(provider);

    DebtManager.deployed().then(function(instance) {

        //console.log(instance);

//        return instance.getOrderLength();
        return instance.createOrder('test', account, {from: account, gas: 1000000});

        // Do something with the result or continue with more transactions.
    }).then(function(response) {
        console.log(response.toString());
    });




    // var coinbase = web3.eth.coinbase;
    // var balance = web3.eth.getBalance(account);
    //
    // var abi = web3.eth.contract(contractArtifact.abi);
    //
    // web3.eth.sendTransaction({data: code}, function(err, transactionHash) {
    // if (!err)
    //     console.log(transactionHash); // "0x7f9fade1c0d57a7af66ab4ead7c2eb7b11a91385"
    // });
    //
    res.json({balance: 0, coinbase: 1});
});



module.exports = router;