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
     * @classdesc
     */

    constructor() {
        super()
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
    /**
     * [exitHandler description]
     * @param  {[type]} err [description]
     * @return {[type]}     [description]
     */
    exitHandler(err) {
        if (process.connected) {
            process.send({
                type: 'error',
                from: this.__processName,
                content: err.stack
            })
        }
    }

    /**
     * [sendMessage description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    sendMessage(data) {
        data.type = 'message';
        data.from = this.__processName;
        process.send(data);
    }

    /**
     * [incomingMessage description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    incomingMessage(data) {
        this.emit('message', data);
    }

    //////////////////////////////////////////////////////
    //
    // PROPERTIES
    //
    /////////////////////////////////////////////////////
    get processName() {
        return this.__processName;
    }

    get processInfo(){
      return process.cpuUsage();
    }
}

module.exports = ChildProcess;
