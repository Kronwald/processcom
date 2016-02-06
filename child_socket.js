
"use strict";
const ChildProcess = require('./core/process/ChildProcess');
var child = new ChildProcess();
child.on('message', function(data){
//console.log('socket received message ', data);

});

var intervalMessage = setInterval(child.sendMessage.bind(child), 4000, {to:'http', content:{data:'config', value:288}});