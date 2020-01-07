var express = require('express');
var app = express();


app.listen(3000, "127.0.0.1");
app.set('view engine', 'ejs');

app.use(express.static('./assets'));

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/contect', (req, res) => {
	res.render(__dirname + '/views/contect');
});

app.get('/profile:name', (req, res) => {
	var data = {age: 25, job: 'professional'}
	res.render('profile' ,{
		person: req.params.name,
		data: data
	});
});


console.log(`Server running at http://127.0.0.1:3000/`);