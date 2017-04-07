
var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Contact = require('../models/contact');
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

    const contact = new Contact({
      user_id: req.body.user_id,
      contact_id: req.body.contact_id
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
          contact: contact
        });
      }
    })

  });


module.exports = router;