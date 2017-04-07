
var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const DangerousCar = require('../models/dangerous_car');
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

    const dangerousCar = new DangerousCar({
      car_id: req.body.car_id,
      last_notification_time: req.body.last_notification_time,
      active: req.body.active
    });

    dangerousCar.save(function (err) {
      if (err) {
        res.json({
          status: 500,
          error: err
        });
      } else {
        res.json({
          status: 200,
          dangerousCar: dangerousCar
        });
      }
    })

  });


module.exports = router;