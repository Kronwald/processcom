var child = require('../../index').createChild();
child.on('message', function(data){
		console.log(this.processName,' received data :',data );
});
