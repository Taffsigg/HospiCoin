//The transaction-pool will be an object updated in real time that contains all the new transactions submitted by all miners in the network.
const Transaction = require("./transaction");
const { TRANSACTION_THRESHOLD } = require("../config");

class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    // push transactions in the list
    //RETURN TRUE WHEN HIT THRESHOLD
    addTransaction(transaction) {
        this.transactions.push(transaction);
        if (this.transactions.length >= TRANSACTION_THRESHOLD) {
            return true;
        } else {
            return false;
        }
    }

    validTransactions() {
        return this.transactions.filter(transaction => {
            if (!Transaction.verifyTransaction(transaction)) {
                console.log(`Invalid signature from ${transaction.data.from}`);
                return;
            }
    
        return transaction;
        });
    }

    transactionExists(transaction) {
        let exists = this.transactions.find(t => t.id === transaction.id);
        return exists;
    }
}
module.exports = TransactionPool;