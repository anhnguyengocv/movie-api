const mongoose = require("mongoose");

let movieSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'movies'},
    title: {type: String, required: true},
    description: {type: String, required: true},
    genre: {
      _id: {type: mongoose.Schema.Types.ObjectId, ref: 'genres'},
      name: String,
      description: String
    },
    director: {
      _id: {type: mongoose.Schema.Types.ObjectId, ref: 'directors'},
      name: String,
      bio: String,
      birth: String,
    },
    imagePath: String,
    featured: Boolean
  });
  
let userSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    birthday: Date,
    favMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }]
  });

let directorSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'directors'},
    name: {type: String, required: true},
    bio: {type: String, required: true},
    birth: {type: String, required: true}
})

let genreSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, ref: 'genres'},
  name: {type: Staring, required: true},
  description: {type: String, required: true}
})
  
  let Movie = mongoose.model('movies', movieSchema);
  let User = mongoose.model('users', userSchema);
  let Genre = mongoose.model('genres', genreSchema);
  let Director = mongoose.model('directors', directorSchema);
  
  module.exports.Movie = Movie;
  module.exports.User = User;
  module.exports.Genre = Genre;
  module.exports.Director = Director;