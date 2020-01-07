var dependencies = require('./dependencies')
var conn = require('./db_connection')
var app = dependencies.app
var urlencodedParser = dependencies.urlencodedParser
var jwt = require('jsonwebtoken');
var multer = require('multer')
var upload = multer({ dest: 'assets/uploads/images' })
var fs = require("fs")
var FormData = require('form-data')

/*var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'assets/uploads/images')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
})

var upload = multer({ storage: storage })
*/
app.post('/students/new/imagePost', upload.single('userImage'),  function(req, res) {
	
	if(!req.file){
		console.log("req.file not found")
		res.status(404).send({data:"file not received"})
	}
	else{
		console.log(req.file)
		var file = req.file
		file.filename = file.filename + "_"+file.originalname
		console.log(file)
		//res.sendfile('assets/nav.css')
		res.status(200).send({"data": "file received"})
	}

	
});

app.get('/readme', (req, res) => {
	fs.readFile('assets/myText.txt', 'utf8', (err, data) => {
		if(err) throw err
		console.log(data)
		res.send(data)
	})
})



app.get('/students/new/imagePost', function(req, res) {
	res.readFile('assets/uploads/images/image.jpg')
});



var verifyToken = (req, res, next) =>{
	console.log(req.headers)
	console.log(req.headers.authorization)
	console.log(req.headers.authorization.split(' ')[1])
	if(!req.headers.authorization){
		return res.status(401).send('Unauthorized request')
	}
	let token = req.headers.authorization.split(' ')[1]
	if(token === 'null'){
		return res.status(401).send('Unauthorized request token is null')
	}
	console.log(jwt.verify(token, 'secretKey'))
	let payload = jwt.verify(token, 'secretKey');
	if(!payload){
		return res.status(401).send('Unauthorized request payload')
	}
	req.userId = payload.subject
	
	next()
}

app.get('/authentication', function(req, res) {
	res.send({name:'johnosn'});
});

app.get('/students', function(req, res) {
	let sql = "select * from students"
	conn.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result)
		res.send(result)
	})
});

app.post('/students', urlencodedParser, function(req, res) {
	const {_id} = req.body
	let recycled = `insert into recyclebin (select * from students WHERE id = ${_id});`
	let sql = `DELETE FROM students where id = ${_id}`
	console.log(recycled)
	console.log(sql)
	conn.query(recycled, (err, result) => {
		if(err) throw err;
		conn.query(sql, (err, result) => {
			if(err) throw err;
			console.log(result)
			res.status(200).send({data:"record recycled and deleted successfully"})
		})
	})
});


app.post('/students/recyclebin', urlencodedParser, function(req, res) {
	const {_id} = req.body
	let recycled = `insert into students (select * from recyclebin WHERE id = ${_id});`
	let del = `DELETE FROM recyclebin where id = ${_id}`
	console.log(recycled)
	console.log(del)
	conn.query(recycled, (err, result) => {
		if(err) throw err;
		conn.query(del, (err, result) => {
			if(err) throw err;
			console.log(result)
			res.status(200).send({data:"record recycled and deleted successfully"})
		})
	})
});



app.get('/students/recyclebin', function(req, res) {
	let sql = "select * from recyclebin"
	conn.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result)
		res.send(result)
	})
});




app.get('/students/edit/:id', function(req, res) {
	console.log(req.params)
	let sql = `select * from students where id = ${req.params.id};`
	conn.query(sql, (err, result) => {
		if(err) throw err;
		console.log(result)
		console.log(result.length)
		if(result.length === 1){
			res.send(result)
		}
		else if(result.length === 0){
			res.status(401).send("unauthorized request")
		}
	})
});

app.post('/students/edit/:id', urlencodedParser, function(req, res) {
	console.log(req.params)
	const {name, fatherName, age, course} = req.body
	let sql = `UPDATE students set name = "${name}", fatherName = "${fatherName}", age = ${age}, course = "${course}" where id = ${req.params.id}`
	conn.query(sql, (err, result) => {
		if(err) throw err;
		res.status(200).send({data:"record updated successfully."})
	})
});





app.post('/students/new', urlencodedParser, function(req, res) {
	const {name, fatherName, course, age} = req.body
	console.log(req.body)
	let sql = `INSERT INTO students (name, fatherName, age, course) VALUES ("${name}", "${fatherName}", ${age}, "${course}")`
	conn.query(sql, (err, result) => {
		if(err) throw err;
		res.status(200).send({data:"record inserted successfully."})
	})
	

	
});





app.post('/login', urlencodedParser, function(req, res) {
	const {name, password} = req.body
	console.log(req.body)
	if(name == 'Johnson' && password == 'john123'){
		let payload = {subject:1}
		let token = jwt.sign(payload, 'secretKey')
		console.log({token})
		res.status(200).send({token})
	}else{
		res.status(401).send('No Record found')
	}
	
});

app.get('/home', verifyToken, (req, res) => {
	console.log("from home req.userId = "+req.userId)
	let events = [
	  {
		"_id": "1",
		"name": "Auto Expo",
		"description": "lorem ipsum",
		"date": "2012-04-23T18:25:43.511Z"
	  },
	  {
		"_id": "2",
		"name": "Auto Expo",
		"description": "lorem ipsum",
		"date": "2012-04-23T18:25:43.511Z"
	  },
	  {
		"_id": "3",
		"name": "Auto Expo",
		"description": "lorem ipsum",
		"date": "2012-04-23T18:25:43.511Z"
	  },
	  {
		"_id": "4",
		"name": "Auto Expo",
		"description": "lorem ipsum",
		"date": "2012-04-23T18:25:43.511Z"
	  },
	  {
		"_id": "5",
		"name": "Auto Expo",
		"description": "lorem ipsum",
		"date": "2012-04-23T18:25:43.511Z"
	  },
	  {
		"_id": "6",
		"name": "Auto Expo",
		"description": "lorem ipsum",
		"date": "2012-04-23T18:25:43.511Z"
	  }
	]
	res.json(events)
  })


/*
app.get('/angular', function(req, res) {
	const name = 'Johnson'
	const password = 'john123'
	var myQuery =  `SELECT * FROM users where userName = '${name}' and password = '${password}';`
	
	conn.query( myQuery , function(err , result){
		if(err) throw err;
		res.send(result);
	});		
});*/