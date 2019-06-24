class Block {
    constructor(timestamp, lastHash, hash, data, validator, signature) {
        //the time of creation of block in milliseconds
        this.timestamp = timestamp;
        //hash of the last block on the chain
        this.lastHash = lastHash;
        //hash of the current block
        this.hash = hash;
        //data in the block or the transactions
        this.data = data;
        //the address of the guy/gal whose made this block
        this.validator = validator;
        //the encrypted hash of the block, signed by the validator
        this.signature = signature;
    }
  
    //print the details of the block in a readable format.
    toString() {
        return `Block - 
            Timestamp : ${this.timestamp}
            Last Hash : ${this.lastHash}
            Hash      : ${this.hash}
            Data      : ${this.data}
            Validator : ${this.validator}
            Signature : ${this.signature}`;
        }
  }