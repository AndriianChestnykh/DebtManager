
function getDebtsByOrderId(orderId) {

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
                    var checked= "<i class=\"fa fa-times text-danger\"></i>"
                }

                var newtr = "<tr><td>"+item.id+"</td><td>"+item.orderid+"</td><td>"+item.companyName+"</td><td>"+item.amount+"</td><td>"+checked+"</td></tr>";

                $("#popup").find('tbody').append(newtr);
            })
        }
    });
}