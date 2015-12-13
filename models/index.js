'use strict';

var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.model('User', require('./User'));
mongoose.model('Mboard', require('./Mboard'));

mongoose.connect("mongodb://localhost/community-cares");

module.exports = mongoose;
