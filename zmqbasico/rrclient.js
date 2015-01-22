var zmq = require('zmq');
var requester = zmq.socket('req');

var URL=process.argv[2];
var PORT=process.argv[3]
var NUM=process.argv[4];
var TEXT=process.argv[5];
var replyNbr = 0;

if(process.argv.length != 6){
    console.log("Se requieren: URL PUERTO NUM_PETICIONES TEXTO ");
    process.exit();
}

requester.connect('tcp://'+URL+':'+PORT);

requester.on('message', function(msg) {
  console.log('got reply', replyNbr, msg.toString());
  replyNbr += 1;
});

for (var i = 0; i < NUM; ++i) {
    requester.send(TEXT);
}

