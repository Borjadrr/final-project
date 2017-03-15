const _ = require('lodash');
mongoose = require('mongoose');
User = require('./user.model');

const passport = require("passport");
const LocalStrategy      = require('passport-local').Strategy;

const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

exports.createUser = function(req, res, next) {
	let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser =  new User({
      username,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
      } else {
        req.login(newUser, function(err) {
          if (err) {
            return res.status(500).json({
              message: 'something went wrong :('
            });
          }
					console.log(req.user);
          res.status(200).json(req.user);
        });
      }
    });
  });
};

exports.logUser = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {

		if (err) {

			return next(err); }

    if (!user) { return res.status(401).json(info); }

    req.login(user, function(err) {

			if (err) {
        return res.status(500).json({
          message: 'something went wrong :('
        });
      }
			console.log("request user:", req.user);
      res.status(200).json(req.user);
    });
  })(req, res, next);
};

exports.logOutUser =  function(req, res) {

  req.logout();
  res.status(200).json({ message: 'Success' });
};

exports.authUser = function(req, res) {
  if(req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }

  return res.status(403).json({ message: 'Unauthorized' });
};
/*
exports.getUser = function(req, res) {
	const userId = req.body.userId;
	console.log(userId);
};
*/
