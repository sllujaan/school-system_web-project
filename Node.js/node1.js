
var server = require('http');

server.createServer(function(req, res){
	res.writeHead(200, {'content-Type: text/plain'});
	res.end("hello");

}).listen(8800);