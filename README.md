# BlockChain-logger
A rudimentary proof of concept application that stores web application logs in a Block-chain format then sends the logs to another server to parse and view

## Proof of Concept
Web application logs are a valuable tool for both system administrators and security professionals for monitoring various systems for threats and indicators of compromise.  
When using application logs for this purpose, log integrity is of utmost importance. While systems exist currently to prevent malicious actors from tampering with application logs, if these systems fail there would be no way for administrators to find which logs are missing. 
This is where the idea of the blockchain comes into play.   The blockchain data structure (a doubly linked list with the hash of the previous block built into the current block) provides a more immutable storage mechanism for application logs that could have a positive security benefit. 

In this proof of concept showing how such a system would work, I have built a system split into 2 main parts built in Nodejs and React.  

## Middleware 
The client application is a web server that utilizes a logging middleware.  The middleware is very simple, and currently just logs certain parameters for HTTP GET requests.  
These logs are then stored as the data field in a block, then added to the blockchain.  
The blockchain is currently just stored as a local JSON to add persistence when the web application is turned off.  
The logging server can get a copy of the current blockchain by making a special HTTP GET request to the web server.  

## Logging server
The logging server obtains the blockchain from the web application then extracts the data field to gather the logs.  
It is at this point the value of the blockchain would be apparent as it would be able to detect if any manipulation of the logs had occurred by validating that the chain it received was compatible with the version of the blockchain it stored locally.  
In addition, this concept could be implemented to involve various logging servers simultaneously verifying the integrity of the blockchain, this keeping the logs immutable.   
In this implementation no such verification occurs for the sake of simplicity and clarity. 

Once the logs are extracted they are displayed in a simple frontend I wrote in React. 

## Installing and Running
This implementation is written using NodeJS/Express, and the frontend for the logging server is written in React.  
All other dependencies should be in the various package.json files and should be installed automatically by npm
This implementation was written on a linux system and will not work currently on windows machines due to file path names, etc. It shouldn’t take much tweaking to run it on Windows systems however.
To install, download the project from Github into a directory and run the batch run.sh.  This should start the client server, logging server, and frontend.  

 
