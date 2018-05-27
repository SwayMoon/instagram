var LocalStrategy = require('passport-local').Strategy;
var bycrypt = require('bycrypt');

model.exports = function(passport) {

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
    }, processSignupCallback));
};


function processSignupCallback(request, email, password, done) {
      UserModel.findOne({
            where: {
                  'email' : email
            },
            attributes: ['id']
      })
      .then(function(user){
          if (user) {
              return done(null, false, 'That email is already taken.');
          } else {
              var userToCreate = req.body;
            bycrypt.hash(userToCreate.password, 10, function(err, hash) {
              userToCreate.password = hash;
              UserModel.create(userToCreate)
              .then(function)(createdRecord) {
                  createdRecord.password = undefined;
                  return done(null, createdRecord);
              });
            });
            );
          }
      });
}

model.exports = function(passport) {

      passport.serializeUser(function(user, done){
          done(null, user.id);
      });

      passport.use('local-signup', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
      }, processLoginCallback));
};

function processLoginCallback(email, password, done) {
  user.findOne({
      where: {
            'email' : email
      }
  })
  .then(function(user){
      if (!user) {
          return done(null, false)
      }

      bycrypt.compare(password, user.password, function(err, result){
          user.password = undefined;
          return result ? done(null, user) : done(null, false);
      });
  });
}
