var express = require('express');
var morgan = require('morgan');
var app = express();

var port = process.env.PORT || 3000;
var adminPassword = process.env.ADMIN_PASSWORD;

app.use(morgan('dev'));

require('./routes')(app);

app.listen(port, function() {
    console.log("listening on port: " + port);
});
