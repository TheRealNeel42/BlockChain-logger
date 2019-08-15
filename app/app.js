var express = require('express')
var fs = require('fs')
var Logger = require('./logger.js')
var BlockChain = require('./BlockChain.js')
var app = express()

var path = "./tmp/Blockchain.json"

var _port = 4000


var blockchain = new BlockChain()

if(fs.existsSync(path)){
	var chain = fs.readFileSync(path, 'utf8')
	if(chain){
		blockchain.createChainFromJSON(chain)
		console.log("Chain created from file")
	}
	else 
	{
		blockchain.createNewChain()
		console.log("New chain created")
	}
}
else
{
	blockchain.createNewChain()
	console.log("New chain created")
}





// Middleware is used to craft Logs per request and then submit to blockchain
app.use(function(req, res, next) {
	//First create JSON String Log
	var newLog = Logger(req, res)

	// then  add it to the block chain
	var existingBlock = blockchain.getPreviousBlock() 
	const newBlock = blockchain.nextBlock(existingBlock, newLog)
	blockchain.chain.push(newBlock)

	//Now write it to file.  In reality this might send to database or even another server for data integrity
	fs.writeFileSync(path, JSON.stringify(blockchain.getChain()));
	


	
	//console.log(blockchain.getChain()) //Prints blockchain
	console.log("Logged interaction")
	next()
})


// Simple test server that only accepts GET methods at /
app.get('/', function (req, res) {
	res.send("Hello world!")
})

app.get('/logs/', function(req, res) {
	var jsonLogs = JSON.stringify(blockchain.getChain())
	res.json(jsonLogs)
})

console.log("Listening on " + _port)
console.log("Logs stored at " + path )
app.listen(_port)