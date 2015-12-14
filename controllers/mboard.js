'use strict';


var Mboard = require('../models').model('Mboard');

module.exports = {
    deny : function(req, res) {
        res.sendStatus(405);
    },
    makenew : {
        post : function(req, res, next) {
            res.json({title: "makenew messageboard"});
            // if(!req.body || !req.body.surveyname || !req.body.surveyquestion ) {
            //     var err = new Error("Empty fields.");
            //     return next(err);
            // }

            // var pResults = new Promise(function(resolve, reject) {
            //     Result.create({
            //         surveyName : req.body.surveyname,
            //         surveyQuestion : req.body.surveyquestion

            //     }, function(err, user) {
            //         if(err) {
            //             reject(err);
            //             return;
            //         }

            //         resolve(user);
            //     });
            // });
            // pResults.then(function() {
            //     res.sendStatus(200);
            // }).catch(function(err) {
            //     next(err);
            // });
        }
    },


    update : {
        patch : function(req, res, next) {
            res.json({title: "patch messageboard"});

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

    mboard : {
        get : function(req, res, next){
            res.json({title: "get messageboard"});

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
            res.json({title: "destroy messageboard"});

            // console.log(req.query.q);
            // Result.remove({surveyName: req.query.q}).then(function() {
            //     res.sendStatus(200).catch(function(error) {
            //         next(error);
            //     });
            // });
        }
     }



};
