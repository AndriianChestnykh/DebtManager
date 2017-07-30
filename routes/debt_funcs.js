'use strict';

var config = require('../config.json');
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

function createDebt(req, res) {
    var deployed;
    DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;
            return deployed.createDebt(req.body.orderId, req.body.companyAccount, req.body.amount, req.body.moneyHolder, {
                from: account,
                gas: 1000000
            });
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            return deployed.getDebtLength.call();
        })
        .then(function (response) {
            res.send({debtid: response.toNumber()});
        });
}

function getDebtLength() {
    var deployed;
    return DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;
            return deployed.getDebtLength.call();
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            return response;
        });
}

function getDebtById(id) {
    var deployed;
    return DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;
            return deployed.getDebtById.call(id);
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            //var parsedData = JSON.parse(response);
            if (response[2] === '0x') {
                throw new Error('Not found');
            }
            return {
                id: response[0].toNumber(),
                orderid: response[1].toNumber(),
                companyaccount: response[2],
                amount: response[3].toNumber(),
                isagreed: response[4],
                isFinalized: response[5],
                companyName: config.companyName[response[2]]
            };
        });
}

function getDebtByOrderId(id, callback) {
    var p = [];
    getDebtLength().then((length) => {
        for (var i = 0; i < length; i++) {
            var a = getDebtById(i);
            p.push(a);
        }

        Promise.all(p).then(values => {
            var filtered = [];
            values.forEach(function (item, index, object) {
                if (item && item.orderid == id) {
                    filtered.push(item);
                }
            });

            console.log(filtered);
            callback(filtered);
        });
    });

}

function getAllDebts(callback) {
    var p = [];
    return getDebtLength().then((length) => {
        for (var i = 0; i < length; i++) {
            var a = getDebtById(i);
            p.push(a);
        }

        Promise.all(p).then(values => {
            callback(values);
        });
    });
}

function confirmDebt(req, res) {
    var deployed;
    DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;

            return deployed.confirmDebt(req.params.id, {from: account, gas: 1000000});
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            res.send(response);
        });
}

module.exports = {
    createDebt: createDebt,
    getDebtById: getDebtById,
    confirmDebt: confirmDebt,
    getAllDebts: getAllDebts,
    getDebtLength: getDebtLength,
    getDebtByOrderId: getDebtByOrderId
};