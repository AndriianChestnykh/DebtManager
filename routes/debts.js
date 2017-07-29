'use strict';

var helper = require('../helpers/helper');
var express = require('express');
var router = express.Router();

/**
 * Get debts
 */
router.get('/', function (req, res) {

    // TODO: replace this. get debts from contract
    var debts = [
        {
            id: 1,
            orderId: 1,
            companyAccount: "0x1234567890",
            amount: 1200,
            isAgreed: false
        },
        {
            id: 2,
            orderId: 1,
            companyAccount: "0x2345678901",
            amount: 800,
            isAgreed: false
        }
    ];

    res.json({success: true, debts: debts});
});

/**
 * Create debt
 */
router.put('/', function (req, res) {

    console.log('# Create debt');

    var orderId = req.body.orderId;
    if (!orderId) {
        res.json(helper.getErrorMessage('orderId'));
        return;
    }
    var companyAccount = req.body.companyAccount;
    if (!companyAccount) {
        res.json(helper.getErrorMessage('companyAccount'));
        return;
    }
    var amount = req.body.amount;
    if (!amount) {
        res.json(helper.getErrorMessage('amount'));
        return;
    }

    var debt = {
        id: null,
        orderId: orderId,
        companyAccount: companyAccount,
        amount: amount,
        isAgreed: false
    };

    // TODO: replace this. save debt and add id
    debt.id = Math.floor(Math.random() * 1000);

    res.json({success: true, debt: debt});
});


/**
 * Get debt
 */
router.get('/:id', function (req, res) {

    console.log('# Get debt');

    var id = req.params.id;
    if (!id) {
        res.json(helper.getErrorMessage('id'));
        return;
    }

    // TODO: replace this. fetch debt
    var debt = {
        id: id,
        orderId: 1,
        companyAccount: "0x1234567890",
        amount: 1200,
        isAgreed: false
    };

    res.json({success: true, debt: debt});
});

/**
 * Agree on debt
 */
router.post('/:id/agree', function (req, res) {

    console.log('# Agree on debt');

    var id = req.params.id;
    if (!id) {
        res.json(helper.getErrorMessage('id'));
        return;
    }

    // TODO: replace this. fetch debt and set isAgreed to true
    var debt = {
        id: id,
        orderId: 1,
        companyAccount: "0x1234567890",
        amount: 1200,
        isAgreed: true
    };

    res.json({success: true, debt: debt});
});

/**
 * Get debts by orderId
 */
router.get('/filter/byOrderId/:orderId', function (req, res) {

    console.log('# Get debts by orderId');

    var orderId = req.params.orderId;
    if (!orderId) {
        res.json(helper.getErrorMessage('orderId'));
        return;
    }

    // TODO: replace this. fetch debts by orderId
    var debts = [
        {
            id: 1,
            orderId: 1,
            companyAccount: "0x1234567890",
            amount: 1200,
            isAgreed: false
        }
    ];

    res.json({success: true, debts: debts});
});

module.exports = router;
