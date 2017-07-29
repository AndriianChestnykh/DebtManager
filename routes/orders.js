'use strict';

var helper = require('../helpers/helper');
var express = require('express');
var router = express.Router();
var funcs = require('./funcs');

/**
 * Get orders
 */
router.get('/:id', function (req,res){
    funcs.getOrderById(req.params.id, function(id){
        res.send(id);
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
 * Get order
 */
router.get('/:id', function (req, res) {

    console.log('# Get order');
    funcs.getOrderById(req.params.id);
    
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

    // TODO: replace this. fetch orders by companyId
    var orders = [
        {
            id: 1,
            details: "Radeon RX470 - 100 pcs",
            moneyHolderAccount: "0x1234567890",
            isFinalized: false,
            owner: "0x2345678901"
        }
    ];

    res.json({success: true, orders: orders});
});

module.exports = router;
