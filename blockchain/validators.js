/*Validator nodes are different from normal nodes in PoS. 
Validator nodes can add stake, be elected as leader and create 
blocks. But not all nodes can be a validator. Only those nodes 
that send a special transaction which contains a validator fee 
can become a validator. The fee or coins are later burnt and are 
not used*/

class Validators {
    constructor() {
        this.list = [];
    }
  
    //adds the address to the list if the conditions match.
    update(transaction) {
        //The fee can be any integer, here 30
        if (transaction.amount == 30 && transaction.to == "0") {
            this.list.push(transaction.from);
            return true;
        }
        return false;
    }
}
  