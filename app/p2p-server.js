//Import the ws module 
const WebSocket = require("ws");

//define a P2P_PORT for the server
const P2P_PORT = process.env.P2P_PORT || 5001;

//We need a list of peers which we will connect to when we start 
//the app.
//PEERS = ws://localhost:5002 P2P_PORT=5001 HTTP_PORT=3001 npm run dev
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []; 

const WebSocket = require('ws');

//declare the peer to peer server port 
const P2P_PORT = process.env.P2P_PORT || 5001;

//list of address to connect to
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

}

module.exports = P2pserver;