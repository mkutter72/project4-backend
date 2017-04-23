'use strict';


var Appointment = require('../models').model('Appointment');

module.exports = {
    deny : function(req, res) {
        res.sendStatus(405);
    },
    makenew : {
        post : function(req, res, next) {
            if(!req.body || !req.user.userName || !req.body.appDate || !req.body.appTime
                || !req.body.appDescription ) {
                var err = new Error("Empty fields.");
                return next(err);
            }

            var pAppointment = new Promise(function(resolve, reject) {
                Appointment.create({
                    userName : req.user.userName,
                    date : req.body.appDate,
                    description : req.body.appDescription,
                    time: req.body.appTime

                }, function(err, user) {
                    if(err) {
                        reject(err);
                        return;
                    }

                    resolve(user);
                });
            });
            pAppointment.then(function() {
                res.sendStatus(200);
            }).catch(function(err) {
                next(err);
            });
        }
    },


    update : {
        patch : function(req, res, next) {
            res.json({title: "patch appointment"});

        }

    },

    appointment : {
        get : function(req, res, next){
         Appointment.find().exec().then(
               function(result) {
                res.json(result);
            }).catch(function(error) {
                next(error);
            });

        }
    },

    destroy: {
        delete : function(req, res, next) {
            console.log(req.query.q);
            Appointment.remove({date: req.query.q}).then(function() {
                res.sendStatus(200).catch(function(error) {
                    next(error);
                });
            });
        }
     }



};
