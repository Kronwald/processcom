'use strict'
//create child process communication
var Child = require('../lib/process/ChildProcess');
var child = new Child();


//listen when a message has been send by master
child.on('message', function(data){
		console.log(this.processName,' received data :', data);
});
