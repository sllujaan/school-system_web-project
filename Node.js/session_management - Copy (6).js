var express = require('express');
var validator = require('validator');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const{
	PORT = 3000,
	SESS_NAME = 'sid',
	users = [{id: 1, name: 'Johnson', password: 'john123'},
			 {id: 2, name: 'jake123', password: 'jake111'}]	
} = process.env;



app.set('trust proxy', 1) // trust first proxy
app.use(session({
	name: SESS_NAME,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,
			sameSite: true 
		  }
}));



var redirectUserLogin = (req, res, next) => {
	if(!req.session.userId){
		console.log("req.session.userId in redirectUserLogin = "+req.session.userId);
		res.render(__dirname + '/views/login' , {qs: req.query});
	}else{
		next();
	}
}

var redirectUserHome = (req, res, next) => {
	if(req.session.userId){
		console.log("req.session.userId in redirectUserHome = "+req.session.userId);
		res.render(__dirname + '/views/home' , {person: req.query});
	}else{
		next();
	}
}



app.use('/assets', express.static('assets'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	var id = 2;
	console.log('id = ' + id);
	res.send("hello");
});

app.get('/login', redirectUserHome, function(req, res) {
	var id = 2;
	console.log('id = ' + id);
	res.render(__dirname + '/views/login' , {qs: req.query});
});

app.post('/login', urlencodedParser, function(req, res) {
	//sess = req.session;
	const {name, password} = req.body;
	var found  = users.find(users => users.name == name && users.password == password);

	if(found){
		console.log("found.id = "+found.id);
		//sess.id = found.id;
		req.session.userId = found.id;
		console.log("req.session.userId in /login post = "+req.session.userId);
		res.send(found);
	}else{
		res.send(null);
	}	
});


app.get('/home', redirectUserLogin, function(req, res) {
	console.log("req.session.userId in /home get = "+req.session.userId);
	res.render(__dirname + '/views/home' , {person: req.query});
	
});




app.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if(err){
			res.send('cannot access session here: Error: '+err);
		}
		res.clearCookie(SESS_NAME);
		res.render(__dirname + '/views/login' , {qs: req.query});
	  });
		
});


app.get('/register', redirectUserHome, function(req, res) {
	res.render(__dirname + '/views/register' , {regForm: req.query});
});

app.get('/index', function(req, res) {
	res.render(__dirname + '/views/index');
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))