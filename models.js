const mongoose = require("mongoose");

let movieSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    genre: {
      name: String,
      description: String
    },
    director: {
      name: String,
      bio: String,
      birth: String,
    },
    imagePath: String,
    featured: Boolean
  });
  
let userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    birthday: Date,
    favMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }]
  });
  
  let Movie = mongoose.model('movies', movieSchema);
  let User = mongoose.model('users', userSchema);
  
  module.exports.Movie = Movie;
  module.exports.User = User;
