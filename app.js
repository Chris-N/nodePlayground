var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('Hello World!\n');
});

// This line will bind our app to the network
//app.listen(3000);


module.exports = app;
