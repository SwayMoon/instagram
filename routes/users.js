var express = require('express');
var router = express.Router();

/* GET users listing. */
//router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
//});

module.exports = function(passport) {
  //Post /user.signup
  router.post('/signup', function(req, res) {
      res.send('got the signup request')
  });
  //Post /user/login
  router.post('/login', passport.authenticate('local-login'),
      function(req, res) {
        res.json({user: req.user})
      });

    return router;
};
