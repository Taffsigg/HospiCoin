//hold the functions related to cryptocurrency
const EDDSA = require("elliptic").eddsa;
const eddsa = new EDDSA("ed25519");

//function to generate key pair
class ChainUtil {
    static genKeyPair(secret) {
      return eddsa.keyFromSecret(secret);
    }
  }
  module.exports = ChainUtil;