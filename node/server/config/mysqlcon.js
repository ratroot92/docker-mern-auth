const mysql=require('mysql');

const con=mysql.createConnection({
    "host": "localhost",
    "user": "beenish123",
    "password": "Cc~uXH@Vx9Wj38:p",
    "database": "pec",
    "port": 3306

})
con.connect(function(err){
    (err)?console.log("con me error"):console.log("connection stablish");
})
module.exports = con;



// "host": "localhost",
// "user": "root",
// "password": "password",
// "database": "testall",
// "port": 3306
  

// "host": "localhost",
// "user": "beenish123",
// "password": "Cc~uXH@Vx9Wj38:p",
// "database": "pec",
// "port": 3306
