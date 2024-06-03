// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../models/userModel");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "auth/google/callback"
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       const existingUser = await User.findOne({ googleId: profile.id });
//       if (existingUser) {
//         return done(null, existingUser);
//       }
//       const user = await new User({
//         googleId: profile.id,
//         username: profile.displayName,
//         email: profile.emails[0].value,
//         image: profile.photos[0].value
//       }).save();
//       done(null, user);
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });
