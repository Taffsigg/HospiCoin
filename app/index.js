//need an instance of the blockchain in this API to send and receive block data.
const Blockchain = require('../blockchain/blockchain');
const express = require('express');
const bodyParser = require("body-parser");
const P2pServer = require('./p2p-server.js');


/*
We will have multiple users running our app. To test this app on our
own machine we need to run the app on a different port each time we
run a new instance. Hence we must provide a new port every time we 
run a new app.

We will do this using the environment variables. We can pass the port
from the terminal and assign it to the port on which we run our app. 
By default, we will run our app on port 3000.*/

const HTTP_PORT = process.env.HTTP_PORT || 3001;

//create a new app
const app  = express();

//using the blody parser middleware
app.use(bodyParser.json());

// create a new blockchain instance
const blockchain = new Blockchain();



//reate a wallet instance
const Wallet = require('../wallet/wallet');

//transactionPool instance.
const TransactionPool = require('../wallet/transaction-pool');



// create a new wallet
const wallet = new Wallet(Date.now().toString());

// Date.now() is used create a random string for secret
// create a new transaction pool which will be later
// decentralized and synchronized using the peer to peer server
const transactionPool = new TransactionPool();

// passing blockchain AND transactionPool as a dependency
const p2pserver = new P2pServer(blockchain,transactionPool);

//EXPOSED APIs

//api to get the blocks (send it to the user)
app.get('/blocks',(req,res)=>{

    res.json(blockchain.chain);

});

//api to add blocks (sends data in the request to create new block)
app.post('/mine',(req,res)=>{
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
    //When we want to add a block, we sync the chain
    p2pserver.syncChain();
});

// app server configurations
app.listen(HTTP_PORT,()=>{
    console.log(`listening on port ${HTTP_PORT}`);
});

// api to view transaction in the transaction pool
app.get('/transactions',(req,res)=>{
    res.json(transactionPool.transactions);
});

// create transactions
app.post("/transact", (req, res) => {
    const { to, amount, type } = req.body;
    const transaction = wallet.createTransaction(
       to, 
       amount, 
       type, blockchain, 
       transactionPool
    );
    // broadcast transaction
    p2pserver.broadcastTransaction(transaction);
    res.redirect("/transactions");
});

p2pserver.listen(); // starts the p2pserver

