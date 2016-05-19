var child = require('../../index').createChild();
child.on('message', function(data){
		console.log(this.processName,' received data :',data );
});
//child.sendMessage({to:'child1', content:'hello from 1'});
//setInterval(child.sendMessage.bind(child, {to:'child1', content:'hello from 3'}),5000);
