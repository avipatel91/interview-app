var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://foo:bar@localhost:5432/test';
/* GET home page. */

router.get('/', function(req, res, next) {
  var cities = [];
  pg.connect(connectionString, function(err, client, done) {
        // Handling connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500);
        }
        // Getting all rows
        var query = client.query("SELECT * FROM cities", function(err, result) {
        if(err) {
 	    done();
	    res.render('index', {error: "Uh-oh, you deleted the table. You hacker you."});
	    return console.error('error running query', err);
	  }	
	});

        // Stream results back one row at a time
        query.on('row', function(row) {
            cities.push(row.city);
        });

        query.on('end', function() {
            done();
	    console.log(cities)
	    res.render('index', {cities: cities});
        });
    });
});


router.post('/', function(req, res) {

    var cities = [];

    // Grabbing data from http req
    var data = {city: req.body.city};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handling connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500);
        }
	//inserting city into city table. SQL injection occurs here. 
        client.query("INSERT INTO cities(city) VALUES('" + data.city + "')", function(err, result) {
        if(err) {
 	    done();
	    return console.error('error running query', err);
	  }	
	});
	res.redirect('/');	
    });
});

module.exports = router;
