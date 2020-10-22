const express = require('express');
const app = express();
const router = express.Router();

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
let createOrder = (userName, movieId, dateRent, dateRefund) =>{
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

router.post('/addOrder', (req, res) =>{
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

exports.routes = router;