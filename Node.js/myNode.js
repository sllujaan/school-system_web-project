var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
var express = require('express');
var app = express();






var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'loginsystem'
});

connection.connect(function(error){
	if (error) {
		console.log('Error in db connection!');
		throw error;
	}else{
		console.log('db connected.');
	}
});



/*var sql = "select * from login";

app.get('/', function(req, res){
	connection.query(sql, function(error, rows, fields){
		if (error) {
			console.log('Error in query!');
			throw error;
		}else{
			console.log('query succesfull.');
			 res.send(rows[0].usr_name);
		}
	});
});

app.listen(3000);



app.get('/', function(req, res){
	if (req.url === 'home') {
		res.send("Hello I am Home");
	}
});

*/
var server = http.createServer(function(req, res){
	res.writeHead(200, {'content-Type: text/plain'});
	res.end("hello");
});
server.listen(3000);



/*var server = http.createServer(function (req, res) {
	console.log("request was made: "+req.url);
	res.writeHead(200, {'Content-Type': 'text/html'});
	var myReadStream = fs.createReadStream(__dirname + '/test.html', 'utf8');
	myReadStream.pipe(res);
	//res.end('Hello World!');
});*/

//server.listen(4000, '127.0.0.1');





