'use strict';


var Mboard = require('../models').model('Mboard');
var express = require('express');
var http = require('http').Server(express);
var io = require('socket.io')(http);

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
            Mboard.findOne({boardName: req.query.q}).exec().then(
               function(result) {
                res.json(result);
            }).catch(function(error) {
                next(error);
            });

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

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

http.listen(process.env.PORT, function(){
  console.log('listening on *:3030');
});
