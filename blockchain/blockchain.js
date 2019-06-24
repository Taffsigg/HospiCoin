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

