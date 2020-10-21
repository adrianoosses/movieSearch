const express = require('express');
const app = express();

let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
// form urlencoded

// GESTION DE USUARIO
// Endpoint de Alta de Usuario (C)create -> POST
app.post('user', function(req, res) {
    res.send("Create user");
})

//const users = require('./user.js');
//console.log(users);
//app.use('/users', (req, res) => res.send(users));
let usersArray = [];

function getUsers(){
    let arr = []
    //console.log("usuarios:"+JSON.stringify(usersArray));
    for(let i = 0; i < usersArray.length ; i++){
        //console.log(usersArray[0].name);
        arr.push(usersArray[i].name);
    }
    return arr;
}
function addUser(newUser){
    usersArray.push(newUser);
}

class Usuario{
    constructor(name, pass){
        this.name = name;
        this.pass = pass;
    }
}
app.post('/users/addUser', (req, res) =>{
    //usersArray.push(req.query);
    let a = JSON.stringify(req.body);
    //console.log(a);
    //if(req.body.action === "addUser"){ 
        console.log(req.body.name);
        console.log(req.body.password);
        //res.send("Introduzca objeto usuario:");
        addUser(new Usuario(req.body.name, req.body.password))
        res.send(`
        Usuario añadido
        `);
        
        
    //}
    //console.log("accion: "+ JSON.parse(a).action); 
    console.log("accion: "+ req.body.action); 
    if(req.body.action === "getUsers"){
        res.send(getUsers());
    } 
    
    
    //console.log("Array:" + JSON.stringify(usersArray));
});
// Endpoint de Perfil (R)read -> GET
app.get('/getUsers', (req, res) =>{
    console.log(getUsers()); 
    res.send(JSON.stringify(getUsers())); 
});


// 127.0.0.1:3000/?marico=picachu
//JSON.stringify()





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

//app.get('/', (req, res, next) => { res.send("<h1>Hola mundo</h1><p>usuarios</p>")});
app.get('/', (req, res) => { res.send(`
    <h1>Hola mundo</h1>
    <p>Usuarios</p>`
    )});

app.listen(3000, () => console.log("Sever running"));