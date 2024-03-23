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
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect('mongodb://localhost:27017/cfDB', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

//Logging middleware
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//return all movies
app.get('/movies', async (req, res) => {
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
app.get('/movies/:title', async (req, res) => {
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

//return all genres
app.get('/genres', async (req, res) => {
    console.log("querying database");
    await Genres.find()
      .then((genres) => {
        res.status(201).json(genres);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

//return all directors
app.get('/directors', async (req, res) => {
    console.log("querying database");
    await Directors.find()
        .then((directors) => {
            res.status(201).json(directors);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

//Allow new users to register (C)
app.get('/users', async (req, res) => {
    console.log("querying database");
    await Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// //Allow users to update their user info (U)
// app.put('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const updatedUser = req.body;

//     let user = user.find( user => user.id == id );

//     if (user) {
//         user.name = updatedUser.name;
//         res.status(200).json(user);
//     } else {
//         res.status(400).send('no such user');
//     }
// });

// //Allow users to add a movie to their favorite list (C)
// app.post('/users/:id/:movieTitle', (req, res) => {
//     const { id, movieTitle } = req.params;

//     let user = users.find( user => user.id == id );

//     if (user) {
//         user.favoriteMovies.push(movieTitle);
//         res.status(200).send(`'${movieTitle}' has been added to user ${id}'s array`);
//     } else {
//         res.status(400).send('no such user');
//     }
// });

// //Allow users to remove a movie from their list (D)
// app.delete('/users/:id/:movieTitle', (req, res) => {
//     const { id, movieTitle } = req.params;

//     let user = users.find( user => user.id == id );

//     if (user) {
//         user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
//         res.status(200).send(`'${movieTitle}' has been removed from user ${id}'s array`);;
//     } else {
//         res.status(400).send('no such user');
//     }
// });

// //Allow existing users to deregister (D)
// app.delete('/users/:id', (req, res) => {
//     const { id } = req.params;

//     let user = users.find( user => user.id == id );

//     if (user) {
//         users = users.filter( user => user.id != id );
//         res.status(200).send(` user ${id} has been deleted `);
//     } else {
//         res.status(400).send('no such user');
//     }
// });


// //Return a list of all movies to the user (R-CRUD)
// app.get('/movies', (req, res) => {
//     Movies.find()
//         .then((movies) => {
//             res.status(201).json(movies);
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).send("Error: " + err);
//         });
// });

// //Return data about a single movie by title to the user (R)
// app.get('/movies/:title', (req, res) => {
//     const { title } = req.params;
//     const movie = movies.find( movie => movie.title === title );

//     if (movie) {
//         res.status(200).json(movie);
//     } else {
//         res.status(400).send('no such movie');
//     }
// });

// //Return data about a genre by name (R)
// app.get('/movies/genre/:genreName', (req, res) => {
//     const { genreName } = req.params;
//     const genre = movies.find( movie => movie.genre.name === genreName ).genre;

//     if (genre) {
//         res.status(200).json(genre);
//     } else {
//         res.status(400).send('no such genre');
//     }
// });

// //Return data about a director by name (R)
// app.get('/movies/directors/:directorName', (req, res) => {
//     const { directorName } = req.params;
//     const director = movies.find( movie => movie.director.name === directorName ).director;

//     if (director) {
//         res.status(200).json(director);
//     } else {
//         res.status(400).send('no such director');
//     }
// });

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
