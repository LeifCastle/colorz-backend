// Imports
const express = require("express");
const router = express.Router();

// import the Theme model
const { User, Theme } = require("../models");

// GET make a themes route to get all themes
router.get("/", (req, res) => {
  Theme.find({})
    .then((themes) => {
      console.log("themes", themes);
      res.header("Access-Control-Allow-Origin", "*");
      res.json({ themes: themes });
    })
    .catch((error) => {
      console.log("error", error);
      res.header("Access-Control-Allow-Origin", "*");
      res.json({ message: "There was an issue, please try again..." });
    });
});

// POST route /themes/new - create a new theme
router.post("/new", (req, res) => {
  console.log(`Data request by ${req.body.user} ===>`, req.body);

  //----Find the user
  User.findOne({ email: req.body.user })
    .then((user) => {
      //--Create a new theme document
      const theme = new Theme({
        name: req.body.name,
        backgroundColor: req.body.backgroundColor,
        elements: [],
      });

      //--Populate embedded element document with the theme's elements
      req.body.elements.forEach((element) => {
        theme.elements.push(element); //Pushes an object with data matching element schema
      });

      //--Save and populate models
      theme.save().then((newTheme) => {
        user.themes.push(newTheme);
        user.save().then((updatedUser) => {
          res.header("Access-Control-Allow-Origin", "*");
          console.log(`${req.body.user}'s new theme: `, updatedUser);
          return res.json({ updatedUser });
        });
      });
    })
    .catch((error) => {
      console.log(`Error finding user: ${error}`);
    });
});

router.put("/:id", (req, res) => {
  const updateQuery = {};
  // check color
  if (req.body.color) {
    updateQuery.color = req.body.color;
  }
  // check height
  if (req.body.height) {
    updateQuery.height = req.body.height;
  }
  // check width
  if (req.body.width) {
    updateQuery.width = req.body.width;
  }
  // check textSize
  if (req.body.textSize) {
    updateQuery.textSize = req.body.textSize;
  }

  Theme.findByIdAndUpdate(req.params.id, { $set: updateQuery }, { new: true })
    .then((theme) => {
      return res.json({
        message: `Theme at ${req.params.id} was updated`,
        theme: theme,
      });
    })
    .catch((error) => {
      console.log("error inside PUT /themes/:id", error);
      return res.json({ message: "error occured, please try again." });
    });
});

// DELETE route for /themes/:id
router.delete("/:id", (req, res) => {
  Theme.findByIdAndDelete(req.params.id)
    .then((result) => {
      return res.json({ message: `Theme at ${req.params.id} was deleted` });
    })
    .catch((error) => {
      console.log("error inside DELETE /themes/:id", error);
      return res.json({ message: "error occured, please try again." });
    });
});

module.exports = router;
