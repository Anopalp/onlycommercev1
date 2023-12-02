const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://aliefnp:eKqfkFEA3IZa7ijT@cluster0.pbrnbbo.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        app.listen(4000, () => console.log('Connection Success'));
    })
    .catch(err => console.log(err));