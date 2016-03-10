'use strict';

var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.model('User', require('./User'));
mongoose.model('Mboard', require('./Mboard'));
mongoose.model('Appointment', require('./Appointment'));
mongoose.model('Wallpost', require('./Wallpost'));

mongoose.connect("mongodb://localhost/community-cares");

module.exports = mongoose;
