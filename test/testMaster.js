var assert = require('chai').assert;
var Master = require('../lib/process/MasterProcess');
describe('Master', function() {
    describe('create master process', function() {
        it('should created process from config ', function(done) {
            let m = new Master({
                child_process: [{
                    name: 'test1',
                    process: 'test/testChild',
                    autoRestart: true
                }, {
                    name: 'test2',
                    process: 'test/testChild',
                    autoRestart: true
                }]
            });
            m.on(m.ON_ALL_PROCESS_CREATED, function(proc) {
                assert.equal(m.processList, proc, 'all process are created')
                assert.equal(m.totalCreatedProcess, 2);
                done()
            })
            assert.isTrue(m.start(), 'master  start with config');
        });
        it('should create process on fly', function(done) {
            let m = new Master();
            m.on(m.ON_ALL_PROCESS_CREATED, function(proc) {
                assert.equal(m.processList, proc, 'all process are created')
                assert.equal(m.totalCreatedProcess, 1);
                done()
            })
            m.createProcess({
                name: 'test',
                process: 'test/testChild'
            });
        })
    })
});
