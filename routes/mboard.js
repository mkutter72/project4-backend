 'use strict';


var express = require('express');
var router = express.Router();
var mboardCtrl = require('../controllers/mboard');
var authCtrl = require('../controllers/auth');

router.get('/', mboardCtrl.mboard.get);

router.route('/makenew').
//all(authCtrl.checkAuth).
get(mboardCtrl.deny).
post(mboardCtrl.makenew.post);


router.route('/update').
get(mboardCtrl.deny).
patch(mboardCtrl.update.patch);


router.route('/board').
//all(authCtrl.checkAuth).
get(mboardCtrl.deny).
get(mboardCtrl.mboard.get);


router.route('/destroy').
//all(authCtrl.checkAuth).
get(mboardCtrl.deny).
delete(mboardCtrl.destroy.delete);


module.exports = router;
