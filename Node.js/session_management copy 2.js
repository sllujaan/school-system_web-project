var express = require('express');
var jwt = require('jsonwebtoken');
var cors = require('cors')
var bodyParser = require('body-parser');
var helmet = require('helmet')
var app = express();
var session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var conn = require('./db_connection');

const{
	PORT = 3000,
	SESS_NAME = 'sid',
	users = [{id: 1, name: 'Johnson', password: 'john123'},
			 {id: 2, name: 'jake123', password: 'jake111'}]	
} = process.env;


var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
app.disable('x-powered-by')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
	name: SESS_NAME,
	keys: ['key1', 'key2'],
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,
			sameSite: true 
		  }
}));




var redirectUserLogin = (req, res, next) => {
	console.log("loginssssssssssss = "+req.session);
	if(req.session){
		if(!req.session.userId){
			console.log("req.session.userId in redirectUserLogin = "+req.session.userId);
			res.render(__dirname + '/views/login' , {qs: req.query});
		}else{
			next();
		}
	}else{
		next();
	}
}

var redirectUserHome = (req, res, next) => {
	console.log("homessssssssssss = "+req.session);
	if(req.session){
		if(req.session.userId){
			console.log("req.session.userId in redirectUserHome = "+req.session.userId);
			res.render(__dirname + '/views/home' , {person: req.query});
		}else{
			next();
		}
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


app.post('/angular', urlencodedParser, function(req, res) {

	const reqLen = Object.keys(req.body).length
	console.log('reqLen = '+reqLen)

	temp = (callback) => {
		conn.query(`SELECT * FROM users where userName = ${}` , function(err , result){
		if(err) throw err;
		console.log(result);
		callback(null, result);
		});
	}
		
	temp((err, result) => {
		if (err) res.send('err = ')
		else console.log("result == "+JSON.stringify(result));console.log(result)
		res.send(JSON.stringify(result))
	})




	
	if(reqLen != 0){
		const {name , password} = req.body
		console.log('name = '+name)
		console.log('password = '+password)

		temp = (callback) => {
			var myQuery =  `SELECT * FROM users where userName = ${name} and password = ${password};`
			conn.query( myQuery , function(err , result){
			if(err) throw err;
			console.log(result);
			callback(null, result);
			});
		}
			
		temp((err, result) => {
			if (err) res.send('err = ')
			else console.log("result == "+JSON.stringify(result));console.log(result)
			if (result){
				let payload = {subject: '1234567890'};
				let token = jwt.sign(payload, 'secretKey');
				console.log('found == success')
				res.status(200).send({token});
	
			}
			else{
				res.status(401).send({status:'failed. No name found in database'});
			}
		})





		var found  = users.find(users => users.name == name)
		if (found){
			let payload = {subject: '1234567890'};
			let token = jwt.sign(payload, 'secretKey');
			console.log('found == success')
			res.status(200).send({token});

		}
		else{
			res.status(401).send({status:'failed. No name found in database'});
		}
		
		
	}
	else{
		res.status(401).send({Error:'no posted Data'});
	}
	
	
	
	
	
});


app.get('/angular', urlencodedParser, function(req, res) {
	
	temp = (callback) => {
		conn.query(`SELECT * FROM users` , function(err , result){
		if(err) throw err;
		console.log(result);
		callback(null, result);
		});
	}
		
	temp((err, result) => {
		if (err) res.send('err = ')
		else console.log("result == "+JSON.stringify(result));console.log(result)
		res.send(JSON.stringify(result))
	})

	

		
});



app.listen(PORT, () => console.log(`http://localhost:${PORT}`))