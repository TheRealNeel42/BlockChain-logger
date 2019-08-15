var BlockChain = require('./BlockChain.js')
class Log {
	constructor(req) {
		this.timestamp = Date.now()
		this.method = req.method
		this.params = req.params
		this.query = req.query
		this.agent = req.header('user-agent')
		this.contentType = req.header('content-type')
		this.Authorization = req.header('Authorization')
	}
	get() {
		return JSON.stringify(this)
	
	}
}


// RETURNS JSON STRING Of NEW LOG OBJECT
var Logger = function(req, res) {

	var log = new Log(req)
	return log.get()
}



module.exports = Logger