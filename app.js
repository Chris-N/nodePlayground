var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

// middleware: folder of our static files
app.use(express.static('public'));

var redis = require('redis');
var client = redis.createClient();

client.hset('comments', 'One', 'body stuff');
client.hset('comments', 'Two', 'body stuff');
client.hset('comments', 'Three', 'body stuff');

   // -- refactored to middleware --
   //app.get('/', function(req, res){
   //    res.send('Hello World!\n');
   //});

var commentPath = '/comments';

app.get(commentPath , function(request, response){
   client.hgetall('comments', function(error, titles) {
      if(error) throw error;

      response.json(titles);
   });
});
app.post(commentPath , urlencode, function(request, response){
   var newComment = request.body;
   if(!newComment.title || !newComment.body){
      response.sendStatus(400);
      return false;
   }
      
   client.hset('comments', newComment.title, newComment.body, function(error) {
      if(error) throw error;

      var obj = {};
      obj[newComment.title] = newComment.body;
      response.status(201).json(obj);
   });
});
app.delete(commentPath + '/:name', function(request, response) {
   client.hdel('comments', request.params.name, function(error){
      if(error) throw error;
      response.sendStatus(204);
   });
});

// This line will bind our app to the network
//app.listen(3000);

module.exports = app;

// GET & POST - pre redis
//var comments = {
//   'One': 'talking all over the place',
//   'Two': 'here we go again',
//   'Three': 'A third time we speak'
//};
//app.get(commentPath , function(request, response){
//   response.json(comments);
//});
//app.post(commentPath , urlencode, function(request, response){
//   var newComment = request.body;
//   var obj = {};
//   comments[newComment.title] = newComment.body;
//   obj[newComment.title] = newComment.body;
//   response.status(201).json(obj);
//});

