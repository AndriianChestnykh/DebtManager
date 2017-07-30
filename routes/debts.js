'use strict';

var helper = require('../helpers/helper');
var express = require('express');
var router = express.Router();
var funcs = require('./debt_funcs');


/**
 * Get all orders
 */
router.get('/all', function (req, res) {
    console.log('# Get all debts');
    funcs.getAllDebts(function (response) {
        res.send(response);
    });
});


/**
 * Get debts by order id
 */
router.get('/filter/byOrderId/:orderId', function (req, res) {
    console.log('# Get debts by order id');
    funcs.getDebtByOrderId(req.params.orderId, function (response) {
        res.send(response);
    });
});


/**
 * Get debt length
 */
router.get('/getdebtlength', function (req, res) {
    console.log('# Debt length');
    funcs.getDebtLength().then(response => {
        res.send(response);
    });
});

/**
 * Create debt
 */
router.put('/', function (req, res) {

    console.log('# Create debt');

    var orderId = helper.parsePositiveInt(req.body.orderId);
    if (!orderId) {
        res.json(helper.getErrorMessage('orderId'));
        return;
    }
    var companyAccount = req.body.companyAccount;
    if (!companyAccount) {
        res.json(helper.getErrorMessage('companyAccount'));
        return;
    }
    var amount = helper.parsePositiveInt(req.body.amount);
    if (!amount) {
        res.json(helper.getErrorMessage('amount'));
        return;
    }
    console.log(req);
    funcs.createDebt(req, res);
});

/**
 * Get debt
 */
router.get('/:id', function (req, res) {

    console.log('# Get debt');
    funcs.getDebtById(req.params.id).then(response => {
        res.send(response);
    }, error => {
        res.status(404).json({success: false});
    });
});


/**
 * Agree on debt
 */
router.post('/:id/agree', function (req, res) {

    console.log('# Agree on debt');

    var id = helper.parsePositiveInt(req.params.id);
    if (!id) {
        res.json(helper.getErrorMessage('id'));
        return;
    }

    funcs.confirmDebt(req, res);

});

module.exports = router;
