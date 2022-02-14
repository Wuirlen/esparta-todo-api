require('dotenv').config({ path: 'variaveis.env' });

const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

const routes = require('./routes');

const server = express();

const whitelist = ['http://localhost:3000', 'https://esparta-todo-api.herokuapp.com'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

server.use(cors(corsOptions));
server.use(express.json());

server.use(bodyParser.urlencoded({ extended: false }));

server.use('/api', routes);

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: ${process.env.DB_HOST}:${process.env.PORT}`)
})