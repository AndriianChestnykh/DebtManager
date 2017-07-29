'use strict';

var helper = require('../helpers/helper');
var express = require('express');
var router = express.Router();

/**
 * Get orders
 */
router.get('/', function (req, res) {

    // TODO: replace this. get orders from contract
    var orders = [
        {
            id: 1,
            details: "Radeon RX470 - 100 pcs",
            moneyHolderAccount: "0x1234567890",
            isFinalized: false,
            owner: "0x2345678901"
        },
        {
            id: 2,
            details: "Bitfury BlockBox - 1 pcs",
            moneyHolderAccount: "0x2345678901",
            isFinalized: false,
            owner: "0x2345678901"
        }
    ];

    res.json({success: true, orders: orders});
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
    var owner = req.body.owner;
    if (!owner) {
        res.json(helper.getErrorMessage('owner'));
        return;
    }

    var order = {
        id: null,
        details: details,
        moneyHolderAccount: moneyHolderAccount,
        isFinalized: false,
        owner: owner
    };

    // TODO: replace this. save order and add id
    order.id = Math.floor(Math.random() * 1000);

    res.json({success: true, order: order});
});


/**
 * Get order
 */
router.get('/:id', function (req, res) {

    console.log('# Get order');

    var id = req.params.id;
    if (!id) {
        res.json(helper.getErrorMessage('id'));
        return;
    }

    // TODO: replace this. fetch order
    var order = {
        id: id,
        details: "Radeon RX470 - 100 pcs",
        moneyHolderAccount: "0x1234567890",
        isFinalized: false,
        owner: "0x2345678901"
    };

    res.json({success: true, order: order});
});

/**
 * Finalize order
 */
router.post('/:id/finalize', function (req, res) {

    console.log('# Finalize order');

    var id = req.params.id;
    if (!id) {
        res.json(helper.getErrorMessage('id'));
        return;
    }

    // TODO: replace this. fetch order and set isFinalized to true
    var order = {
        id: id,
        details: "Radeon RX470 - 100 pcs",
        moneyHolderAccount: "0x1234567890",
        isFinalized: true,
        owner: "0x2345678901"
    };

    res.json({success: true, order: order});
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
