//object in our application to create an account model.

class Account {
    constructor() {
      this.addresses = [];
      this.balance = {};
    }
  
    initialize(address) {
      if (this.balance[address] == undefined) {
        this.balance[address] = 0;
        this.addresses.push(address);
      }
    }
  
    // utilizes the increment and decrement functions to emulate transfer of value
    transfer(from, to, amount) {
      this.initialize(from);
      this.initialize(to);
      this.increment(to, amount);
      this.decrement(from, amount);
    }
  
    increment(to, amount) {
      this.balance[to] += amount;
    }
  
    decrement(from, amount) {
      this.balance[from] -= amount;
    }
  
    //returns the value of a given key. 
    getBalance(address) {
      this.initialize(address);
      return this.balance[address];
    }
  
    update(transaction) {
      let amount = transaction.output.amount;
      let from = transaction.input.from;
      let to = transaction.output.to;
      this.transfer(from, to, amount);
    }

    //ends the fee from the sender to the leader of the block.
    transferFee(block, transaction) {
        let amount = transaction.output.fee;
        let from = transaction.input.from;
        let to = block.validator;
        this.transfer(from, to, amount);
      }
  
  }
  
  module.exports = Account;