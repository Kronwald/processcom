'use strict'
// Require spawn from the child process module
// 
const MasterProcess = require('./core/process/MasterProcess');
const os = require('os');

var config = require("./config");
var used = (os.totalmem()-os.freemem());
/*console.log('OS            =>',os.type());
console.log('total memory  =>',os.totalmem());
console.log('free memory   =>',os.freemem());
console.log('used memory   =>',used);
console.log('used % memory =>',(used/os.totalmem()*100).toPrecision(4),'%');

console.log('loadAverage   =>',process.memoryUsage());
console.log('path   =>',process.execPath);

*/
var master = new MasterProcess(config);
master.start();

