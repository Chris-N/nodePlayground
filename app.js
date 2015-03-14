var express = require('express');
var app = express();

   // -- refactored to middleware --
   //app.get('/', function(req, res){
   //    res.send('Hello World!\n');
   //});

// middleware: folder of our static files
app.use(express.static('public'));

var comments = [
   {title: 'One', body: 'talking all over the place'},
   {title: 'Two', body: 'talking all over the place'},
   {title: 'Three', body: 'talking all over the place'}
];

var commentPath = '/comments';

app.get(commentPath , function(request, response){
   response.json(comments);
});
app.post(commentPath , function(request, response){
   response.sendStatus(201);
});




// This line will bind our app to the network
//app.listen(3000);

module.exports = app;
