var m = require('./lib/process/MasterProcess');
var c = require('./lib/process/ChildProcess');
module.exports.createMaster = function(){return new m()};
module.exports.createChild = function(){return new c()};