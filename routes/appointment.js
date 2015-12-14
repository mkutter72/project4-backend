 'use strict';


var express = require('express');
var router = express.Router();
var appointmentCtrl = require('../controllers/appointment');
var authCtrl = require('../controllers/auth');

router.get('/', appointmentCtrl.appointment.get);

router.route('/makenew').
//all(authCtrl.checkAuth).
get(appointmentCtrl.deny).
post(appointmentCtrl.makenew.post);


router.route('/update').
get(appointmentCtrl.deny).
patch(appointmentCtrl.update.patch);


router.route('/appointment').
//all(authCtrl.checkAuth).
get(appointmentCtrl.deny).
get(appointmentCtrl.appointment.get);


router.route('/destroy').
//all(authCtrl.checkAuth).
get(appointmentCtrl.deny).
delete(appointmentCtrl.destroy.delete);


module.exports = router;
