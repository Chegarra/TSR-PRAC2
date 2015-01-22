

// node lbclient.js <url> <puerto> <peticion_servicio>
// peticion_servicio = "work_harder"
// orden de ejecucion -> broker > worker > client

if(process.argv.length == 5){
	var rs = require('./randString.js');
	zmq = require('zmq'),
	requester = zmq.socket('req'),
	URL = process.argv[2],
	PUERTO = process.argv[3],
	SERVICIO = process.argv[4],
	requester.identity = rs.randString();
	requester.connect('tcp://'+URL+':'+PUERTO);
	
	console.log('client ('+requester.identity+') connected to tcp://'+URL+':'+PUERTO+' ...');
	console.log('client ('+requester.identity+') has sent its msg: "'+SERVICIO+'"');

	requester.on('message', function(msg) {
		console.log('client ('+requester.identity+') has received reply: "'+msg.toString()+'"');
		requester.close();
	});
	
	requester.send(SERVICIO);
}
else{
	console.log("Número de argumentos inválido.\nSintaxis correcta: node lbclients.js <url> <puerto> <petición servicio>");
}

