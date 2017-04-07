
var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Log = require('../models/log');
const passport = require('passport');
const auth = require('../middlewares/authorization');
/**
 * List
 */

// article routes
  // router.param('id', logs.load);
router.get('/logs', function(req, res) {
  
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const _id = req.query.item;
  const limit = 30;

  const options = {
    limit: limit,
    page: page
  };

  if (_id) options.criteria = { _id };

  const articles = Article.list(options);
  const count = Article.count();

  respond(res, '/index', {
    title: 'Logs',
    articles: articles,
    page: page + 1,
    pages: Math.ceil(count / limit)
  });
});

//router.post('/logs', auth.requiresLogin,
router.post('/',
  function (req, res) {
    const log = new Log({
      type: req.body.type,
      value: req.body.value,
      ride_id: req.body.ride_id
    });
    
    console.log(req.body);


    log.save(function (err) {
      if (err) {
        res.json({
          status: 500,
          error: err
        });
      } else {
        res.json({
          status: 200,
          log: log
        });
      }
    })

  });
module.exports = router;