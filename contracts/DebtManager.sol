pragma solidity ^0.4.0;


contract DebtManager {

    //Company address | name, by company address we will have a name and can chack that company exist
    mapping(address => string) public companies;

    struct Order{
    uint id;
    string details;
    address validator; // TODO:Name ??

    address owner;
    }

    struct Debt{

    uint id;
    uint orderId;

    address companyAdd;
    uint amount;
    bool sign;
    }

    uint debtId; // auto increment unique id
    uint orderId; // auto increment unique id


    Order[] orderArr; // array of orders
    Debt[] debtArr;



    //---------------------------------------------------
    // Functions

    //Constructor
    function DebtManager() {

        //TODO: predefine data
    }



    //Create
    function createOrder(string details) returns(uint) {
        orderArr.push(Order(++orderId, details, msg.sender, msg.sender));

        return orderId;
    }

    function createDebt(uint oderId, address companyAddress, uint amount) returns(uint){
        //TODO: check if company in a company list

        //TODO: check if order id in the order list, probably with order index or just with index if we do not delete orders

        debtArr.push(Debt(++debtId, orderId, companyAddress, amount, false));

        return debtId;
    }


    //Update

    function signDebt(uint debtId){

        var debt = debtArr[debtId];

        if(debt.companyAdd == msg.sender){
            debt.sign = true;
        }
    }

    //Get constant

    function getOrderLenght() constant returns(uint){
        return orderId;
    }

    function getDebtLenght() constant returns(uint){
        return debtId;
    }

    function getOrderById(uint orderId) constant returns( uint id,
    string details,
    address validator,
    address owner){

        Order order = orderArr[orderId];

        return(order.id, order.details, order.validator, order.owner);

    }

    function getDebtById(uint debtId) constant returns(
    uint id,
    uint orderId,
    address companyAdd,
    uint amount,
    bool sign){

        Debt debt = debtArr[debtId];

        return (debt.id, debt.orderId, debt.companyAdd, debt.amount, debt.sign);
    }

}