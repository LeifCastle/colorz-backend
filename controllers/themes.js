// Imports
const express = require("express");
const router = express.Router();

// import the Theme model
const { Theme } = require("../models");

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
  // read the req.body - data for the new theme coming in at
  console.log("data from request (theme)", req.body); // object

  // create a theme
  Theme.create({
    name: req.body.name,
    backgroundColor: req.body.backgroundColor,
  })
    .then((theme) => {
      console.log("new theme created ->", theme);
      req.body.elements.forEach((element) => {
        theme.elements.push(element); //Pushes an object with data matching element schema
      });
      theme.save().then((newTheme) => {
        newTheme
          .populate("elements")
          .then((result) => {
            console.log(`Result: ${result}`);
            res.header("Access-Control-Allow-Origin", "*");
            return res.json({ theme: newTheme });
          })
          .catch((error) => {
            res.json(`Error populating theme with elements: ${error}`);
          });
      });
    })
    .catch((error) => {
      console.log("error", error);
      res.header("Access-Control-Allow-Origin", "*");
      return res.json({ message: "error occured, please try again." });
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
