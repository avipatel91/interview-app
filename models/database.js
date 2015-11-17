var pg = require('pg');
var connectionString = 'postgres://foo:bar@localhost:5432/test';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE cities(city VARCHAR(40))');
query.on('end', function() { client.end(); });

