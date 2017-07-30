var express = require('express');
var router = express.Router();
var config = require('../config.json')

var debtsFunc = require('./debt_funcs.js');
var orderFunc = require('./order_funcs.js');


var companyAccount = config.account;

/* GET home page. */
router.get('/', function (req, res, next) {

    console.log("Init index");

    var orderList = [];

    //Get all company debts
    debtsFunc.getAllDebts(function (allDebts) {
        //filter only company debts

        var myDebts = [];

        console.log("Debts");
        console.log(myDebts);


        allDebts.forEach(function (debt, index, object) {

            if (debt.companyaccount === companyAccount) {
                myDebts.push(debt);
            }
        });


        //Get all orders

        orderFunc.getAllOrdersByCompanyId(function (orders) {

            console.log("Orders");
            console.log(orders);


            var myOrders = [];

            // Filter orders
            orders.forEach(function (order, index, object) {
                for (var myDebt of myDebts) {
                    if (myDebt.orderid === order.id) {
                        myOrders.push(order);
                        break;
                    }
                }
            });

            var debtsByCompany = {};

            myOrders.forEach(function (order, index, object) {
                for (var allDebtItem of allDebts) {

                    if (allDebtItem.orderid === order.id) {
                        if (typeof debtsByCompany[allDebtItem.companyaccount] === "undefined") {
                            debtsByCompany[allDebtItem.companyaccount] = 0;
                        }
                        if (order.moneyHolderAccount === companyAccount && allDebtItem.companyaccount !== companyAccount) {
                            debtsByCompany[allDebtItem.companyaccount] += allDebtItem.amount;
                        }
                        if (order.moneyHolderAccount !== companyAccount && allDebtItem.companyaccount === companyAccount) {
                            debtsByCompany[allDebtItem.companyaccount] -= allDebtItem.amount;
                        }
                    }
                }
            });

            orderList = orders;

            console.log("Final list");
            console.log(orderList);

            var debtList = [];
            var i = 1;

            for (var key in debtsByCompany) {
                debtList.push([
                    i,
                    i,
                    key,
                    debtsByCompany[key],
                    true
                ]);
                i++;
            }

            //var debtList = [[ 2, 3, "0xbbb", 10, true],[4, 5, "0xbbb1111", 20, true]];

            res.render('index', {
                companyId: companyAccount,
                currentDebt: 1000,
                orderList: orderList,
                debtList: debtList
            });


        });


    });


    //var oList = [[1,"Det","0xtest", true, "0xtet" ],["1", "test","0xed9d02e382b34818e88b88a309c7fe71e65f419d", false, "0xed9d02e382b34818e88b88a309c7fe71e65f419d"]];


});

module.exports = router;
