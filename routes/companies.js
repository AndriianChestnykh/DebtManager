'use strict';

var helper = require('../helpers/helper');
var express = require('express');
var router = express.Router();
var funcs = require('./companies_funcs');


/**
 * Get all companies
 */
router.get('/all', function (req,res){
    console.log('# Get all companies');
    funcs.getAllCompanies(function(response){
        res.send(response);
    });
});

module.exports = router;