//need an instance of the blockchain in this API to send and receive block data.
const Blockchain = require('../blockchain');
const blockchain = new Blockchain();
const express = require('express');
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

//EXPOSED APIs

//api to get the blocks
app.get('/blocks',(req,res)=>{

    res.json(blockchain.chain);

});

//api to add blocks
app.post('/mine',(req,res)=>{
    const block = blockchain.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    res.redirect('/blocks');
});

// app server configurations
app.listen(HTTP_PORT,()=>{
    console.log(`listening on port ${HTTP_PORT}`);
})
