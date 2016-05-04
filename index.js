var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

var User = require('./models/user');

var jsonParser = bodyParser.json();

app.set('port', (process.env.PORT || 5000));

app.get('/users', function(req, res) {
    User.find({}).then(function(users) {
        res.json(users);
    });
});

app.get('/users/:userId', function(req, res) {
    User.findOne({
        _id: req.params.userId
    }).then(function(user) {
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
            return;
        }
        res.json(user);
    }).catch(function(err) {
        res.status(500).send({
            message: 'Internal server error'
        });
    });
});


app.post('/users', jsonParser, function(req, res) {

    var user = new User({
        username: req.body.username
    });

    user.save().then(function(user) {
        res.location('/users/' + user._id).status(201).json({});
    }).catch(function(err) {
        res.status(500).send({
            message: 'Internal server error'
        });
    });
});

var databaseUri = global.databaseUri || 'mongodb://localhost/travis-hello-world';
mongoose.connect(databaseUri).then(function() {
    app.listen(app.get('port'), function() {
        console.log('Node app is running on port', app.get('port'));
    });
});

module.exports = app;
