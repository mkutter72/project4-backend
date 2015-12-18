'use strict';


var Mboard = require('../models').model('Mboard');


module.exports = {
    deny : function(req, res) {
        res.sendStatus(405);
    },
    makenew : {
        post : function(req, res, next) {
            if(!req.body || !req.body.boardname) {
                var err = new Error("Empty fields.");
                return next(err);
            }

            var pMboard = new Promise(function(resolve, reject) {
                Mboard.create({
                    boardName : req.body.boardname

                }, function(err, user) {
                    if(err) {
                        reject(err);
                        return;
                    }

                    resolve(user);
                });
            });
            pMboard.then(function() {
                res.sendStatus(200);
            }).catch(function(err) {
                next(err);
            });
        }
    },


    update : {
        patch : function(req, res, next) {
            if(!req.body || !req.body.messagetext || !req.body.boardname || !req.user.userName) {
                var err = new Error("Empty fields.");
                return next(err);

            };

            var d = new Date();
            console.log("bname:" + req.body.boardname);
            console.log("user:" + req.user.userName);
            console.log("time:" + d.toLocaleString());
            console.log("text:" + req.body.messagetext);
            Mboard.update({boardName : req.body.boardname},
                {$push: {
                  messages: {userName: req.user.userName,
                  mesageTime: d.toLocaleString(),
                  messageText: req.body.messagetext}
              }}).then(function() {
                res.sendStatus(200).catch(function(error) {
                    next(error);
                });
            });
        }

    },

    mboard : {
        get : function(req, res, next){
            if (req.query.q) {
                Mboard.findOne({boardName: req.query.q}).exec().then(
                   function(result) {
                    res.json(result);
                }).catch(function(error) {
                    next(error);
                });
            } else {
               Mboard.find({}).exec().then(
                    function(result) {
                    console.log("length: " +result.length);
                    var retarry= [];
                    for (var i=0; i < result.length; i++)
                        retarry[i] = result[i].boardName;

                    var retjson = {"boardnames": retarry};
                    res.json(retjson);
                }).catch(function(error) {
                    next(error);
                });
            }
        }
    },

    destroy: {
        delete : function(req, res, next) {
            Mboard.remove({boardName: req.query.q}).then(function() {
                res.sendStatus(200).catch(function(error) {
                    next(error);
                });
            });
        }
     }
};


