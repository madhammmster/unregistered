
var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Ride = require('../models/ride');
//const passport = require('passport');
//const auth = require('../middlewares/authorization');


// router.get('/', function(req, res) {

//   respond(res, '/index', {
//     title: 'Logs',
//     articles: articles,
//     page: page + 1,
//     pages: Math.ceil(count / limit)
//   });
// });

//router.post('/logs', auth.requiresLogin,
router.post('/',
  function (req, res) {

    const ride = new Ride({
      user_id: req.body.user_id,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      car_id: req.body.car_id
    });

    ride.save(function (err) {
      if (err) {
        res.json({
          status: 500,
          error: err
        });
      } else {
        res.json({
          status: 200,
          ride: ride
        });
      }
    })

  });


module.exports = router;