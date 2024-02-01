const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

//Logging middleware
app.use(morgan('common'));

let topTenMovies = [
    {
        title: 'The Lord of the Rings',
        director: 'Peter Jackson'
    },
    {
        title: 'Jurassic Park',
        director: 'Steven Spielberg'
    },
    {
        title: 'Django Unchained',
        director: 'Quentin Tarantino'
    },
    {
        title: 'Turning Red',
        director: 'Domee Shi'
    },
    {
        title: 'Prey',
        director: 'Dan Trachtenberg'
    },
    {
        title: 'Us',
        director: 'Jordan Peele'
    },
    {
        title: 'Beauty and the Beast',
        director: 'Bill Condon'
    },
    {
        title: 'Men in Black',
        director: 'Barry Sonnenfeld'
    },
    {
        title: 'Coraline',
        director: 'Henry Selick'
    },
    {
        title: 'Spirited Away',
        director: 'Hayao Miyazaki'
    }
]

//Log all requests
let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
};

app.use(myLogger);

app.get('/', (req, res) => {
    res.send('Welcome to My Flix!');
});

app.get('/movies', (req, res) => {
    res.json(topTenMovies);
});

//Static
app.use('/documentation', express.static(path.join(__dirname, 'public'), {index: 'documentation.html'}));

//Error-handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});
