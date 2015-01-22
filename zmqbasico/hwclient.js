	// Hello World client
	// Connects REQ socket to tcp://localhost:5555
	// Sends "Hello" to server.

	var zmq = require('zmq');
	var url, port, peticions, text;
	var array;
	
	if(process.argv.length<5){
		
		console.log("Ús node hwclient url:port peticions text")
		
		console.log("Es termina el programa")
		
		process.exit(0);
		
	}
	
	
		array = process.argv[2].split(":");
		url = array[0];
		port = array[1];
		peticions = process.argv[3];
		text = process.argv[4];
		
		console.log(url + "\n" + port);
	

	// socket to talk to server
	console.log("Connecting to hello world server...");
	var requester = zmq.socket('req');

	var x = 0;
	requester.on("message", function(reply) {
		console.log("Received reply", x, ": [", reply.toString(), ']');
		x += 1;
		if (x == peticions) {
			requester.close();
			process.exit(0);
		}
	});

	requester.connect("tcp://"+url+":"+port);

	for (var i = 0; i < peticions; i++) {
		console.log("Sending request", i, '...');
		requester.send(text);
	}

	process.on('SIGINT', function() {
		requester.close();
	});
