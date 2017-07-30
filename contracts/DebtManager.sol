pragma solidity ^0.4.0;


contract DebtManager {

    //Company address | name, by company address we will have a name and can chack that company exist
    mapping(address => string) public companies;

    struct Order{
    uint id;
    string details;
    address moneyHolderAccount;
    bool isFinalized;
    address owner;

    }

    struct Debt{

    uint id;
    uint orderId;

    address companyAccount;
    uint amount;
    bool isAgreed;
    address moneyHolderAccount;
    }

    uint debtId; // auto increment unique id
    uint orderId; // auto increment unique id


    Order[] orderArr; // array of orders
    Debt[] debtArr;

    address constant address1 = 0xed9d02e382b34818e88b88a309c7fe71e65f419d;
    address constant address2 = 0xdf659674ad3d74f110e6f6904212cb2fb097ab97;
    address constant address3 = 0xa1be6a760c7ea15ff1fd9bbe4f9291bc34196aff;

    //---------------------------------------------------
    // Functions

    //Constructor
    function DebtManager() {
        companies[0] = 'Company A';
        companies[1] = 'Company B';
        companies[2] = 'Company C';

        //new order
        orderArr.push(Order(0, "in123897", address1, false, address1));
        orderArr.push(Order(1, "in123898", address1, false, address1));
        orderArr.push(Order(2, "in123899", address1, false, address1));


        orderArr.push(Order(3, "in223897", address2, false, address1));
        orderArr.push(Order(4, "in223898", address2, false, address1));
        orderArr.push(Order(5, "in223899", address2, false, address1));

        orderArr.push(Order(6, "in323897", address3, false, address3));
        orderArr.push(Order(7, "in323898", address3, false, address3));
        orderArr.push(Order(8, "in323899", address3, false, address3));

        orderId=9;

        //new debts

        debtArr.push(Debt(0, 0, address1, 100, false, address1));
        debtArr.push(Debt(1, 0, address2, 20, false, address1));
        debtArr.push(Debt(2, 0, address3, 10, false, address1));


        debtArr.push(Debt(3, 1, address1, 100, false, address2));
        debtArr.push(Debt(4, 1, address2, 20, false, address2));
        debtArr.push(Debt(5, 1, address3, 10, false, address2));

        debtArr.push(Debt(6, 2, address1, 100, false, address3));
        debtArr.push(Debt(7, 2, address2, 20, false, address3));
        debtArr.push(Debt(8, 2, address3, 10, false, address3));

        debtId=9;
    }


    //Create
    function createOrder(string details, address moneyHolderAccount) returns(uint) {
        orderArr.push(Order(orderId, details, moneyHolderAccount, false,msg.sender));

        uint id = orderId;
        orderId++;
        return id;
    }

    function createDebt(uint orderId, address companyAccountress, uint amount) returns(uint){
        //TODO: check if company in a company list

        //TODO: check if order id in the order list, probably with order index or just with index if we do not delete orders
        address holder = orderArr[orderId].moneyHolderAccount;

        // if(holder == 0){
        //     throw;
        // }

        debtArr.push(Debt(debtId, orderId, companyAccountress, amount, false, holder));

        uint id = debtId;
        debtId++;
        return id;
    }


    //Update

    function confirmDebt(uint debtId){

        var debt = debtArr[debtId];

        if(debt.companyAccount == msg.sender){
            debt.isAgreed = true;
        }
    }

    function finalizeOrderById(uint orderId) returns(bool){
        var order = orderArr[orderId];

        if(order.moneyHolderAccount == msg.sender){
            order.isFinalized = true;
            return true;
        }
        return false;
    }

    //Get constant

    function getOrderLength() constant returns(uint){
        return orderId;
    }

    function getDebtLength() constant returns(uint){
        return debtId;
    }

    function getOrderById(uint orderId) constant returns( uint id,
    string details,
    address moneyHolderAccount,
    bool isFinalized,
    address owner){

        Order order = orderArr[orderId];

        return(order.id, order.details, order.moneyHolderAccount, order.isFinalized, order.owner);

    }

    function getDebtById(uint debtId) constant returns(
    uint id,
    uint orderId,
    address companyAccount,
    uint amount,
    bool isAgreed,
    address moneyHolderAccount,
    bool isFinalized){

        Debt debt = debtArr[debtId];
        bool finalized = orderArr[debt.orderId].isFinalized;

        return (debt.id, debt.orderId, debt.companyAccount, debt.amount, debt.isAgreed, debt.moneyHolderAccount, finalized);
    }

}