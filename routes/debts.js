'use strict';

var helper = require('../helpers/helper');
var express = require('express');
var router = express.Router();
var funcs = require('./debt_funcs');


/**
 * Get all orders
 */
router.get('/all', function (req,res){
    console.log('# Get all debts');
    funcs.getAllDebts(function(response){
        res.send(response);
    });
});



/**
 * Get debts by order id
 */
router.get('/filter/byOrderId/:id', function (req,res){
    console.log('# Get order');
    funcs.getDebtByOrderId(req.params.id, function(response){
        res.send(response);
    });
});


/**
 * Get debt length
 */
router.get('/getdebtlength', function (req,res){
    console.log('# Debt length');
    funcs.getDebtLength(function(response){
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
    funcs.createDebt(req,res);
});

/**
 * Get debt
 */
router.get('/:id', function (req, res) {

    console.log('# Get debt');
    funcs.getDebtById(req.params.id, function(response){
        res.send(response);
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

/**
 * Get debts by orderId
 */
router.get('/filter/byOrderId/:orderId', function (req, res) {

    console.log('# Get debts by orderId');

    var orderId = helper.parsePositiveInt(req.params.orderId);
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
