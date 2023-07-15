const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoritesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    theme: {
        type: Schema.Types.ObjectId,
        ref: 'Theme',
        required: true
    }
}, { timestamps: true });

const Favorite = mongoose.model('Favorite', FavoritesSchema);

module.exports = Favorite;
