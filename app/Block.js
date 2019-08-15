const sha256 = require('sha256')

class Block {
	constructor(index, time, data, previousHash) {
		this.index = index;
		this.timestamp = time;
		this.data = data;
		this.previousHash = previousHash;
		this.currentHash = this.hashCalc()
		this.nonce = 0
	}
	hashCalc() { 
		var hash = sha256(this.index + this.timestamp + this.data + this.prevHash + this.nonce);
		return hash.toString()
	}


    mineBlock(difficulty){
    	while(this.currentHash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
    		this.nonce += 1
    		this.currentHash = this.hashCalc()
    	}
    }
}

module.exports = Block



