//hold the functions related to cryptocurrency
const EDDSA = require("elliptic").eddsa;
const eddsa = new EDDSA("ed25519");
//To generate these unique numbers
const uuidV1 = require('uuid/v1');

//function to generate key pair
class ChainUtil {
    static genKeyPair(secret) {
      return eddsa.keyFromSecret(secret);
    }

    //function to generate ids.
    static id(){
        return uuidV1();
    }
}
module.exports = ChainUtil;

