const express = require('express');
const cors = require('cors');
const  {errors} = require('celebrate');
const routes = require('./routes');

//storing the app
const app = express();

app.use(cors());
// We need to inform that we will be using JSON for requests.
app.use(express.json());
app.use(routes);
app.use(errors());


//app listening the specified port
module.exports=app;