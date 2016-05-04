global.databaseUri = 'mongodb://localhost/travis-hello-world-dev';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var UrlPattern = require('url-pattern');

var app = require('../index');

var should = chai.should();

chai.use(chaiHttp);

describe('User endpoints', function() {
    beforeEach(function() {
        mongoose.connection.db.dropDatabase();
        this.pattern = new UrlPattern('/users');

    });

    describe('GET', function() {
        it('should return an empty list of users initially', function() {
            return chai.request(app)
                .get(this.pattern.stringify())
                .then(function(res) {
                    res.should.have.status(200);
                    res.type.should.equal('application/json');
                    res.charset.should.equal('utf-8');
                    res.body.should.be.an('array');
                    res.body.length.should.equal(0);
                });
        });
    });

    describe('POST', function() {
        it('should allow adding a user', function() {
            var user = {
                username: 'joe'
            };
            return chai.request(app)
                .post(this.pattern.stringify())
                .send(user)
                .then(function(res) {
                    res.should.have.status(201);
                    res.type.should.equal('application/json');
                    res.charset.should.equal('utf-8');
                    res.should.have.header('location');
                    res.body.should.be.an('object');
                    res.body.should.be.empty;

                    return chai.request(app)
                        .get(res.headers.location);
                })
                .then(function(res) {
                    res.body.should.be.an('object');
                    res.body.should.have.property('username');
                    res.body.username.should.be.a('string');
                    res.body.username.should.equal(user.username);
                    res.body.should.have.property('_id');
                    res.body._id.should.be.a('string');
                });
        });
    });
});
