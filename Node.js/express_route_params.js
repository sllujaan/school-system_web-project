var express = require('express');
var app = express();

app.listen(3000, "127.0.0.1");


app.get('/', (req, res) => {
	res.send("this is the homepage.");
});

app.get('/contect', (req, res) => {
	res.send("this is the contect page.");
});

app.get('/profile:id', (req, res) => {
	res.send(`You requested to see a profile with the id of ${req.params.id}`);
});


console.log(`Server running at http://127.0.0.1:3000/`);