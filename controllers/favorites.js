// Imports
const express = require('express');
const router = express.Router();

// import the Favorite and User models
const { Favorite, User, Theme } = require('../models');

// GET route to get all favorites
router.get('/', (req, res) => {
    Favorite.find({})
        .populate('user theme') // populate user and theme data
        .then((favorites) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.json({ favorites: favorites });
        })
        .catch((error) => {
            console.log('error', error);
            res.header("Access-Control-Allow-Origin", "*");
            res.json({ message: 'There was an issue, please try again...' });
        });
});

// POST route to create a new favorite
router.post('/new', (req, res) => {
    // create a favorite
    Favorite.create({
        user: req.body.userId,
        theme: req.body.themeId
    })
        .then((newFavorite) => {
            console.log('new favorite created ->', newFavorite);
            res.header("Access-Control-Allow-Origin", "*");
            return res.json({ favorite: newFavorite });
        })
        .catch((error) => {
            console.log('error', error);
            res.header("Access-Control-Allow-Origin", "*");
            return res.json({ message: 'error occured, please try again.' });
        });
});

// PUT route to update a favorite
router.put('/:id', (req, res) => {
    const updateQuery = {}
    // check user
    if (req.body.userId) {
        updateQuery.user = req.body.userId
    }
    // check theme
    if (req.body.themeId) {
        updateQuery.theme = req.body.themeId
    }

    Favorite.findByIdAndUpdate(req.params.id, { $set: updateQuery }, { new: true })
        .then((favorite) => {
            return res.json({ message: `Favorite at ${req.params.id} was updated`, favorite: favorite });
        })
        .catch((error) => {
            console.log('error inside PUT /favorites/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});


// DELETE route to delete a favorite
router.delete('/:id', (req, res) => {
    Favorite.findByIdAndDelete(req.params.id)
        .then((result) => {
            return res.json({ message: `Favorite at ${req.params.id} was deleted` });
        })
        .catch((error) => {
            console.log('error inside DELETE /favorites/:id', error);
            return res.json({ message: 'error occured, please try again.' });
        });
});

module.exports = router;
