// Imports
require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { JWT_SECRET } = process.env;

// import the User model
const { User } = require("../models");

// GET make a users route to get all users
router.get("/", (req, res) => {
  User.find({})
    .then((users) => {
      console.log("users", users);
      res.header("Access-Control-Allow-Origin", "*");
      res.json({ users: users });
    })
    .catch((error) => {
      console.log("error", error);
      res.header("Access-Control-Allow-Origin", "*");
      res.json({ message: "There was an issue, please try again..." });
    });
});

// GET route provides user profile data
router.get(
  "/account",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("====> inside /account");
    console.log(req.body);
    console.log("====> user");
    console.log(req.user);
    const { id, firstName, lastName, email } = req.user; // object with user object inside
    res.json({
      id,
      firstName,
      lastName,
      email,
    });
  }
);

// GET route queries users by email domain
router.get("/:field/:value", (req, res) => {
  if (req.params.field === "email" || req.params.field === "Email") {
    User.find({ email: req.params.value })
      .then((user) => {
        console.log("user", user);
        res.header("Access-Control-Allow-Origin", "*");
        return res.json({ user: user });
      })
      .catch((error) => {
        console.log("error", error);
        res.header("Access-Control-Allow-Origin", "*");
        res.json({ message: "There was an issue, please try again..." });
      });
  }
});

router.post("/signup", (req, res) => {
  console.log("===> Inside of /signup");
  console.log("===> /register -> req.body", req.body);

  User.findOne({ email: req.body.email })
    .then((user) => {
      // if email already exists, a user will come back
      if (user) {
        // send a 400 response
        return res.status(400).json({ message: "Email already exists" });
      } else {
        // Create a new user
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        });

        // Salt and hash the password - before saving the user
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw Error;

          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.log("==> Error inside of hash", err);
            // Change the password in newUser to the hash
            newUser.password = hash;
            newUser
              .save()
              .then((createdUser) => {
                // remove password from being returned inside of response, still in DB
                if (createdUser.password) {
                  createdUser.password = "..."; // hide the password
                  res.json({ user: createdUser });
                }
              })
              .catch((err) => {
                console.log("error with creating new user", err);
                res.json({ message: "Error occured... Please try again." });
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log("Error finding user", err);
      res.json({ message: "Error occured... Please try again." });
    });
});

router.post("/login", async (req, res) => {
  console.log("===> Inside of /login");
  console.log("===> /login -> req.body", req.body);

  const foundUser = await User.findOne({ email: req.body.email });

  if (foundUser) {
    // user is in the DB
    let isMatch = await bcrypt.compareSync(
      req.body.password,
      foundUser.password
    );
    console.log("Does the passwords match?", isMatch);
    if (isMatch) {
      // if user match, then we want to send a JSON Web Token
      // Create a token payload
      // add an expiredToken = Date.now()
      // save the user
      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) {
          res
            .status(400)
            .json({ message: "Session has endedd, please log in again" });
        }
        const legit = jwt.verify(token, JWT_SECRET, { expiresIn: 60 });
        console.log("===> legit", legit);
        delete legit.password; // remove before showing response
        res.json({ success: true, token: `Bearer ${token}`, userData: legit });
      });
    } else {
      return res
        .status(400)
        .json({ message: "Email or Password is incorrect" });
    }
  } else {
    return res.status(400).json({ message: "User not found" });
  }
});

router.put("/:id", (req, res) => {
  const updateQuery = {};
  // check firstName
  if (req.body.firstName) {
    updateQuery.firstName = req.body.firstName;
  }
  // check lastName
  if (req.body.lastName) {
    updateQuery.lastName = req.body.lastName;
  }
  // check email
  if (req.body.email) {
    updateQuery.email = req.body.email;
  }

  User.findByIdAndUpdate(req.params.id, { $set: updateQuery }, { new: true })
    .then((user) => {
      return res.json({ message: `${user.email} was updated`, user: user });
    })
    .catch((error) => {
      console.log("error inside PUT /users/:id", error);
      return res.json({ message: "error occured, please try again." });
    });
});

//-------------Not implemented yet----------------\\

// DELETE route for /users/:id
// router.delete("/:id", (req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then((result) => {
//       return res.json({ message: `user at ${req.params.id} was delete` });
//     })
//     .catch((error) => {
//       console.log("error inside DELETE /users/:id", error);
//       return res.json({ message: "error occured, please try again." });
//     });
// });

module.exports = router;
