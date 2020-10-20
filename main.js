const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('Metodo GET')
})
app.listen(3000, () => {
    console.log("Sever running");
})

// GESTION DE USUARIO
// Endpoint de Alta de Usuario (C)create -> POST
app.post('user', function(req, res) {
    res.send("Create user");
})

// Endpoint de Perfil (R)read -> GET

// Endpoint de Baja de usuario (D) -> DELETE

// GESTION DE PELICULAS
// Endpoint busqueda titulo -> GET a MongoDB?

// Endpoint busqueda id -> GET a MongoDB?

// Endpoint busqueda todas -> GET a MongoDB?

//GESTION DE PEDIDOS
// Endpoint para crear pedido -> POST

// GESTION DE DATOS
// MongoDB

// Modelo: usuarios, peliculas, pedidos
// Controlador: gestion de datos?
// vista: html css de la pagina ppal