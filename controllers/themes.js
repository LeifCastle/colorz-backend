// Imports
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// import the Theme model
const { User, Theme } = require("../models");

// connect to the database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create connection object
const db = mongoose.connection;

// GET make a themes route to get all themes
router.get("/:email", (req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) => {
      console.log("themes", user.themes);
      res.header("Access-Control-Allow-Origin", "*");
      res.json(user.themes);
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
      //--Create a new theme object
      let newTheme = {
        name: req.body.name,
        backgroundColor: req.body.backgroundColor,
        elements: [...req.body.elements],
      };
      //--Push the theme object to the embeded theme array
      user.themes.push(newTheme);
      //--Save and populate user model
      user.save().then((updatedUser) => {
        res.header("Access-Control-Allow-Origin", "*");
        console.log(`${req.body.user}'s new theme: `, updatedUser);
        return res.json({ updatedUser });
      });
    })
    .catch((error) => {
      console.log(`Error finding user: ${error}`);
    });
});

//Not implemented yet (new theme created every time you save)
// router.put("/:id", (req, res) => {
//   const updateQuery = {};
//   // check color
//   if (req.body.color) {
//     updateQuery.color = req.body.color;
//   }
//   // check height
//   if (req.body.height) {
//     updateQuery.height = req.body.height;
//   }
//   // check width
//   if (req.body.width) {
//     updateQuery.width = req.body.width;
//   }
//   // check textSize
//   if (req.body.textSize) {
//     updateQuery.textSize = req.body.textSize;
//   }

//   Theme.findByIdAndUpdate(req.params.id, { $set: updateQuery }, { new: true })
//     .then((theme) => {
//       return res.json({
//         message: `Theme at ${req.params.id} was updated`,
//         theme: theme,
//       });
//     })
//     .catch((error) => {
//       console.log("error inside PUT /themes/:id", error);
//       return res.json({ message: "error occured, please try again." });
//     });
// });

// DELETE route for /themes/:name
router.delete("/:name", (req, res) => {
  User.findOne({ email: req.body.user })
    .then((foundUser) => {
      const themeToDelete = foundUser.themes.find(
        (theme) => theme.name === req.params.name
      );
      if (themeToDelete) {
        //Splice the theme array to remove the theme by it's index
        foundUser.themes.splice(foundUser.themes.indexOf(themeToDelete), 1);
        //Save the user model and return a response with the updated theme array
        foundUser.save().then((updated) => {
          console.log("UserThemes: ", updated);
          res.json(updated);
        });
      } else {
        console.log("Theme not found");
        res.json({ error: "Theme not found" });
      }
    })
    .catch((error) => {
      console.log("User not found ", error);
      res.json({ error: "User not found" });
    });
});

module.exports = router;

// User.findOne({ email: req.body.user })
//     .then((foundUser) => {
//        foundUser.themes.forEach((theme) => {
//         if (theme.name == req.params.name) {
//           console.log("AHA GOTCHA");
//           delete theme;
//           foundUser.save().then((ud) => {
//             console.log("Ud: ", ud);
//           });
//         }
//       });
//   })

// User.findOneAndUpdate(
//   { email: req.body.user },
//   { themes: { $elemMatch: { name: req.params.name } } },
//   { $unset: { themes: "" } }
// );
