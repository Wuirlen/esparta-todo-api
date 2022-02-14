const mysql = require('mysql');

let bd_setting = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    typeCast: castField = (field, useDefaultTypeCasting) => {

        if ((field.type === 'BIT') && (field.length === 1)) {
            var bytes = field.buffer();
            return (bytes[0] === 1);
        }

        return (useDefaultTypeCasting());

    }
}

function handleDisconnect() {
    connection = mysql.createConnection(bd_setting);

    connection.connect((error) => {
        if (error) throw error;
        console.log(`Conectado ao Banco de Dados: ${process.env.DB_NAME}`);
    });

    connection.on('error', (error) => {
        console.log('db error', error);
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw error;
        }
    });
    
}

handleDisconnect();


module.exports = connection;