var request = require('supertest');
var app = require('./app');
   
describe('Requests to the root path', function(){

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


describe('Requests to the comment path', function(){

   it('Returns a 200 status code', function(done){
      request(app)
      .get('/comment')
      .expect(200, done);
   });

   it('Returns JSON format data', function(done) {
      request(app)
      .get('/comment')
      .expect('Content-Type', /json/, done);
   });

   it('Return a comment', function(done) {
      request(app)
      .get('/comment')
      .expect(JSON.stringify({tite: 'first', body: 'I\m the first to comment!!!'}), done);
   });

});

