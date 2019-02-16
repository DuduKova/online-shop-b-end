const express = require('express');
const bodyParser = require('body-parser');
const config = require('./db/config');
const users = require('./routes/users');
const companies = require('./routes/companies');
const carts = require('./routes/carts');
const orders = require('./routes/orders');
const cors = require('cors');
const expressJwt = require('express-jwt');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get((req , res) => {
    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.writeHead(200);
});

app.use('/users' , users);
app.use('/companies' , companies);
app.use('/carts' , carts);
app.use('/orders' , orders);

app.get('*' , (req , res) => {
    res.redirect('localhost:3000/users/login');
});

app.listen(config.app.port, () => {
    console.log(`Server started on port: ${config.app.port}`);
});
