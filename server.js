var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.send("Fuck off, world...");
});

app.get('/:uid', function(req, res) { 
    // TODO lookup customer's URL based on :uid
    console.log(req.params.uid);
    res.writeHead(301, { Location: 'http://tailgators.ca/?post_type=tribe_events' });
    res.end();
});

app.listen(3000, function() {
    console.log("listening on port 3000.")
});
