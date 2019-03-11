const router = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Article = mongoose.model("Article");

router.route("/").get((req, res) => {
	res.render("pages/home", { user: { name: "Chandra", age: 21 } });
});
router.route("/user").get((req, res) => {
	res.send(req.user);
});
router
	.route("/article/new")
	.get((req, res) => {
		if (req.session.user || req.user) {
			return res.render("pages/article");
		}
		return res.redirect("/login");
	})
	.post((req, res) => {
		const tags = req.body.tags.split(",");
		new Article({
			_id: new mongoose.Types.ObjectId(),
			name: req.body.article,
			description: req.body.description,
			author: req.user._id || req.session.user._id,
			tags: tags
		})
			.save()
			.then(article => {
				res.redirect("/dashboard");
			})
			.catch(err => console.log(err));
	});
router
	.route("/login")
	.get((req, res) => {
		res.render("pages/login", { errors: {} });
	})
	.post((req, res) => {
		User.findOne({ email: req.body.email })
			.then(user => {
				if (!user) {
					res.render("pages/login", {
						errors: { message: "invalid username or password" }
					});
				} else {
					req.session.user = user;
					res.redirect("/");
				}
			})
			.catch(err => {
				res.render("pages/login", { errors: err });
			});
	});
router.route("/dashboard").get((req, res) => {
	Article.find()
		.exec()
		.then(articles => {
			res.render("pages/dashboard", {
				articles: articles
			});
		})
		.catch(err => res.redirect("/"));
});
router.route("/logout").get((req, res) => {
	req.logout();
	res.redirect("/");
});

module.exports = router;
