 'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// export a mongoose model

var wallpostSchema = new Schema({
  date : {
    type : String,
    required : true
  },
  userName : {
    type : String,
    required : true
  },
  title : {
    type : String
  },
  text : {
    type : String
  },
  photo : {
    type : String
  },
  imageWidth : {
    type : String
  },
  imageHeight : {
    type : String
  },
});

module.exports = wallpostSchema;
