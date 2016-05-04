var chai = require('chai');
var chaiHttp = require('chai-http');
var UrlPattern = require('url-pattern');

var app = require('../index');

var should = chai.should();

chai.use(chaiHttp);

describe('/hello', function() {
    it('should return hello world', function() {
        return chai.request(app)
            .get('/hello')
            .then(function(res, err) {
              res.should.have.status(200);
                  res.type.should.equal('application/json');
                  res.charset.should.equal('utf-8');
                  res.body.should.be.an('object');
                  res.body.should.have.property('message');
                  res.body.message.should.equal('Hello world!');
            });
    });
});
