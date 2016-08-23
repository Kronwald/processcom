'use strict'
//var config = require('./config.json');
var master = require('../../index').createMaster();
var express = require('express');

//listen process created
/*master.on(master.ON_PROCESS_CREATED, function(proc) {
  if(requestStack[proc.data.name]!== undefined){
    requestStack[proc.data.name].send('created process')
    delete requestStack[proc.data.name];
  }
})*/

//listen all process created
master.on(master.ON_ALL_PROCESS_CREATED, function(proc) {
    console.log('All process in config file created');
})

//start master
master.start();



/////////////////
// EXPRESS INIT
////////////////
var app = express();
var bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

const requestStack = {};


app.post('/process/create', function(req, res) {
    /*  requestStack[req.body.name] = res;

      next();*/
    master.on(master.ON_PROCESS_CREATED, function(proc) {
        res.send('process created');
        res.end()
        console.log(this)
    })
    master.createProcess(req.body);
});

app.post('/process/kill/:id', function(req, res) {
        if (req.params.id === undefined) {
            res.send('error');
            end();
            return
        }
        if (req.params.id === 'all') {
            master.killAllProcess();
            res.send('all process killed');
            res.end();
            //  return
        } else {
            master.killProcess(id);
            res.send('process ' + id + 'killed');
            res.end();
        }

    }

);




app.listen(8080);
