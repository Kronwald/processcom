var assert = require('chai').assert;

describe('Master creation', function() {
	var Master = require('../lib/process/MasterProcess');

	it('should created Master Process with config ', function () {
		var m = new Master({child_process:[{name:'testChild', process:'testChildProcess', autoRestart:true}]});
		assert.isTrue(m.start(), 'master  start with config');
	});

	it('should created Master Process without config', function () {
		var m = new Master();
		assert.isNotNull(m, 'master not null');
		assert.isFalse(m.start(), 'master dont start without config');
	});

/*	it('should dispatch process created after process child created', function (done) {
		var m = new Master({child_process:[{name:'testChild', process:'testChildProcess', autoRestart:true}]});
		m.on(m.ON_PROCESS_CREATED, function(proc){
			done()
		})
		m.start()
	});*/

});


describe('Master functionnality', function() {
	var Master = require('../lib/process/MasterProcess');
	var m = new Master({child_process:[{name:'testChild', process:'testChildProcess', autoRestart:true}]});

	it('should dispatch process created after process child created', function (done) {
		m.on(m.ON_PROCESS_CREATED, function(proc){
			done()
		})
		m.start()
	});

	it('should list all process list', function () {
		assert.isObject(m.processList,'process list is object');
	});

});
