import { app, urlencodedParser, conn, jwt } from './dependencies'


app.post('/angular', urlencodedParser, function(req, res) {

	const reqLen = Object.keys(req.body).length
	console.log('reqLen = '+reqLen)


	
	if(reqLen != 0){
		const {name , password} = req.body
		console.log('name = '+name)
		console.log('password = '+password)

		temp  = (callback) => {
			var myQuery =  `SELECT * FROM users where userName = '${name}' and password = '${password}';`
			conn.query( myQuery , function(err , result){
			if(err) throw err;
			console.log(result);
			callback(null, result);
			});
		}
			
		temp((err, result) => {
			if (err) res.send('err = ')
			else console.log("result == "+JSON.stringify(result));console.log(result)
			if (result.length > 0){
				let payload = {subject: '1234567890'};
				let token = jwt.sign(payload, 'secretKey');
				console.log('found == success')
				res.status(200).send({token});
	
			}
			else{
				res.status(401).send({status:'failed. No name found in database'});
			}
		})
		
	}
	else{
		res.status(401).send({Error:'no posted Data'});
	}	
});


app.post('/angularPost', urlencodedParser, function(req, res) {
	const reqLen = Object.keys(req.body).length
	console.log('reqLen = '+reqLen)


	
	if(reqLen != 0){
		const {name , password} = req.body
		console.log('name = '+name)
		console.log('password = '+password)

		temp = (callback) => {
			var myQuery =  `insert INTO users (userName, password) VALUES ('${name}', '${password}');`
			conn.query( myQuery , function(err , result){
			if(err) throw err;
			console.log(result);
			callback(null, result);
			});
		}
			
		temp((err, result) => {
			if(!err){
				res.status(200).send("Record inserted succesfully.");
			}else{
				res.status(401).send({Error:'Ther was some error in inserting record'});
			}
		})
		
	}
	else{
		res.status(401).send({Error:'no posted Data'});
	}
	
});




app.get('/angular', urlencodedParser, function(req, res) {
	

	const name = 'Johnson'
	const password = 'john123'
	console.log('name = '+name)
	console.log('password = '+password)

	temp = (callback) => {
		var myQuery =  `SELECT * FROM users where userName = '${name}' and password = '${password}';`
		console.log(myQuery)
		conn.query( myQuery , function(err , result){
			if(err) throw err;
			console.log(result);
			callback(null, result);
		});
	}
		
	temp((err, result) => {
		if (err) res.send('err = ')
		else console.log("result == "+JSON.stringify(result));console.log(result)
		if (result.length > 0){
			let payload = {subject: '1234567890'};
			let token = jwt.sign(payload, 'secretKey');
			console.log('found == success')
			res.status(200).send({token});

		}
		else{
			res.status(401).send({status:'failed. No name found in database'});
		}
	})
		
});

module.exports = app

