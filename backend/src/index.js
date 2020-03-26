const express = require('express');
const cors = require('cors');
const routes = require('./routes');

//storing the app
const app = express();

app.use(cors());
// We need to inform that we will be using JSON for requests.
app.use(express.json());
app.use(routes);


//app listening the specified port
app.listen('3333');