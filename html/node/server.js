var express = require('express');
var app = express();
var schedule = require('node-schedule');
var requestify = require('requestify');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Shug1276',
  database : 'my_db'
});


app.get('/saySomething', function (req, res) {
   res.end( 'Ok' );
});

var j = schedule.scheduleJob('*/1 * * * *', function(){
  requestify.get('https://api.coinmarketcap.com/v1/ticker/').then(function(response) {
    // Get the response body
	    var ticker = response.getBody();
	    console.log(ticker);
	});

});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})