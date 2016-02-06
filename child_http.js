
"use strict";
const ChildProcess = require('./core/process/ChildProcess');
var child = new ChildProcess();
child.on('message', function(data){
//console.log('http received message ', data);
this.invalidatefunc();

});
//child.next(1);
//var intervalMessage = setInterval(child.sendMessage.bind(child), 2000, {to:'socket', content:{data:'config', value:124}});
