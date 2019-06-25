From tutorial : https://medium.com/coinmonks/implementing-proof-of-stake-e26fa5fb8716

# HospiCoin
Implementation of PoS for crypto-medical use

# Run an ICO
npm run ico

# Run nodes
npm run dev

HTTP_PORT=3002 P2P_PORT=5002 PEERS=wc://localhost:5001 npm run dev

HTTP_PORT=3003 P2P_PORT=5003 PEERS=wc://localhost:5002 npm run dev

# Initiate System
Send coins to the nodes using ico
Recievers can now send stake transactions to be eligible to be elected as leader
Recievers can now send normal transactions to other nodes
