"use strict";
//////////////////////////////////////////////////////
//
// REQUIRE
//
/////////////////////////////////////////////////////
const EventEmitter = require('events');
class ChildProcess extends EventEmitter {
	//////////////////////////////////////////////////////
	//
	// CONSTRUCTOR
	//
	/////////////////////////////////////////////////////
	/** 
	* @constructor 
	* @author Gauthier de Girodon Pralong
	* @creation date 6/23/15
	* @class
	* @classdesc description de PoolManager
	*/

	constructor(){
		super()
		this.__currentMiddleWare = 0;
		this.__middleWarList = [];
		this.__processName = process.argv[2];
		process.on('message', this.incomingMessage.bind(this));
		process.on('exit', this.exitHandler.bind(this));
		process.on('SIGINT', this.exitHandler.bind(this));
		process.on('uncaughtException', this.exitHandler.bind(this));
	}
	//////////////////////////////////////////////////////
	//
	// METHOD
	//
	/////////////////////////////////////////////////////
	exitHandler(err) {
		process.send({type:'error', from:this.__processName, content:err.stack});
	}
	errorHandler(err){
		process.send({type:'error', from:this.__processName, content:err.stack});
	}
 	sendMessage(data){
 		data.type = 'message';
 		data.from = 'this.__processName';
  		process.send(data);
	}

	incomingMessage(data){
		this.emit('message', data);
	}

	//////////////////////////////////////////////////////
	//
	// PROPERTIES
	//
	/////////////////////////////////////////////////////
}





module.exports= ChildProcess;

