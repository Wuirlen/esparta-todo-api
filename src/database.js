const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b6235bafdb00a8',
    password: '8c04e2bb',
    database: 'heroku_a05e9b1d0d47589',
    typeCast: castField = (field, useDefaultTypeCasting) => {

        if ((field.type === 'BIT') && (field.length === 1)) {
            var bytes = field.buffer();
            return (bytes[0] === 1);
        }

        return (useDefaultTypeCasting());

    }
});

connection.connect((error) => {
    if (error) throw error;
    console.log(`Conectado ao Banco de Dados: ${process.env.DB_NAME}`);
});

module.exports = connection;