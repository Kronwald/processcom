/**
 * class MasterProcess
 * @type {[type]}
 */
var m = require('./lib/process/MasterProcess');
module.exports.createMaster = function(conf){return new m(conf)};
/**
 * class ChildProcess
 * @type {[type]}
 */
var c = require('./lib/process/ChildProcess');
module.exports.createChild = function(){return new c()};