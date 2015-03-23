var request = require('supertest');
var app = require('./app');

var redis = require('redis');
var client = redis.createClient();

console.log('------------------------------' + new Date());
describe('Requests to the ROOT path', function(){

    it('Returns a 200 status code', function(done){
        request(app)
        .get('/')
        .expect(200)
        .end(function(error){
            if(error) throw error;
            done();  // needed to complete mocha
        });
    });

    it('Returns a HTML format data', function(done) {
       request(app)
       .get('/')
       .expect('Content-Type', /html/, done);
    });

    it('Returns an index file', function(done) {
       request(app)
       .get('/')
       .expect(/comments/i, done);
    });

});


describe('Requests to the COMMENT path', function(){

   it('Returns a 200 status code', function(done){
      request(app)
      .get('/comments')
      .expect(200, done);
   });

   it('Returns JSON format data', function(done) {
      request(app)
      .get('/comments')
      .expect('Content-Type', /json/, done);
   });

   it('Returns previous comments', function(done){
      request(app)
      .get('/comments')
      .expect('Content-Type', /json/, done);
   });
});

describe('Create COMMENTS', function(){

   it('Return a 201 create status', function(done){
      request(app)
      .post('/comments')
      .send('title=FromPost&body=A+message+from+the+test+create')   // form data is url encoded
      .expect(201, done);
   });

   it('Return the post comment title', function(done) {
      request(app)
      .post('/comments')
      .send('title=FromPost&body=A+message+from+the+test+create')   // form data is url encoded
      .expect(/FromPost/i, done);
   });

   it('Validates title and description', function(done) {

      request(app)
      .post('/comments')
      .send('title=&body=')
      .expect(400, done);
   });
});

describe('Deleting comments', function(){

   before(function(){ client.hset('comments', 'Banana', 'a tasty fruit'); });
   //after(function() { client.flushdb(); });

   // 204 = no content
   it('Returns a 204 status code', function(done){

     request(app)
      .delete('/comments/Banana')
      .expect(204, done);
      //.end(function(error){
      //   if(error) throw error;
      //   done();
      //});
   });
});

