var assert = require('chai').assert;

describe('Master creation', function() {
	var Master = require('../lib/process/MasterProcess');
	
	it('should created Master Process without config', function () {
		var m = new Master();
		assert.isNotNull(m, 'master not null');
	});

	it('should dont start Master Process without config', function () {
		m = new Master();
		assert.isFalse(m.start(), 'master start false without config');
	});

	
});