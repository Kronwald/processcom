'use strict'
var master = require('../../index').createMaster();
var express = require('express');

//start master
master.start();

/////////////////
// EXPRESS INIT
////////////////
var app = express();
var bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

/***********************************************
CREATE PROCESS

http request  : http://localhost:8080/process/create

body : [{
            "name": "first",
            "process": "child_1",
            "autoRestart": true
        }, {
            "name": "second",
            "process": "child_1",
            "autoRestart": true
        }
    ]

Content Type : application/json

***********************************************/

app.post('/process/create', function(req, res) {
  master.once(master.ON_ERROR, function(error) {
      res.send(error.message);
      res.end()
  })
    master.once(master.ON_ALL_PROCESS_CREATED, function(proc) {
        res.send('all process created : current process '+ this.totalCreatedProcess);
        res.end()
    })
    master.createProcess(req.body);
});

/***********************************************
Kill PROCESS
http request : http://localhost:8080/process/kill/first (kill process with name first)

http request : http://localhost:8080/process/kill/all (kill all child process)
***********************************************/
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
            return
        }
        master.killProcess(req.params.id);
        res.send('process ' + req.params.id + ' killed');
        res.end();
    }
);

//http port listen
app.listen(8080);
