var zmq = require('zmq');
var responder = zmq.socket('rep');

var URL=process.argv[2];
var PUERTO=process.argv[3];
var SEG=process.argv[4];
var TEXT=process.argv[5];

if(process.argv.length != 6){
    console.log("Se requieren: URL PUERTO NUM_SEGUNDOS TEXTO ");
    process.exit();
}

responder.connect('tcp://'+URL.toString()+':'+PUERTO);

responder.on('message', function(msg) {
  console.log('received request:', msg.toString());
  setTimeout(function() {
      responder.send(TEXT);
 }, 1000*NSEG);
});
