var zmq = require('zmq');
var frontend = zmq.socket('router');
var backend  = zmq.socket('dealer');


var PORT_CLI=process.argv[2];
var PORT_SER=process.argv[3];

if(process.argv.length != 4){
    console.log("Se requieren: PORT_CLIENT PORT_SERVIDOR");
    process.exit();
}

frontend.bindSync('tcp://*:'+PORT_CLI);
backend.bindSync('tcp://*:'+PORT_SER);

frontend.on('message', function() {
  var args = Array.apply(null, arguments);
  backend.send(args);
});

backend.on('message', function() {
  var args = Array.apply(null, arguments);
  frontend.send(args);
});
