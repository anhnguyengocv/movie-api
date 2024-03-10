const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    genre: {
        name: String,
        description: String
    },
    director: {
        name: String,
        bio: String,
    },
    actors: [String],
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    birthday: Date,
    favMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;