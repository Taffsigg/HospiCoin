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

    //we must replace our chain with the new longer chain.
    replaceChain(newChain){
        if(newChain.length <= this.chain.length){
            console.log("Received chain is not longer than the current chain");
            return;
        }else if(!this.isValidChain(newChain)){
            console.log("Received chain is invalid");
            return;
        }
        
        //Assign new chain of the current BC object to new chain received as arg
        console.log("Replacing the current chain with new chain");
        this.chain = newChain; 
    }
}

module.exports = Blockchain;

