const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const request = require('request')
const BlockChain = require('./files/BlockChain.js')

const app = express()
const port = 5000
const storagePath = "./tmp/Blockchain.json"
const appPath = "http://127.0.0.1:4000/logs/"

var pathFrom = "./tmp/Blockchain.json"

var getBlockChainFromApp = function() {

	request(appPath, { json: true }, (err, res, body) => {
		if (err) { return console.log(err); }
		var jsonBody = res.body
		fs.writeFileSync(storagePath, jsonBody);
	})
}

var getData = function() {
	var blockchain = new BlockChain()

	if(fs.existsSync(pathFrom)){
		var chain = fs.readFileSync(pathFrom, 'utf8')
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

	var dataArray = []

	for(var i = 1; i < blockchain.getTotalBlock();i += 1)
	{
		dataArray.push(blockchain.chain[i].data)
	}
	var dataJSON = JSON.stringify(dataArray)

	return dataJSON
}





app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/update/', (request, response) => {
	getBlockChainFromApp()
	response.send("BlockChain Updated Successfully")
})

app.get('/api/logs/', (request, response) => {
	var logs = getData()
	response.json(logs)
})

console.log("Listening on port " + port)
app.listen(port)