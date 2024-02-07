const passport = require('passport')
const  GoogleStrategy = require('passport-google-oauth2').Strategy;
const  GOOGLE_CLIENT_ID = '118778821004-1rr0qu4ttbna3971s5sfrf2i49v39n29.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5500/api/connexion",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));