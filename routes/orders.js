const express = require('express');
const app = express();
const router = express.Router();
const usr = require('../routes/users.js');

//GESTION DE PEDIDOS
class Order{
    constructor(userId, movieId, dateRent, dateRefund){
        this.userId = userId;
        this.movie = movieId;
        this.dateRent = dateRent;
        this.dateRefund = dateRefund;
    }
}
let orderArray = [];
let currentUser = usr.cu;
console.log("currentUser"+currentUser)
// Endpoint para crear pedido -> POST
let createOrder = (userId, movieId, dateRent, dateRefund) =>{
    orderArray.push(new Order(userId, movieId, dateRent, dateRefund));
    return true;
    //let movieById = getMovieById(movieId);
    //console.log("movieById" + movieById);
    //let userByName = getUserByName(userName);
    //console.log("user:" + userByName.name);
    /*
    if(userByName.order === null){
        userByName.order = new Order(userId, movieId, dateRent, dateRefund);
        return 1;
    }else{
        return -1;
    }*/
}

router.post('/addOrder', (req, res) =>{
    let movieId = req.body.movieId;
    let dateRent = req.body.dateRent;
    let dateRefund = req.body.dateRefund;
    let currentUserCreate = usr.cu;
    if(currentUserCreate !== undefined){
        let userId = (currentUserCreate.role === "admin")? req.body.userId: currentUserCreate.id;
        if(createOrder(userId, movieId, dateRent, dateRefund)) res.send("Order added"); 
        else res.send("The user have an order already."); 
    }else{
        res.send("No user logeed."); 
    }
})

exports.routes = router;