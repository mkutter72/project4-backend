'use strict';


var Wallpost = require('../models').model('Wallpost');

module.exports = {
    deny : function(req, res) {
        res.sendStatus(405);
    },
    makenew : {
        post : function(req, res, next) {
            if(!req.body || !req.body.userName || !req.body.postDate || !req.body.postText
                || !req.body.postTitle || !req.body.photoPath ) {
                var err = new Error("Empty fields.");
                return next(err);
            }

            var pWallpost = new Promise(function(resolve, reject) {
                Wallpost.create({
                    userName : req.body.userName,
                    date : req.body.postDate,
                    title : req.body.postTitle,
                    text: req.body.postText,
                    photo:req.body.photoPath

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
        }
    },


    update : {
        patch : function(req, res, next) {
            res.json({title: "patch wallpost"});

            // if(!req.body || !req.body.takerage || !req.body.takercity || !req.body.takernickname || !req.body.surveyanswer || !req.body.surveyname ) {
            //     var err = new Error("Empty fields.");
            //     return next(err);

            // };

            // Result.update({surveyName : req.body.surveyname},
            //     {$push: {
            //       takerAnswers: {takerage: req.body.takerage, takercity: req.body.takercity , takernickname: req.body.takernickname, surveyanswer: req.body.surveyanswer}
            //   }}).then(function() {
            //     res.sendStatus(200).catch(function(error) {
            //         next(error);
            //     });
            // });
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

            // Result.findOne({surveyName: req.query.q}).exec().then(
            //    function(result) {
            //     res.json(result);
            // }).catch(function(error) {
            //     next(error);
            // });

        }
    },

    destroy: {
        delete : function(req, res, next) {
            res.json({title: "delete wallpost"});
            // console.log(req.query.q);
            // Appointment.remove({date: req.query.q}).then(function() {
            //     res.sendStatus(200).catch(function(error) {
            //         next(error);
            //     });
            // });
        }
     }



};
