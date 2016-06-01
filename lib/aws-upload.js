'use strict';

var crypto = require('crypto');
var util = require('util');
var getFileType = require('file-type');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

//var Wallpost = require('../models/Wallpost.js')

var Wallpost = require('../models').model('Wallpost');

var bucket = process.env.AWS_BUCKET;


var awsUpLoad = function awsUpLoad(buffer, userName, title, caption, date, imageWidth, imageHeight) {
  var fileType = getFileType(buffer);

  if (!fileType){
    fileType = {
      ext: 'bin',
      mime: 'application/octet-stream'
    };
  };

  var awsDirectory = (new Date()).toISOString().split('T')[0];
  var awsFileName = crypto.randomBytes(16).toString('hex');
  var key = util.format('%s/%s.%s',awsDirectory,awsFileName,fileType.ext);

  var s3params = {
    ACL: 'public-read',
    Bucket: bucket,
    ContentType: fileType.mime,
    Key: key,
    Body: buffer
  };

  var s3Promise = new Promise(function(resolve, reject) {
    s3.upload(s3params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  return s3Promise.then(function(data){
      return Wallpost.create({
          userName : userName,
          date : date,
          title : title,
          text: caption,
          photo: data.Location,
          imageHeight: imageHeight,
          imageWidth: imageWidth
    });
  });


};

module.exports = awsUpLoad
