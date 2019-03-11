const passport = require("passport");
const router = require("express").Router();

router.route("/").get(passport.authenticate("google", { scope: ["profile"] }));
router.route("/redirect").get(passport.authenticate("google"), (req, res) => {
	res.redirect("/");
});

module.exports = router;
