"use strict";
//////////////////////////////////////////////////////
//
// REQUIRE
//
/////////////////////////////////////////////////////
const util = require('util');
const EventEmitter = require('events');
const fork = require('child_process').fork;
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

class MasterProcess extends EventEmitter {
	constructor(config){
		super()
		this.__processList = {};
		this.__config = config;
	}
	start(){
		this.__config.child_process.forEach(this.createProcess, this);
	}

	createProcess(child, index, arr){
		let name = child.name;
		let proc = child.process;
		let targetProcess = child.sendTo;
		let autoRestart = child.autoRestart;
		this.__processList[name] = fork( './'+proc, [name, targetProcess]);
		this.__processList[name].on('message', this.incomingMessage.bind(this))
		this.__processList[name].on('error', this.childError.bind(this, child))
		this.__processList[name].on('exit', this.childExit.bind(this, child))
		this.__processList[name].on('close', this.childClose.bind(this, child))
	}

	incomingMessage(data){
		switch(data.type){
			case 'error':
				console.log('process ['+data.from+'] error '+util.inspect(data.content));
			break;
			default :
				if(this.__processList[data.to]){
					this.__processList[data.to].send({type:data.type, from:data.from, content:data.content});
				}else{
					console.log('process ['+data.to+'] non lancer en attente de creation');
				}
			break;
		}
		
	}

	childError(err, child){
		console.log(child.name,":",err.stack);
	}

	childExit(child){
		console.log('exit '+child.name);
	}

	childClose(child){
		console.log('close '+child.name);
		delete(this.__processList[child.name]);
		setTimeout(this.createProcess.bind(this), 5000, child);
	}
	


    //events.EventEmitter.call(this);
}
//inherits
//util.inherits(PollManager, events.EventEmitter);
//////////////////////////////////////////////////////
//
// PROPERTIES
//
/////////////////////////////////////////////////////

//////////////////////////////////////////////////////
//
// METHOD
//
/////////////////////////////////////////////////////


module.exports= MasterProcess;

