	// Hello World server
	// Binds REP socket to tcp://*:5555
	// Expects "Hello" from client, replies with "world"

	var zmq = require('zmq');

	// socket to talk to clients
	var responder = zmq.socket('rep');

	var port, segons, text;

	if(process.argv.length>2){
		port = parseInt(process.argv[2]);
		segons = parseInt(process.argv[3]);
		text = process.argv[4];
		
	}

	responder.on('message', function(request) {
		console.log("Received request: [", request.toString(), "]");

		// do some 'work'
		setTimeout(function() {

			// send reply back to client.
			responder.send(request.toString()+" -- "+text);
		}, 1000);
	});

	responder.bind('tcp://*:8000', function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Listening on 8000...");
		}
	});

	process.on('SIGINT', function() {
		responder.close();
	});
