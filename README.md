# processcom
communicate and launch multi node process on same machine

Master process file
```
'use strict'
//read config file
var config = require('./config.json');

//create master process
var master = require('processcom').createMaster(config);

//listen event when a process child created
//proc is a process object (see node process)

master.on(master.ON_PROCESS_CREATED, function(proc){
  console.log('process created');
})

//launch master process
master.start();

//add a process after start
master.createProcess({name:"child3", process:"child_3"});
```

child_1.js process file
```
'use strict'
//create child process communication
var child = require('processcom').createChild();

//listen when a message has been send by master
child.on('message', function(data){
		console.log(this.processName,' received data :', data);
});

```

child_2.js process file
```
'use strict'
//create child process communication
var child = require('processcom').createChild();

//listen when a message has been send by master
child.on('message', function(data){
		console.log(this.processName,' received data :',data );
});

//send message to child1 process
setInterval(child.sendMessage.bind(child, {to:'child1', content:'hello from child process 2'}),5000);

```

child_3.js process file
```
'use strict'
//create child process communication
var child = require('processcom').createChild();

//listen when a message has been send by master
child.on('message', function(data){
		console.log(this.processName,' received data :',data );
});

//send message to child1 process
setInterval(child.sendMessage.bind(child, {to:'child1', content:{x:1, y:2, message:'boyagaa'}}),5000);

```

config.json file
```
{
  "child_process":[
                  { "name":"child1",
                    "process":"child_1",
                    "autoRestart":true
                  },
                  { "name":"child2",
                    "process":"child_2",
                     "autoRestart":true
                  }
    
    ]
    
  
}

```