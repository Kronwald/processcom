"use strict";
//////////////////////////////////////////////////////
//
// REQUIRE
//
/////////////////////////////////////////////////////
const util = require('util');
const EventEmitter = require('events');
const fork = require('child_process').fork;

class MasterProcess extends EventEmitter {
	
	//////////////////////////////////////////////////////
	//
	// CONSTRUCTOR
	//
	/////////////////////////////////////////////////////
	/** 
	* @constructor 
	* @author Gauthier de Girodon Pralong
	* @class
	* @classdesc 
	*/
	constructor(config){
		super()
		this.__processList = {};
		this.__config = config;
	}
	//////////////////////////////////////////////////////
	//
	// METHOD
	//
	/////////////////////////////////////////////////////
	/**
	 * Launch all process
	 */
	start(){
		this.__config.child_process.forEach(this.createConfigProcess, this);
	}
	/**
	 * Create All Process from config Object
	 * @param  {Object} child child object from config ex: { "name":"child name", "process":"child_name" }
	 * @param  {Number} index from foreach
	 * @param  {Array} arr   array from foreach
	 */
	createConfigProcess(child, index, arr){
		this.createProcess(child);
	}

	/**
	 * Create process
	 * @param  {Object} child child object from config ex: { "name":"child name", "process":"child_name" }
	 */
	createProcess(child){
		let name = child.name;
		let proc = child.process;
		let targetProcess = child.sendTo;
		this.__processList[name] = fork( './'+proc, [name, targetProcess]);
		this.__processList[name].on('message', this.incomingMessage.bind(this));
		this.__processList[name].on('error', this.childError.bind(this, child));
		this.__processList[name].on('exit', this.childExit.bind(this, child));
		this.__processList[name].on('close', this.childClose.bind(this, child));
		this.emit(this.ON_PROCESS_CREATED, this.__processList[name]);
	}
	/**
	 * Dispacth incoming from a child process to an other process identify by {to}
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
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
	/**
	 * [childError description]
	 * @param  {[type]} err   [description]
	 * @param  {[type]} child [description]
	 * @return {[type]}       [description]
	 */
	childError(err, child){
		console.log(child.name,":",err.stack);
	}
	/**
	 * [childExit description]
	 * @param  {[type]} child [description]
	 * @return {[type]}       [description]
	 */
	childExit(child){
		console.log('exit '+child.name);
	}
	/**
	 * [childClose description]
	 * @param  {[type]} child [description]
	 * @return {[type]}       [description]
	 */
	childClose(child){
		console.log('close '+child.name);
		delete(this.__processList[child.name]);
		setTimeout(this.createProcess.bind(this), 5000, child);
	}
	//////////////////////////////////////////////////////
	//
	// CONSTANT
	//
	/////////////////////////////////////////////////////
	get ON_PROCESS_CREATED(){
		return "on_process_created";
	}
	
}

/**
 * export class
 */
module.exports= MasterProcess;

