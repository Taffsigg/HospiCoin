class Transaction {
    constructor() {
      this.id = ChainUtil.id();
      this.type = null;
      this.input = null;
      this.output = null;
    }

    //take the sender’s wallet’s instance, the amount to send and the recipient's address.
    static newTransaction(senderWallet, to, amount, type) {
        //if the sender has not enough balance
        if (amount + TRANSACTION_FEE > senderWallet.balance) {
            console.log('Not enough balance');
            return;
        }
    
        //create a transaction object
        return Transaction.generateTransaction(senderWallet, to, amount, type);
        }
    
        static generateTransaction(senderWallet, to, amount, type) {
            const transaction = new this();
            transaction.type = type;
            transaction.output = {
                to: to,
                amount: amount - TRANSACTION_FEE,
                fee: TRANSACTION_FEE
            };
        return transaction;
    }
}
  
module.exports = Transaction;