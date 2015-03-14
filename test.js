var request = require('supertest');
var app = require('./app');

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
      .expect(201, done);
   });
});

