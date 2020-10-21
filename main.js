const express = require('express');
const app = express();

let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

// Modelo: usuarios, peliculas, pedidos
// Controlador: gestion de datos?
// Vista: html css de la pagina ppal


// form urlencoded
//let user = require('./user.js');

// GESTION DE USUARIO
class User{
    constructor(name, pass){
        this.name = name;
        this.pass = pass;
        this.order = null;
    }
}
let usersArray = [];


// Endpoint de Alta de Usuario (C)create -> POST
function addUser(newUser){
    usersArray.push(newUser);
}

app.post('/users/addUser', (req, res) =>{
    let a = JSON.stringify(req.body);
    addUser(new User(req.body.name, req.body.password))
    res.send(`
        Usuario añadido
    `);
});

// Endpoint de Perfil (R)read -> GET

function getUsers(){
    //let arr = []
    //for(let i = 0; i < usersArray.length ; i++) arr.push(usersArray[i].name);
    return usersArray;
}

app.get('/users/getUsers', (req, res) =>{
    let users = getUsers();
    //console.log("orders users: " + users[0].order.dateRent);
    res.send(users); 
});

function getUserByName(nameUser){
    let user = usersArray.find((item) => item.name = nameUser);
    return user;
}


// Endpoint de Baja de usuario (D) -> DELETE
function deleteUser(name){
    let index = usersArray.findIndex((item) => item.name == name);
    usersArray.splice(index, 1);
}

app.delete('/users/unsubscribeUser', (req, res) =>{
    let name = req.body.name;
    deleteUser(name);
    res.send(name + " eliminado"); 
});

// 127.0.0.1:3000/?marico=picachu
//JSON.stringify()

////////////////////////////////////////////////////////////////////

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
    return moviesArray.find((item) => item.title === title);
}

app.get('/movies/getMovieByTitle', (req, res) =>{
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

app.get('/movies/getMovieById', (req, res) =>{
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

app.get('/movies/getMovies', (req, res) =>{
    let movies = getMovies();
    res.send(movies); 
});

////////////////////////////////////////////////////////////////////////////////
//GESTION DE PEDIDOS
class Order{
    constructor(movie, dateRent, dateRefund){
        this.movie = movie;
        this.dateRent = dateRent;
        this.dateRefund = dateRefund;
    }
}
let orderArray = [];
// Endpoint para crear pedido -> POST
function createOrder(userName, movieId, dateRent, dateRefund){
    let movieById = getMovieById(movieId);
    console.log("movieById" + movieById);
    let userByName = getUserByName(userName);
    console.log("user:" + userByName.name);
    if(userByName.order === null){
        userByName.order = new Order(movieById, dateRent, dateRefund);
        return 1;
    }else{
        return -1;
    }
}

app.post('/orders/addOrder', (req, res) =>{
    let userName = req.body.name;
    let movieId = req.body.id;
    let dateRent = req.body.dateRent;
    let dateRefund = req.body.dateRefund;

    if(createOrder(userName, movieId, dateRent, dateRefund) === 1){
        res.send("Order added");
    }else{
        res.send("The user have an order already."); 
    }
})
    

// GESTION DE DATOS
// MongoDB



//app.get('/', (req, res, next) => { res.send("<h1>Hola mundo</h1><p>usuarios</p>")});
app.get('/', (req, res) => { res.send(`
    <h1>Hola mundo</h1>
    <p>Usuarios</p>`
    )});

app.listen(3000, () => console.log("Sever running"));