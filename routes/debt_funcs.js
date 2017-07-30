'use strict';

var config = require('../configs/config.json');
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

function createDebt (req, res) {
    var deployed;
    DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;
            return deployed.createDebt(req.body.orderId, req.body.companyAccount, req.body.amount, {from: account, gas: 1000000});
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            return deployed.getDebtLength.call();
        })
        .then(function (response) {
            res.send({debtid: response.toNumber()});
        });
};

function getDebtLength(callback){
    var deployed;
    DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;
            return deployed.getDebtLength.call();
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            callback(response);
        });
};

function getDebtById(id, callback) {
    var deployed;
    DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;
            return deployed.getDebtById.call(id);
            // Do something with the result or continue with more transactions.
        })
        .then(function (response) {
            //var parsedData = JSON.parse(response);
            var a = {
                id: response[0],
                orderid: response[1],
                companyaccount: response[2],
                amount: response[3],
                isagreed: response[4]
            }  
            callback(a);
        });
};

function getDebtByOrderId(id, callback) {

    var p = [];
    getDebtLength(function(length){
    for (var i=0; i<length; i++){
        var a = new Promise((resolve, reject) => {
            getDebtById(i, function(response){
                if (response.orderid == id){
                    resolve(response);
                }else{
                    resolve(null);
                }
            });
        });
        p.push(a);
    }

    Promise.all(p).then(values => {

        values.forEach(function(item, index, object){
            if (item === null) {
                object.splice(index, 1);
            }
        });

        console.log(values);
        callback(values); 
    });
    });

};

function getAllDebts(callback) {

    var p = [];
    getDebtLength(function(length){
    for (var i=0; i<length; i++){
        var a = new Promise((resolve, reject) => {
            getDebtById(i, function(response){
                resolve(response);
            });
        });
        p.push(a);
    }
    Promise.all(p).then(values => { 
        callback(values); 
    });
    }
);
};

function confirmDebt (req, res) {
    var deployed;
    DebtManager.deployed()
        .then(function (instance) {
            deployed = instance;

            return deployed.confirmDebt(req.params.id, {from: account, gas: 1000000});;
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
    getDebtByOrderId:getDebtByOrderId
};