var chai = require('chai');
var User = require('../models/user');


var should = chai.should();

describe("Check if user is created correctly", function() {
  it('should create the user with the correct name', function() {
    var casey = new User('Casey');
    casey.name.should.equal('Casey');
  });
});
