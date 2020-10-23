const express = require('express');
const app = express();
const router = express.Router();

// GESTION DE USUARIO

class User{
    constructor(name, pass, role){
        this.name = name;
        this.pass = pass;
        this.role = role;
        this.order = null;
    }
}

let currentUser = null;
let adriano = new User("adriano", "123456", "admin");
let adrianoString = JSON.stringify(adriano);
let adrianoParse = JSON.parse(adrianoString);
let usersArray = []
usersArray.push(adrianoParse);


let addUser = (newUser) =>{
    if(currentUser.role === "admin" && getUserByName(newUser.name) === false){
        usersArray.push(newUser);
        return true;
    } else return false;
};


router.post('/addUser', (req, res) =>{
    let msg = (addUser(new User(req.body.name, req.body.password, req.body.role)))?"User added.":"denied";
    res.json({"message":msg}); 
});

let getUsers = () => {
    return usersArray;
}

// Endpoint de Perfil (R)read -> GET
router.get('/getUsers', (req, res) =>{
    let users = getUsers();
    res.json(users); 
});

let getUserByName = (nameUser) =>{
    user = usersArray.find((item) => item.name === nameUser);
    return user;
}

// Endpoint de Baja de usuario (D) -> DELETE
let deleteUser = (name) => {
    let index = usersArray.findIndex((item) => item.name === name);
    usersArray.splice(index, 1);
}

router.delete('/unsubscribeUser', (req, res) =>{
    let name = req.body.name;
    deleteUser(name);
    res.send(name + " eliminado"); 
});

let login = (name, password) =>{
    let usrLoginString = JSON.stringify(getUserByName(name));
    if(usrLoginString !== undefined){
        let usrLogin = JSON.parse(usrLoginString);
        if(usrLogin.pass === password){
            exports.cu = usrLogin;
            return true;
        }else{
            console.log("Wrong user or password ");
            return false;
        }
    }
    
}

router.get('/login', (req, res) =>{
    name = req.body.name;
    password = req.body.password
    if(login(name, password)){
        res.send("Logged");
    }else{
        res.send("Not logeed");
    } 
});

console.log("Antes de salir: "+currentUser)

exports.routes = router;
