 'use strict';


var express = require('express');
var router = express.Router();
var wallpostCtrl = require('../controllers/wallpost');
var authCtrl = require('../controllers/auth');

router.get('/', wallpostCtrl.retrieve.get);

router.route('/makenew').
//all(authCtrl.checkAuth).
get(wallpostCtrl.deny).
post(wallpostCtrl.makenew.post);


router.route('/update').
get(wallpostCtrl.deny).
patch(wallpostCtrl.update.patch);


router.route('/retrieve').
//all(authCtrl.checkAuth).
get(wallpostCtrl.deny).
get(wallpostCtrl.retrieve.get);


router.route('/destroy').
//all(authCtrl.checkAuth).
get(wallpostCtrl.deny).
delete(wallpostCtrl.destroy.delete);


module.exports = router;
