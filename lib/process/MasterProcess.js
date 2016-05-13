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
		super();
		this.__processList = {};
		this.config = config;
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
		if(typeof this.config !=='undefined'){
			this.config.child_process.forEach(this.createConfigProcess, this);
			return true;
		}
		return false;
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
		this.__processList[name] = {process:fork( './'+proc, [name]), data:child};
		this.__processList[name].process.on('message', this.incomingMessage.bind(this));
		this.__processList[name].process.on('error', this.childError.bind(this, child));
		this.__processList[name].process.on('exit', this.childExit.bind(this, child));
		this.__processList[name].process.on('close', this.childClose.bind(this, child));
		this.emit(this.ON_PROCESS_CREATED, this.__processList[name]);
	}
	/**
	 * Kill process and turn off autoRestart
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	killProcess(name){
		this.getProcessByName(name).data.autoRestart = false;
		this.getProcessByName(name).process.kill('SIGINT');
	}

	/**
	 * kill all process in processList
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	killAllProcess(){
		for(var item in this.processList){
			this.killProcess(item);
		}
	}

	/**
	 * [getProcessByName description]
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	getProcessByName(name){
		return this.__processList[name];
	}

	//////////////////////////////////////////////////////
	//
	// EVENT HANDLER
	//
	/////////////////////////////////////////////////////
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
				if(this.getProcessByName(data.to)){
					this.getProcessByName(data.to).process.send({type:data.type, from:data.from, content:data.content});
				}else{
					console.log('process ['+data.to+'] not ready');
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
		if(this.getProcessByName(child.name).autoRestart){
			setTimeout(this.createProcess.bind(this), 5000, child);
		}
		delete this.__processList[child.name];
	}
	//////////////////////////////////////////////////////
	//
	// CONSTANT
	//
	/////////////////////////////////////////////////////
	get ON_PROCESS_CREATED(){
		return "on_process_created";
	}

	get ON_ERROR(){
		return "on_error";
	}
	//////////////////////////////////////////////////////
	//
	// PROPERTIES
	//
	/////////////////////////////////////////////////////
	get processList(){
		return this.__processList;
	}

	set config(cfg){
		this.__config = cfg;
	}
	get config(){
		return this.__config;
	}
}

/**
 * export class
 */
module.exports= MasterProcess;
