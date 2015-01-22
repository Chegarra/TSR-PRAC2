var zmq = require('zmq');
var subscriber = zmq.socket('sub');

var URL=process.argv[2];
var DESCRIPTOR=process.argv[3];

subscriber.on("message", function(reply) {
  console.log('Mensaje Recibido: ', reply.toString());
});

subscriber.connect("tcp://"+URL);
subscriber.subscribe(DESCRIPTOR.toString());

process.on('SIGINT', function() {
  subscribe.close();
  console.log('\nCerrado');
});
