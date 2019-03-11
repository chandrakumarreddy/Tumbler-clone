const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = mongoose.model("User");

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/redirect"
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({ googleId: profile.id }).then(user => {
				if (user) {
					done(null, user);
				} else {
					new User({
						_id: new mongoose.Types.ObjectId(),
						googleId: profile.id,
						username: profile._json.name,
						following: [profile._json.name],
						picture: profile._json.picture,
						followers: []
					})
						.save()
						.then(user => {
							done(null, user);
						});
				}
			});
		}
	)
);
