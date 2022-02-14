require('dotenv').config({ path: 'variaveis.env' });

const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

const routes = require('./routes');

const server = express();

server.use(express.json());

const corsOptions = {
    origin: 'https://esparta-todo-api.herokuapp.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinu: false,
    optionsSuccessStatus: 204
}

server.use(cors(corsOptions));

server.use(bodyParser.urlencoded({ extended: false }));

server.use('/api', routes);

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: ${process.env.DB_HOST}:${process.env.PORT}`)
})