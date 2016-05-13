var assert = require('chai').assert;
var Master = require('../lib/process/MasterProcess');
describe('Master', function() {
    describe('create master process', function() {
        var m = new Master({
            child_process: [{
                name: 'test1',
                process: 'testChildProcess',
                autoRestart: true
            }, {
                name: 'test2',
                process: 'testChildProcess',
                autoRestart: true
            }]
        });
        it('should created Master Process with config ', function() {
            assert.isTrue(m.start(), 'master  start with config');
        });

				it('should dispatch process created after ALL process child created', function(done) {
						m.on(m.ON_ALL_PROCESS_CREATED, function(proc) {
								assert.equal(m.processList, proc,'all process are created')
								assert.equal(m.totalCreatedProcess, 2);
								done()
						})
						m.start()
				});
        after(function() {
            m.killAllProcess()
        })
    })
});
