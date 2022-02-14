require('dotenv').config({ path: 'variaveis.env' });

const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

const routes = require('./routes');

const server = express();

server.use(cors());
server.use(express.json());

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

server.use(bodyParser.urlencoded({ extended: false }));

server.use('/api', routes);

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: ${process.env.DB_HOST}:${process.env.PORT}`)
})