var zmq = require('zmq');
var publisher = zmq.socket('pub');
var auxfunct = require('./auxfunctions.js')
// ARGUMENTOS
var PORT=process.argv[2];
var NUM=process.argv[3];
var DESCRIPTOR=process.argv[4];
var DESCRIPTOR2 = process.argv[5];

publisher.bind('tcp://*:'+PORT, function(err) {
  if(err) {
	  console.log(err);
  } else {
	  console.log("Escuchando por "+PORT+"...");
  }
});

for (var i=1 ; i<NUM ; i++)
    setTimeout(function() {
        console.log('Enviado');
	publisher.send(DESCRIPTOR.toString()+i*5)
	publisher.send(DESCRIPTOR2+i*5)
	
    }, 1000 * i);

process.on('SIGINT', function() {
  publisher.close();
  console.log('\nCerrado');
});
