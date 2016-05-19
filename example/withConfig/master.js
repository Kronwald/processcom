'use strict'
var config = require('./config.json');
var master = require('../../index').createMaster(config);

//listen process created
master.on(master.ON_PROCESS_CREATED, function(proc){
  console.log(proc.data.name, ' created');
})
//listen all process created
master.on(master.ON_ALL_PROCESS_CREATED, function(proc){
  console.log('All process in config file created');
})
//start master
master.start();
//add process on fly
master.createProcess({name:"hello", process:"child_3"});
