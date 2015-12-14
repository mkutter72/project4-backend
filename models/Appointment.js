 'use strict';

//var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// export a mongoose model

var appointmentSchema = new Schema({
  date : {
    type : String,
    required : true
  },
  userName : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  time : {
    type : String,
    required : true
  },
});

module.exports = appointmentSchema;
