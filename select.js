var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'weather'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  connection.query('SELECT * from zip;', (err,results) => {
    if (err) {
      console.log("ERR",err);
    }
    connection.end()
    console.log (results);
  })

  console.log('connected as id ' + connection.threadId);
});

// connection.end();
