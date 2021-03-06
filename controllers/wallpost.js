'use strict';

var awsUpLoad = require('../lib/aws-upload');
var Wallpost = require('../models').model('Wallpost');

module.exports = {
    deny : function(req, res) {
        res.sendStatus(405);
    },
    makenew : {
        post : function(req, res, next) {
            if(!req.body) {
                console.log(req.body);
                var err = new Error("Empty fields.");
                console.log("empty fields")
                return next(err);
            }

            var d = new Date();

            if (!req.file) {
                var pWallpost = new Promise(function(resolve, reject) {
                    Wallpost.create({
                        userName : req.user.userName,
                        date : d.toLocaleString(),
                        title : req.body.title,
                        text: req.body.caption,
                        photo: ""

                    }, function(err, user) {
                        if(err) {
                            reject(err);
                            return;
                        }

                        resolve(user);
                    });
                });
                pWallpost.then(function() {
                    res.sendStatus(200);
                }).catch(function(err) {
                    next(err);
                });
            } else {
                awsUpLoad(req.file.buffer, req.user.userName, req.body.title, req.body.caption, d.toLocaleString(),req.body.imageWidth,req.body.imageHeight).then(function(data){
                    console.log(data);
                    res.sendStatus(200);
                }).catch(function(err) {
                    next(err);
                });
            }
        }
    },


    update : {
        patch : function(req, res, next) {
            res.json({title: "patch wallpost"});

        }

    },

    retrieve : {
        get : function(req, res, next){

         Wallpost.find().exec().then(
               function(result) {
                res.json(result);
            }).catch(function(error) {
                next(error);
            });

        }
    },

    destroy: {
        delete : function(req, res, next) {
            res.json({title: "delete wallpost"});
        }
     }



};
