const express = require('express');
const app = express();
const router = express.Router();

let usr = require('./routes/users.js');
let mv = require('./routes/movies.js');
let or = require('./routes/orders.js');

let bodyParser = require('body-parser')
app.use(bodyParser.json());

// Modelo: usuarios, peliculas, pedidos
// Controlador: gestion de datos?
// Vista: html css de la pagina ppal


app.use('/users', usr.routes);
app.use('/movies', mv.routes);
app.use('/orders', or.routes);


    

// GESTION DE DATOS
// MongoDB


app.get('/', (req, res) => { res.send(`
    <h1>Hola mundo</h1>`
    )});

app.listen(3000, () => console.log("Sever running"));