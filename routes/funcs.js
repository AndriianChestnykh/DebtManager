'use strict';

var contractArtifact = require('../build/contracts/DebtManager.json');
var Web3 = require('web3');
var web3 = new Web3();

var account = '0xed9d02e382b34818e88b88a309c7fe71e65f419d';

var contract = require("truffle-contract");
var DebtManager = contract(contractArtifact);

var provider = new Web3.providers.HttpProvider("http://13.93.217.3:22000");
web3 = new Web3(provider);
DebtManager.setProvider(provider);
var deployed;

/**
 * This is an example how to move route handler out of endpoint definition
 *
 * **/

function createOrder (req, res) {
    var deployed;
    DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;
            return deployed.createOrder(req.body.details, req.body.moneyHolderAccount, {from: account, gas: 1000000});
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            return deployed.getOrderLength.call();
        })
        .then(function (response) {
            res.send({orderid: response.toNumber()});
        });
}

function getOrderById (req, res) {
    var deployed;
    DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;
            return deployed.getOrderById.call(req.params.id);
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            res.send(response);
        });
}

function finalizeOrderById (req, res) {
    var deployed;
    DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;

            // TODO: replace this. fetch order and set isFinalized to true
            var order = {
                id: id,
                details: "Radeon RX470 - 100 pcs",
                moneyHolderAccount: "0x1234567890",
                isFinalized: true,
                owner: "0x2345678901"
            };

            return order;
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            res.send(response);
        });
}

module.exports = {
    createOrder: createOrder,
    getOrderById: getOrderById,
    finalizeOrderById: finalizeOrderById
};