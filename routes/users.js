const express = require('express');
const app = express();
const router = express.Router();

// GESTION DE USUARIO

class User{
    constructor(name, pass){
        this.name = name;
        this.pass = pass;
        this.order = null;
    }
}
let usersArray = [];

let addUser = (newUser) =>{
    usersArray.push(newUser);
};


router.post('/addUser', (req, res) =>{
    console.log("user name: "+ req.body.name);
    addUser(new User(req.body.name, req.body.password))
    res.json({"message":"Usuario añadido."});
});

let getUsers = () => {
    //let arr = []
    //for(let i = 0; i < usersArray.length ; i++) arr.push(usersArray[i].name);
    return usersArray;
}

// Endpoint de Perfil (R)read -> GET
router.get('/getUsers', (req, res) =>{
    let users = getUsers();
    console.log(users);
    //console.log("orders users: " + users[0].order.dateRent);
    res.json(users); 
});

let getUserByName = (nameUser) =>{
    user = usersArray.find((item) => item.name = nameUser);
    return user;
}

// Endpoint de Baja de usuario (D) -> DELETE
let deleteUser = (name) => {
    let index = usersArray.findIndex((item) => item.name == name);
    usersArray.splice(index, 1);
}

router.delete('/unsubscribeUser', (req, res) =>{
    let name = req.body.name;
    deleteUser(name);
    res.send(name + " eliminado"); 
});

let login = (name, password) =>{
    //console.log("objs het usr",getUserByName(name))
    
    if(getUserByName(name) !== undefined){
        console.log("obj get", getUserByName(name));
        console.log("pass get",getUserByName(name).pass);
        console.log("pass param",password);
        console.log("existe");
        if(getUserByName(name).pass === password){
            
            console.log("Correct password");
            return true;
        }else{
            console.log("Wrong user or password ");
            return false;
        }
    }else{
        console.log("no existe");
        return false;
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

// 127.0.0.1:3000/?marico=picachu
//JSON.stringify()
exports.routes = router;