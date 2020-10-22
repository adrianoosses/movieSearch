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
    if(currentUser === "admin"){
        console.log("current user: "+JSON.stringify(currentUser));
        usersArray.push(newUser);
        return true;
    } else return false;
};


router.post('/addUser', (req, res) =>{
    console.log("user name: "+ req.body.name);
    if(addUser(new User(req.body.name, req.body.password, req.body.role))){
        res.json({"message":"User added."});
    }else{
        res.json({"message":"denied"});
    };
    
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
    console.log("usersArray", usersArray);
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
    //console.log("objs het usr",getUserByName(name))
    let usrLoginString = JSON.stringify(getUserByName(name));
    console.log("Nombre BUSCADO:" + name);
    console.log("usrLoginString:" + usrLoginString);
    if(usrLoginString !== undefined && usrLogin.pass === password){
        let usrLogin = JSON.parse(usrLoginString);
        console.log("Correct password");
        currentUser = usrLogin.role;
        console.log("ROLE:" + usrLogin.role);
        return true;
    }else{
        console.log("Wrong user or password ");
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