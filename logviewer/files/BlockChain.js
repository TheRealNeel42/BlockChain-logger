const Block = require('./Block.js')
const fs = require('fs')
const sha256 = require('sha256')

class BlockChain {
	constructor() {
		//this.chain = [this.createGenesisBlock()];
		//REFER TO CHECKNEWCHAINVALIDITY TO CHANGE DIFFICULTY
		this.difficulty = 3;
	}

  createNewChain() {
    this.chain = [this.createGenesisBlock()];
  }

  createChainFromJSON(jsonData){
    var jsonChain = JSON.parse(jsonData)
    this.chain = jsonChain
  }
	createGenesisBlock() {

		const genesis = new Block(0, Date.now(), 'MyBlock', '0')
		return genesis
	}

	getLatestBlock()
	{
		return this.chain[this.chain.length - 1]
	}

	getPreviousBlock() {
		return this.chain[this.chain.length - 1]
	}

	nextBlock(previous, data){
		const newBlock = new Block(previous.index + 1, Date.now(), data, previous.currentHash)
		newBlock.previousHash = this.getPreviousBlock().currentHash
		newBlock.mineBlock(this.difficulty)
		return newBlock
  }

  addToChain(block){
   	if(this.checkBlockValidity(this.getLatestBlock(), block))
   	{
   		this.chain.push(block)
   		return true
   	}
   	return false

   }

  getTotalBlock() {
   	return this.chain.length
   }

  getChain() {
   	return this.chain
  }

  replaceChain(newChain) {
  	this.chain = newChain
  }

  hashBlock(block){
   	var hash = sha256(block.index + block.timestamp + block.data + block.prevHash + block.nonce);
	  return hash
  }

  validHash(block){
  	var hash = hashBlock(block)
   	return (hash == block.currentHash)
  }



  checkChainValidity(newChain){

 		if(this.hashBlock(newChain[0]) !== this.hashBlock(this.chain[0]))
 		{
 			
 			return false 
 		}

 		var previousBlock = newChain[0]
 		var i = 1

 		while(i < newChain.length)
 		{
 			var block = newChain[i]
  			
 			if(block.previousHash !== this.chain[i].previousHash)   //
 			{			
 				return false 
 			}
  			
 			if(block.currentHash.substring(0,3) !== "000")
 			{
 				return false 
 			}
 			previousBlock = block
 			i += 1
 		}
 		return true 
 	}
}

module.exports = BlockChain