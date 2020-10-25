const express = require('express');
const app = express();
const router = express.Router();

// GESTION DE USUARIO

class User{
    constructor(name, pass, role){
        this.id = null;
        this.name = name;
        this.pass = pass;
        this.role = role;
        this.order = null;
    }
}

let currentUser = null;
let adriano = new User("adriano", "123456", "admin");
setUserId(adriano);
let adrianoString = JSON.stringify(adriano);
let adrianoParse = JSON.parse(adrianoString);
let usersArray = []
usersArray.push(adrianoParse);

let addUser = (userName, userPassword, userRole) =>{
    //console.log("current user role: " + currentUser.role);
    //let setUserIdFlag = setUserId(newUser);
    //console.log("setUserFlag " + setUserIdFlag);
    //console.log("currentUser.role " + currentUser.role);
    //console.log("getUserByName(newUser.name)" + getUserByName(newUser.name) );

    if(currentUser.role === "admin" && getUserByName(userName) === undefined ){
        let newUser = new User(userName, userPassword, userRole);
        if(setUserId(newUser) === true){
            usersArray.push(newUser);
            return true;
        } else return false;
    } else return false;
};


router.post('/addUser', (req, res) =>{
    let msg = (addUser(req.body.name, req.body.password, req.body.role))?"User added.":"denied";
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

let getUserById = (userId) =>{
    user = usersArray.find((item) => item.id === userId);
    return user;
}

function idExists(id){
    let res = getUserById(id) === undefined ? false: true;
    return res;
}
function setUserId(user){
    let idGenerate = 0;
    do idGenerate = Math.floor(Math.random()*200);
    while(idExists===true);
    user.id =idGenerate;
    console.log("user id:" + user.id);
    return true;
}


// Endpoint de Baja de usuario (D) -> DELETE
let deleteUser = (name) => {
    let index = usersArray.findIndex((item) => item.name === name);
    if(currentUser.role === "admin"){
        usersArray.splice(index, 1);
        return true;
    }else return false;
}

router.delete('/unsubscribeUser', (req, res) =>{
    let name = req.body.name;
    let msg =  name + " eliminado";
    if(deleteUser(name)) res.json({"msg" : msg});
    else res.send("Unauthorized"); 
});

let login = (name, password) =>{
    let usrLoginString = JSON.stringify(getUserByName(name));
    if(usrLoginString !== undefined){
        let usrLogin = JSON.parse(usrLoginString);
        if(usrLogin.pass === password){
            currentUser = usrLogin;
            exports.cu = currentUser;
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
exports.getUserById = getUserById;
exports.routes = router;
