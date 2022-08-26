/* get .env */
require('dotenv').config();

/* get express */
const express = require('express');
const app = express();

/* get mongoose and settings */
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('connected on database.')
        app.emit('read');
    })
    .catch(e => console.log(e));

/* routes and more */
const routes = require('./routes');
const path = require('path');
const {middlewareGlobal} = require('./src/middlewares/middleware');

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

/* Nossos próprios middlewares */ 
app.use(middlewareGlobal);
app.use(routes);

app.on('read' , () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Server running on port 3000');
    });
})
