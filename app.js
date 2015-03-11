var express = require('express');
var app = express();

   // -- refactored to middleware --
   //app.get('/', function(req, res){
   //    res.send('Hello World!\n');
   //});

// middleware: folder of our static files
app.use(express.static('public'));

app.get('/comment', function(request, response){
   var comment = {tite: 'first', body: 'I\m the first to comment!!!'};
   response.json(comment);
});

// This line will bind our app to the network
//app.listen(3000);


module.exports = app;
