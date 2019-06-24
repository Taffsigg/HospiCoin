// import the block class
const Block = require('./block');

class Blockchain{
    //give an initial block to the chain
    constructor(){
        this.chain = [Block.genesis()];
    }

    //ability to add more blocks to the chain
    addBlock(data){
        const block = Block.createBlock(this.chain[this.chain.length-1],data);
        this.chain.push(block);
    return block;
    }
}

module.exports = Blockchain;

