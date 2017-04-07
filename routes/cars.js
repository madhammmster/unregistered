
var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Car = require('../models/car');
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

    const car = new Car({
      user_id: req.body.user_id,
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year
    });

    car.save(function (err) {
      if (err) {
        res.json({
          status: 500,
          error: err
        });
      } else {
        res.json({
          status: 200,
          car: car
        });
      }
    })

  });


module.exports = router;