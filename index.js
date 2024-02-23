const express = require('express'),
    morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    app = express();

//Logging middleware
app.use(morgan('common'));

app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: "Vincent",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Agnes",
        favoriteMovies: ["Spirited Away"]
    }
];

let movies = [
    {
        title: "The Lord of the Rings",
        description: "The hobbit Frodo Baggings as he and the Fellowship embark on a quest to destroy the One Ring, to ensure the destruction of its maker - the Dark Lord Sauron.",
        genre: {
            name: "Fantasy",
            description: "A genre of speculative fiction involving magical elements."
        },
        director: {
            name: "Peter Jackson",
            bio: "Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy and the Hobbit trilogy, both of which are adapted from the novels of the same name by J. R. R. Tolkie.",
            birth: 1961.0
        }
    },
    {
        title: "Jurassic Park",
        description: "A theme park of genetically engineered dinosaurs on a tropical island Isla Nublar, owned by a billionaire businessman John Hammond.",
        genre: {
            name: "Science Fiction",
            description: "A genre deals with imaginative and futuristic concepts."
        },
        director: {
            name: "Steven Spielberg",
            bio: "Steven Allan Spielberg is an American film director, producer and screenwriter. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in history.",
            birth: 1946.0
        }
    },
    {
        title: "Django Unchained",
        description:"About a freed slave named Django, who works alongside a German bounty hunter to capture the vicious slave owners - Brittle brothers.",
        genre: {
            name: "Western",
            description: "A genre portrays the old American West of the 19th century and embodiment of freedome, ruggedness, and heroism."
        },
        director: {
            name: "Quentin Tarantino",
            bio:"Quentin Jerome Tarantino is an American film director, screenwriter, and actor. His films are characterized by stylized violence, extended dialogue including a pervasive use of profanity, and references to popular culture.",
            birth: 1963.0
        }
    },
    {
        title: "Turning Red",
        description: "A 13-year-old Chinese-Canadian girl named Mei Lee, who transforms into a red panda when she experiences any strong emotion, due to a hereditary curse.",
        genre: {
            name: "Family",
            description: "A genre that contains appropriate content for younger viewers but aims to appeal not only to children, but to a wide range of ages."
        },
        director: {
            name: "Domee Shi",
            bio: "Domee Shi is a Canadian film director and screenwriter. She directed the 2018 short film Bao and the 2022 feature film Turning Red, becoming the first woman to direct a short film and then the first woman with sole director's credit on a feature film for Pixar.",
            birth: 1989.0
        }
    },
    {
        title: "Prey",
        description: "Explores the story of Naru, a Comanche healer and tracker who yearns to become a warrior.",
        genre: {
            name: "Thriller",
            description: "A genre of fiction with numerous, often overlapping, subgenres, including crime, horror, and detective fiction."
        },
        director: {
            name: "Dan Trachtenberg",
            bio: "Dan Trachtenberg is an American filmmaker and podcast host. He is best known for directing the films 10 Cloverfield Lane and Prey, the former earning him a Directors Guild of America Award nomination for Outstanding Directing - First-Time Feature Film.",
            birth: 1981.0
        }
    },
    {
        title: "Us",
        description: "A suburban family who goes on vacation only to discover a group of doppelgangers are out to get them.",
        genre: {
            name: "Horror",
            description: "A genre that seeks to elicit fear or disgust in its audience for entertainment purposes."
        },
        director: {
            name: "Jordan Peele",
            bio: "Jordan Haworth Peele is an American actor, comedian, and filmmaker. He is known for his film and television work in the comedy and horror genres. Peele started his career in sketch comedy before transitioning his career to a writer and director of psychological horror and satirical films.",
            birth: 1979.0
        }
    },
    {
        title: "Beauty and the Beast",
        description: "An arrogant young prince and his servants fall under the spell, which turns him into the Beast until he learns to love and beloved in return.",
        genre: {
            name: "Musical",
            description: "A genre which songs sung by the characters are linked into the story line, are used to advance the plot or develop characters."
        },
        director: {
            name: "Bill Condon",
            bio: "William Condon is an American director and screenwriter. Condon is known for writing and/or directing numerous successful and acclaimed films including Gods and Monsters, Chicago, Kinsey, Dreamgirls, The Twilight Saga.",
            birth: 1955.0
        }
    },
    {
        title: "Men in Black",
        description: "Men In Black are government agents who allegedly memory-wipe or sometimes assassinate UFO witnesses to keep them silent about what they've seen.",
        genre: {
            name: "Comedy",
            description: "A genre uses humor to entertain, emplying witty dialogue and comedic performances to elicit laughter."
        },
        director: {
            name: "Barry Sonnenfeld",
            bio: "Barry Sonnenfeld is an American filmmaker and television director. He originally worked as a cinematographer for the Coen brothers before directing films such as The Addams Family and its sequel Addams Family Values, Get Shorty, the Men in Black trilogy, and Wild Wild West.",
            birth: 1953.0
        }
    },
    {
        title: "Kill Boksoon",
        description: "A single mom and merciless murderer who works for an assassin agency. Before renewing her contract, she engages in a kill-or-be-killed confrontation.",
        genre: {
            name: "Crime",
            description: "A genre inspired by and analogous to the crime fiction leterary genre."
        },
        director: {
            name: "Byun Sung-hyun",
            bio: "Byun Sung-hyun is a South Korean film director and screenwriter. He is best known for his 2017 film The Merciless and 2023 film Kill Boksoon.",
            birth: 1980.0
        }
    },
    {
        title: "Spirited Away",
        description: "A sullen 10-year-old girl who wanders into a world ruled by witches and spirits, where humans are turned into beasts.",
        genre: {
            name: "Animation",
            description: "A method of photographing successive drawings, models, or even puppets, to create an illusion of movement in a sequence."
        },
        director: {
            name: "Hayao Miyazaki",
            bio: "Hayao Miyazaki is a Japanese animator, filmmaker, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.",
            birth: 1941.0
        }
    }
];

//Allow new users to register (C)
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('users need names');
    }
});

//Allow users to update their user info (U)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user');
    }
});

//Allow users to add a movie to their favorite list (C)
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`'${movieTitle}' has been added to user ${id}'s array`);
    } else {
        res.status(400).send('no such user');
    }
});

//Allow users to remove a movie from their list (D)
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`'${movieTitle}' has been removed from user ${id}'s array`);;
    } else {
        res.status(400).send('no such user');
    }
});

//Allow existing users to deregister (D)
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        users = users.filter( user => user.id != id );
        res.status(200).send(` user ${id} has been deleted `);
    } else {
        res.status(400).send('no such user');
    }
});


//Return a list of all movies to the user (R-CRUD)
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

//Return data about a single movie by title to the user (R)
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie');
    }
});

//Return data about a genre by name (R)
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.genre.name === genreName ).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre');
    }
});

//Return data about a director by name (R)
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.director.name === directorName ).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director');
    }
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
