//Import the ws module 
const WebSocket = require("ws");

//define a P2P_PORT for the server
const P2P_PORT = process.env.P2P_PORT || 5001;

//We need a list of peers which we will connect to when we start 
//the app.
//PEERS = ws://localhost:5002 P2P_PORT=5001 HTTP_PORT=3001 npm run dev
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []; 


//This class which will hold all the message handlers and event listeners.
class P2pserver{
    constructor(blockchain){
        // same blockchain that we use in our app.
        this.blockchain = blockchain;
        //list of sockets which it would be connected to at a given amount of time
        this.sockets = [];
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

    messageHandler(socket){
        //on recieving a message execute a callback function
        socket.on('message',message =>{
            const data = JSON.parse(message);
            console.log("Received data from peer: ", data);
            this.blockchain.replaceChain(data);
        });
        
    }
    //will be used to send our chain to a socket
    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    //will be used in our index file to synchronize the chains
    syncChain(){
        this.sockets.forEach(socket =>{
            this.sendChain(socket);
        });
    }
}

module.exports = P2pserver;