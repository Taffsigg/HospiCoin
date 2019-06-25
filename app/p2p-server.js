//Import the ws module 
const WebSocket = require("ws");

//define a P2P_PORT for the server
const P2P_PORT = process.env.P2P_PORT || 5001;

//We need a list of peers which we will connect to when we start 
//the app.
//PEERS = ws://localhost:5002 P2P_PORT=5001 HTTP_PORT=3001 npm run dev
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []; 

const MESSAGE_TYPE = {
    chain: "CHAIN",
    block: "BLOCK",
    transaction: "TRANSACTION",
    clear_transactions: "CLEAR_TRANSACTIONS"
  };
  
//This class which will hold all the message handlers and event listeners.
class P2pserver{
    constructor(blockchain,transactionPool){
        // same blockchain that we use in our app.
        this.blockchain = blockchain;
        //list of sockets which it would be connected to at a given amount of time
        this.sockets = [];
        //We can add an instance of our transaction-pool in the p2p-server. 
        //This way our server can directly access the transactions.
        this.transactionPool = transactionPool;
    }

    // create a new p2p server and connections

    listen(){
        // create the p2p server with port as argument
        const server = new WebSocket.Server({ port: P2P_PORT });

        // event listener and a callback function for any new connection
        // on any new connection the current instance will send the current chain
        // to the newly connected peer
        server.on('connection',socket => this.connectSocket(socket));

        // to connect to the peers that we have specified
        this.connectToPeers();

        console.log(`Listening for peer to peer connection on port : ${P2P_PORT}`);
    }

    // after making connection to a socket
    connectSocket(socket){
        // push the socket too the socket array
        this.sockets.push(socket);
        console.log("Socket connected");
        // register a message event listener to the socket
        this.messageHandler(socket);
        this.sendChain(socket);
        // on new connection send the blockchain chain to the peer
        socket.send(JSON.stringify(this.blockchain));
    }

    connectToPeers(){

        //connect to each peer using peer list
        peers.forEach(peer => {

            // create a socket for each peer
            const socket = new WebSocket(peer);
            
            // open event listner is emitted when a connection is established
            // saving the socket in the array
            socket.on('open',() => this.connectSocket(socket));

        });
    }

    messageHandler(socket) {
        socket.on("message", message => {
          const data = JSON.parse(message);
          console.log("Recieved data from peer:", data);
    
          switch (data.type) {
            case MESSAGE_TYPE.chain:
              this.blockchain.replaceChain(data.chain);
              break;
    
              case MESSAGE_TYPE.transaction:
                if (!this.transactionPool.transactionExists(data.transaction)) {
                   // check if pool is filled
                   let thresholdReached = this.transactionPool.addTransaction(
                     data.transaction
                   );
                   this.broadcastTransaction(data.transaction);
                 }
                 break;
          }
        });
      }

    //will be used to send our chain to a socket
    sendChain(socket){
            socket.send(JSON.stringify({
            type: MESSAGE_TYPE.chain,
            chain: this.blockchain.chain 
        }));
    }

    //will be used in our index file to synchronize the chains
    syncChain(){
        this.sockets.forEach(socket =>{
            this.sendChain(socket);
        });
    }

    //send the transaction to each socket
    broadcastTransaction(transaction){
        this.sockets.forEach(socket =>{
            this.sendTransaction(socket,transaction);
        });
    }

    //send a transaction to a single socket and call this function for each socket
    sendTransaction(socket,transaction){
         socket.send(JSON.stringify({
             type: MESSAGE_TYPE.transaction,
             transaction: transaction
           })
       );
     }
}

module.exports = P2pserver;