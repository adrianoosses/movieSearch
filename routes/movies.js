const express = require('express');
const app = express();
const router = express.Router();

// GESTION DE PELICULAS

class Movie{
    constructor(title, id, genre, authors){
        this.title = title;
        this.id = id;
        this.genre = genre;
        this.authors = authors;
    }
}

let moviesArray = [];
moviesArray.push(new Movie("The Godfather", "1", "drama", "Marlon Brando"));
moviesArray.push(new Movie("12 Angry Men", "2", "drama", "Henry Fonda"));
moviesArray.push(new Movie("La Lista de Schindler", "3", "drama", "Liam Neeson"));


// Endpoint busqueda titulo -> GET a MongoDB?
function getMovieByTitle(title){
    console.log("search movies by title");
    console.log("title: ", title);
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
    console.log("Movie: " +movie);
    return movie;
}

router.get('/getMovieById', (req, res) =>{
    let id = req.body.id;
    let moviesById = getMovieById(id);
    res.send(moviesById); 
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