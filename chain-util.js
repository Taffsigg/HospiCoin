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

    static hash(data){
        return SHA256(JSON.stringify(data)).toString();
    }

    //To verify a signature we need to decrypt it using the public
    static verifySignature(publicKey,signature,dataHash){
        return ec.keyFromPublic(publicKey).verify(dataHash,signature);
    }
}
module.exports = ChainUtil;

