var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');


var app = express()
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));


app.listen(3000, "127.0.0.1");
app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use('/assets', express.static('assets'));

app.get('/', function(req, res) {
	req.session.user_id = 2;
	console.log('session = ' + req.session.user_id);
	res.render('home');
});

app.get('/login', (req, res) => {
	//console.log(req.query);
	res.render(__dirname + '/views/login', {qs: req.query});
});

app.post('/login', urlencodedParser, (req, res) => {
	var db_usr_name = 'Jake123';
	var data = req.body;
	console.log(data);
	if(db_usr_name == data.name){
		res.send(data);
	}else{
		res.send(null);
	}
	
	//res.send("Hello i am fro post /login");
	//console.log(req.body);
	//res.render(__dirname + '/views/login-success', {data: req.body});
});


app.get('/contect', (req, res) => {
	//console.log(req.query);
	res.render(__dirname + '/views/contect', {qs: req.query});
});

app.get('/profile:name', (req, res) => {
	var data = {age: 25, job: 'professional'}
	res.render('profile' ,{
		person: req.params.name,
		data: data
	});
});

app.get('/home:name', function(req, res) {
	
	console.log('session = ' + req.session.user_id);
	/*res.render('home', {
		person = req.params.name
	});*/
});





console.log(`Server running at http://127.0.0.1:3000/`);