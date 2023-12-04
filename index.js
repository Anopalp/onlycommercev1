const express = require('express');
const mongoose = require('mongoose');

const app = express();
const catalogueRoutes = require('./src/routes/catalogue');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(express.json());

app.use('/v1/catalogue', catalogueRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatur || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data});
});

mongoose.connect('mongodb+srv://aliefnp:eKqfkFEA3IZa7ijT@cluster0.pbrnbbo.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        app.listen(4000, () => console.log('Connection Success'));
    })
    .catch(err => console.log(err));