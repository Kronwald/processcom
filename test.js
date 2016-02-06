/*var arrFunc = [];
function init(callback){
	for(var i=0; i < 3; i++) {
		var cb = callback;
		arrFunc.push(function(i, cb){
				var c = i*2;
				console.log(cb);
		});
		
	}
}




function callback(data){
	console.log(data);
}

init(callback);
arrFunc[0]();*/



/*

var arrFunc = [];
function add(o){
	//o();
	arrFunc.push(o);
}

function next(value){
	console.log(value);
}

for(var i=0; i < 3; i++) {
	add(function(){
		next(i);
	});
}



for(var u=0; u < arrFunc.length; u++) {
	console.log(u);
	arrFunc[u]();
}
*/



var Person = function(){};
Person.prototype.inject = function(value, fn){
	console.log("ma valeur ", value);
	fn();
}



var p = new Person();

p.inject(42, function(){console.log("hello world");});
p.inject(42, b);


function b(){
	console.log('called function b');
}