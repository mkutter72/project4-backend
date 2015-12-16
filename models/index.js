'use strict';

var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.model('User', require('./User'));
mongoose.model('Mboard', require('./Mboard'));
mongoose.model('Appointment', require('./Appointment'));

mongoose.connect(process.env.MONGOLAB_URI);

module.exports = mongoose;
