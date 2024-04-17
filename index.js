const express = require('express'),
    morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/cfDB', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

//Logging middleware
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import auth
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

//return all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log("querying database");
    await Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//return a movie by title
app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log("querying database");
    await Movies.findOne({ title: req.params.title })
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//return a genre by name
app.get('/genres/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log("querying database")
    await Movies.findOne({ "genre.name": req.params.name })
      .then((movie) => {
        res.status(201).json(movie.genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

//return a director by name
app.get('/directors/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log("querying database");
    await Movies.findOne({ "director.name": req.params.name })
        .then((movie) => {
            res.status(201).json(movie.director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

//allow new users to register
app.post('/users', async (req, res) => {
    console.log("querying database");
    await Users.findOne({ username: req.body.username })
        .then((user) => {
            if(user) {
                return res.status(400).send(req.body.username + ' already exists');
            } else {
                Users.create({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    birthday: req.body.birthday
                })
                .then((user) => {res.status(201).json(user)})
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

//update a user's info by username
app.put('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if(req.user.username !== req.params.username){
        return res.status(400).send('Permission denied');
    }
    await Users.findOneAndUpdate({ username: req.params.username }, { $set:
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday
        }
    },
    { new: true }) //makes sure that the updated document is returned
    .then((updatedUser) => {
        res.json(updatedUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
});

//add a movie to user's list of favorites
app.post('/users/:username/movies/:_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.findOneAndUpdate({ username: req.params.username }, {
       $push: { favMovies: req.params._id }
     },
     { new: true }) // This line makes sure that the updated document is returned
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

//allow users to remove a movie from fav list
app.delete('/users/:username/movies/:_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.findOneAndUpdate({ username: req.params.username }, {
        $pull: { favMovies: req.params._id }
    },
    { new: true })
    .then((updateUser) => {
        res.json(updateUser);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

//allow existing users to deregister
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Users.findOneAndDelete({ username: req.params.username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.username + ' was not found');
        } else {
          res.status(200).send(req.params.username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

//Log all requests
let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
};

app.use(myLogger);

app.get('/', (req, res) => {
    res.send('Welcome to My Flix!');
});

//Static
app.use('/documentation', express.static(path.join(__dirname, 'public'), {index: 'documentation.html'}));

//Error-handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(400).send('Something broke!');
});

app.listen(8080, () => console.log('Your app is listening on port 8080.'))
