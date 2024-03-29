var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

require('./routes')(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("listening on port: " + port);
});
