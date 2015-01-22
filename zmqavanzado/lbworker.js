

// node lbworker.js <url> <puerto> <texto_disponible> <texto_servicio> <verbose>
// texto_disponible = "ready"
// texto_servicio = "done" 
// verbose = "true" | "false"
// orden de ejecucion -> broker > worker > client

if(process.argv.length == 7){

	var auxfunctions = require('./auxfunctions.js'),
	randString       = require('./randString.js'),
	URL        		 = process.argv[2],
	PUERTO     		 = process.argv[3],
	DISPONIBLE 		 = process.argv[4],
	SERVICIO   		 = process.argv[5],
	VERBOSE    		 = process.argv[6],
	zmq 			 = require('zmq'),
	replies			 = 1;
	requester 		 = zmq.socket('req');
	requester.identity = randString.randString(),
	requester.connect('tcp://'+URL+':'+PUERTO);

	
	if(VERBOSE == 'true'){
		console.log('worker ( '+requester.identity+' ) connected to tcp://'+URL+':'+PUERTO+' ...');
		console.log('worker ( '+requester.identity+' ) has sent READY msg: "'+DISPONIBLE+'"');
	}
	
	requester.send(DISPONIBLE);
	requester.on('message', function(msg) {
		var args = Array.apply(null, arguments);
        if(VERBOSE == 'true'){
			console.log('worker ( '+args[0]+' ) has received request: "'+args[4]+'" from client ('+args[2]+')');
		}
		if(VERBOSE == 'true'){
			arguments = auxfunctions.limpiarArguments(args);
			auxfunctions.showArguments(args);
			console.log('worker ( '+args[0]+' ) has send its reply');
			auxfunctions.showArguments(args);
			console.log('worker ( '+args[0]+' ) has sent '+(replies++)+' replies');
		}
		requester.send([args[2],"",SERVICIO]);
	});
}
else{
	console.log("Número de argumentos inválido.\nSintaxis correcta: node lbworker.js <url> <puerto> <texto_disponible> <texto_servicio> <verbose>");
}

