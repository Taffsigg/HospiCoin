// import the block class
const Block = require('./block');

class Blockchain{
    //give an initial block to the chain
    constructor(){
        this.chain = [Block.genesis()];
    }

    //ability to add more blocks to the chain
    addBlock(data){
        //create a new block
        const block = Block.createBlock(this.chain[this.chain.length-1],data);
        //pushing it to the chain
        this.chain.push(block);
    return block;
    }
}

module.exports = Blockchain;

