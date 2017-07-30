function showDebtsByOrderId(orderId) {

    console.log(orderId);
    //Clear data table
    $('#popup').find('tbody').empty();

    $.ajax({
        url: "debts/filter/byOrderId/"+orderId,
        success: function( result ) {
            console.log(result);

            result.forEach(function(item){

                if(item.isagreed){
                    var checked= "<i class=\"fa fa-check\"></i>"
                }else{

                    if(companyId === item.companyaccount){
                        var checked = "<button class=\"btn btn-link\" onclick=\"check("+item.id+")\" type=\"button\" data-toggle=\"modal\"><i class=\"fa fa-check\"></i>Check</button>";
                    }else {
                        var checked = "<i class=\"fa fa-times text-danger\"></i>";
                    }
                }

                var newtr = "<tr><td>"+item.id+"</td><td>"+item.orderid+"</td><td>"+item.companyName+"</td><td>"+item.amount+"</td><td>"+checked+"</td></tr>";

                $("#popup").find('tbody').append(newtr);
            })
        }
    });
}

function showDebts(orders, debtsByOrders) {
    // TODO: update table with debts
    console.log(orders, debtsByOrders);
}

function check(id){

    $.ajax({
        type: "POST",
        url: "debts/"+id+"/agree",
        success: function (result) {
            console.log(result);
            $("#details").hide();
        }
    });
}

function getURL(url) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            success: function (result) {
                console.log(result);
                resolve(result);
            },
            error: function () {
                reject();
            }
        });
    });
}

function getAllOrders() {
    return getURL("/orders/all");
}

function getDebtsByOrderId(orderId) {
    return getURL("/debts/filter/byOrderId/" + orderId);
}

function updateDebtsTable() {
    getAllOrders().then(function (orders) {
        var p = [];
        orders.forEach(function(order) {
            p.push(getDebtsByOrderId(order.id));
        });
        return Promise.all(p).then(debtsByOrders => {
            showDebts(orders, debtsByOrders);
        });
    });
}

$(document).ready(function () {
    updateDebtsTable();
});