var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

   // -- refactored to middleware --
   //
   //app.get('/', function(req, res){
   //    res.send('Hello World!\n');
   //});

// middleware: folder of our static files
app.use(express.static('public'));

//var comments = [
//   {title: 'One', body: 'talking all over the place'},
//   {title: 'Two', body: 'talking all over the place'},
//   {title: 'Three', body: 'talking all over the place'}
//];

var comments = {
   'One': 'talking all over the place',
   'Two': 'here we go again',
   'Three': 'A third time we speak'
};

var commentPath = '/comments';

app.get(commentPath , function(request, response){
   response.json(comments);
});
app.post(commentPath , urlencode, function(request, response){
   var newComment = request.body;
   var obj = {};
   comments[newComment.title] = newComment.body;
   obj[newComment.title] = newComment.body;
   response.status(201).json(obj);
});




// This line will bind our app to the network
//app.listen(3000);

module.exports = app;
