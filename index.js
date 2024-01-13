require('dotenv').config();
const express = require('express');
const port = 8000;
const app = express();
const mongoose = require('./config/mongoose'); // Import the mongoose instance

const routes = require('./routes/index');

app.use(express.json());
app.use('/', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const server=app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server');
    } else {
        console.log('Server is running successfully on port:', port);
    }
});
module.exports=server;
