'use strict';

var config = require('../config.json')
var helper = require('../helpers/helper');
var contractArtifact = require('../build/contracts/DebtManager.json');
var Web3 = require('web3');
var web3 = new Web3();

var account = config.account;

var contract = require("truffle-contract");
var DebtManager = contract(contractArtifact);

var provider = new Web3.providers.HttpProvider(config.peerurl);
web3 = new Web3(provider);
DebtManager.setProvider(provider);
var deployed;

/**
 * This is an example how to move route handler out of endpoint definition
 *
 * **/

function createOrder(req, res) {
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

function getOrderLength() {
    var deployed;
    return DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;
            return deployed.getOrderLength.call();
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            return response;
        });
}

function getOrderById(id) {
    var deployed;
    return DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;
            return deployed.getOrderById.call(id);
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            //var parsedData = JSON.parse(response);
            return {
                id: response[0].toNumber(),
                details: response[1],
                moneyHolderAccount: response[2],
                isFinalized: response[3],
                owner: response[4],
                moneyHolderName:config.companyName[response[2]]
            };
        });
}

function getAllOrders(callback) {
    var p = [];
    getOrderLength().then(orderLength => {
        for (var i = 0; i < orderLength; i++) {
            var a = getOrderById(i);
            p.push(a);
        }
        Promise.all(p).then(values => {
            callback(values);
        });
    });
}

function getAllOrdersByCompanyId(callback) {
    var p = [];
    getOrderLength().then(orderLength => {
        for (var i = 0; i < orderLength; i++) {
            var a = getOrderById(i);
            p.push(a);
        }
        Promise.all(p).then(values => {
            // TODO: remove orders by other companies
            callback(values);
        });
    });
}

function finalizeOrderById(req, res) {
    var deployed;
    DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;

            return deployed.finalizeOrderById(req.params.id, {from: account, gas: 1000000});
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            res.send(response);
        });
}

module.exports = {
    createOrder: createOrder,
    getOrderById: getOrderById,
    finalizeOrderById: finalizeOrderById,
    getAllOrders: getAllOrders,
    getOrderLength: getOrderLength,
    getAllOrdersByCompanyId: getAllOrdersByCompanyId
};