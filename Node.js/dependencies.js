var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var helmet = require('helmet')
var app = express();
var session = require('express-session');

app.use('/assets', express.static('assets'))
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
app.disable('x-powered-by')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
	name: 'sid',
	keys: ['key1', 'key2'],
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,
			sameSite: true 
		  }
}));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(3000, () => console.log(`http://localhost:${3000}`))



module.exports.urlencodedParser = urlencodedParser;
module.exports.app = app;

//console.log(module)