class Wallet {
    constructor(secret) {
      this.balance = 0;
      this.keyPair = ChainUtil.genKeyPair(secret);
      this.publicKey = this.keyPair.getPublic("hex");
    }
  
    toString() {
      return `Wallet - 
          publicKey: ${this.publicKey.toString()}
          balance  : ${this.balance}`;
    }
  }