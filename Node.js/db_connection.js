var mysql = require('mysql')


conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "school"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = conn


/*
// callback function for synchronous access
temp = (callback) => {
conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  conn.query("SELECT * FROM users" , function(err , result){
    if(err) throw err;
    console.log(result);
    callback(null, result);
  });
});
}

temp((err, result) => {
  if (err) console.log("Database error!");
  else console.log("result == "+JSON.stringify(result));console.log(result)
})





conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  conn.query("SELECT * FROM users" , function(err , result){
    if(err)throw err;
    console.log(result);
  });
});

*/