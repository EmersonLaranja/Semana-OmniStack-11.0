//importando o modulo chamado express para variavel express
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

//armazena a aplicação
const app =express();

app.use(cors());
//Precisamos informar que estaremos usando JSON para as requisições,de JSON para um objeto
app.use(express.json());
app.use(routes);


//aplicação ouvindo a porta especificada
 app.listen('3333');