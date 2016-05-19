'use strict'
var config = require('./config.json');
var master = require('../../index').createMaster(config);

master.on(master.ON_PROCESS_CREATED, function(proc){
  console.log(proc.data.name, 'is created');
})

master.on(master.ON_ALL_PROCESS_CREATED, function(proc){
  console.log('All process in config file created');
})

master.start();
master.createProcess({name:"hello", process:"child_3"});

/*
setTimeout(function(){

console.log(master.processList);

}, 5000);*/
