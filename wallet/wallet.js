// wallet.js
const Transaction = require("./transaction");
const ChainUtil = require("../chain-util");

class Wallet {
    constructor(secret) {
      //this.balance = 0;
      this.keyPair = ChainUtil.genKeyPair(secret);
      this.publicKey = this.keyPair.getPublic("hex");
      this.balance = 100
    }
  
    toString() {
      return `Wallet - 
          publicKey: ${this.publicKey.toString()}
          balance  : ${this.balance}`;
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash).toHex();
    }

    //wallet is responsible for creating a transaction
    createTransaction(to, amount, type, blockchain, transactionPool) {
        let transaction = Transaction.newTransaction(this, to, amount,                                                                                                    type);
        transactionPool.addTransaction(transaction);
        return transaction;
    }
}

module.exports = Wallet;