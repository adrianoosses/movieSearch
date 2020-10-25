const express = require('express');
const app = express();
const router = express.Router();

// GESTION DE PELICULAS

class Movie{
    constructor(title, id, genre, actors){
        this.title = title;
        this.id = id;
        this.genre = genre;
        this.actors = actors;
    }
}

let moviesArray = [];
moviesArray.push(new Movie("The Godfather", "1", "drama", ["Marlon Brando", "Al Pacino"]));
moviesArray.push(new Movie("12 Angry Men", "2", "drama", ["Henry Fonda"]));
moviesArray.push(new Movie("The Schindler List", "3", "drama", ["Liam Neeson"]));
moviesArray.push(new Movie("Scarface", "4", "drama", ["Al Pacino"]));


// Endpoint busqueda titulo -> GET a MongoDB?
function getMovieByTitle(title){
    //console.log("search movies by title");
    //console.log("title: ", title);
    return moviesArray.find((item) => item.title === title);
}

router.get('/getMovieByTitle', (req, res) =>{
    let title = req.body.title;
    let moviesByTitle = getMovieByTitle(title)
    res.send(moviesByTitle); 
});

// Endpoint busqueda id -> GET a MongoDB?
function getMovieById(id){
    //console.log(typeof(id));
    let movie = moviesArray.find((item) => item.id === id);
    //console.log("Movie: " +movie);
    return movie;
}

router.get('/getMovieById', (req, res) =>{
    let id = req.body.id;
    let moviesById = getMovieById(id);
    res.send(moviesById); 
});

function getMovieByGenre(genre){
    //console.log(typeof(id));
    let movies = moviesArray.filter((item) => item.genre === genre);
    //console.log("Movie: " +movies);
    return movies;
}

router.get('/getMovieByGenre', (req, res) =>{
    let genre = req.body.genre;
    let moviesByGenre = getMovieByGenre(genre);
    res.send(moviesByGenre); 
});

function getMovieByActor(actor){
    let movies = moviesArray.filter((itemMovie) => itemMovie.actors.find((item) => item === actor));
    /*
    console.log(actor);
    let movies = [];
    for(let i = 0; i < moviesArray.length; i++){
        console.log("actors: " + moviesArray[i].actors);
        if(moviesArray[i].actors.find((item) => item === actor)) movies.push(moviesArray[i]); 
    }*/
    return movies;
}


router.get('/getMovieByActor', (req, res) =>{
    let actor = req.body.actor;
    let moviesByActor = getMovieByActor(actor);
    res.send(moviesByActor); 
});


// Endpoint busqueda todas -> GET a MongoDB?
function getMovies(){
    let arr = [];
    for(let i = 0; i < moviesArray.length; i++){
        arr.push(moviesArray[i].title);
    }
    return arr;
}

router.get('/getMovies', (req, res) =>{
    let movies = getMovies();
    res.send(movies); 
});

exports.routes = router;