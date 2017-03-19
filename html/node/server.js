var express = require('express');
var app = express();
var schedule = require('node-schedule');
var requestify = require('requestify');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Shug1276',
  database : 'ticker_tape'
});


app.get('/saySomething', function (req, res) {
   res.end( 'Ok' );
});

var rule = new schedule.RecurrenceRule();

rule.minute = 00;

var j = schedule.scheduleJob(rule, function(){



  	requestify.get('https://api.coinmarketcap.com/v1/ticker/').then(function(response) {
    // Get the response body

    	console.log('back')

	    var ticker = response.getBody();

	    connection.connect(function(err) {
			if (err) {
				return;
			}
			var values = []
			ticker.forEach(function(item){
		    	item.tid = item.id;
		    	delete item.id;
		    	// var littleArray = [];
		    	// for(k in Object.keys(item)){
		    	// 	littleArray.push(item[k]);
		    	// }
		    	var littleArray = Object.keys(item).map(function(key) {
				    return item[key];
				});
		    	values.push(littleArray);
		    });
		    
		    var keys = "(" + Object.keys(ticker[0]).join() + ")";
	    	var sql = "INSERT INTO tickers " + keys + " VALUES ?";
		    
		    console.log(values[22]);

			var query = connection.query(sql, [values], function (error) {
			  if (error) throw error;
			  // Neat!
			  console.log('success');
			  connection.end();
			});

		  	
		});
	}, function(e){
		console.log(e)
	});

});



var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})