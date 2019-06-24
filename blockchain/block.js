//Import the sha-256 function from module crypto-js
const SHA256 = require('crypto-js/sha256');

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

    //This function will create a new block with dummy values.
    //Static because we don't want to create an instance to call this fct
    static genesis() {
        return new this(`genesis time`, "----", "genesis-hash", []);
    }


    static hash(timestamp,lastHash,data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    //Arguments are :
    //  the lastBlock, 
    //  the data
    // based on these two items it generates a new block
    static createBlock(lastBlock, data) {
        let hash;
        let timestamp = Date.now();
        const lastHash = lastBlock.hash;
        hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data);
    }

    //find the hash of the block, given the block instance. 
    static blockHash(block){
        //destructuring
        const { timestamp, lastHash, data } = block;
        return Block.hash(timestamp,lastHash,data);
    }

    //tells if the chain is valid or not
    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
            return false;

        //we recompute the hash of each block and compare it with the given hash of the block
        for(let i = 1 ; i<chain.length; i++){
            const block = chain[i];
            const lastBlock = chain[i-1];
            if((block.lastHash !== lastBlock.hash) || (
                block.hash !== Block.blockHash(block)))
            return false;
        }

        return true;

    }
}
