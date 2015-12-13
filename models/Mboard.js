 'use strict';

var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// export a mongoose model

var mboardSchema = new Schema({
  boardName : {
    type : String,
    unique : true,
    required : true
  },
    messages : {
    type: []
  }
});

module.exports = mboardSchema;
