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

