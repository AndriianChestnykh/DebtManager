'use strict';

var helper = require('../helpers/helper');
var express = require('express');
var router = express.Router();
var funcs = require('./order_funcs');

/**
 * Get all orders
 */
router.get('/all', function (req,res){
    console.log('# Get order');
    funcs.getAllOrders(function(response){
        res.send(response);
    });
});

/**
 * Get all orders
 */
router.get('/getorderlength', function (req,res){
    console.log('# Get order');
    funcs.getOrderLength(function(response){
        res.send(response);
    });
});

/**
 * Get orders
 */
router.get('/:id', function (req,res){
    console.log('# Get order');
    funcs.getOrderById(req.params.id, function(response){
        res.send(response);
    });
});


/**
 * Create order
 */
router.put('/', function (req, res) {

    console.log('# Create order');

    var details = req.body.details;
    if (!details) {
        res.json(helper.getErrorMessage('details'));
        return;
    }
    var moneyHolderAccount = req.body.moneyHolderAccount;
    if (!moneyHolderAccount) {
        res.json(helper.getErrorMessage('moneyHolderAccount'));
        return;
    }

    funcs.createOrder(req,res);

});


/**
 * Finalize order
 */
router.post('/:id/finalize', function (req, res) {

    console.log('# Finalize order');

    var id = helper.parsePositiveInt(req.params.id);
    if (!id) {
        res.json(helper.getErrorMessage('id'));
        return;
    }

    funcs.finalizeOrderById(req,res);
});


/**
 * Get orders by companyId
 */
router.get('/filter/byCompanyId/:companyId', function (req, res) {

    console.log('# Get orders by companyId');

    var companyId = req.params.companyId;
    if (!companyId) {
        res.json(helper.getErrorMessage('companyId'));
        return;
    }

    funcs.getAllOrdersByCompanyId(function(response){
        res.send(response);
    })
});

module.exports = router;
