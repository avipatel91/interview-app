var pg = require('pg');
var connectionString = 'postgres://foo:bar@localhost:5432/test';

var client = new pg.Client(connectionString);
client.connect();
client.query('CREATE TABLE cities(city VARCHAR(40))');
client.query('INSERT INTO cities(city) values($1)', ["New York"]);
client.query('INSERT INTO cities(city) values($1)', ["London"]);
query = client.query('INSERT INTO cities(city) values($1)', ["San Francisco"]);
query.on('end', function() { client.end(); });

