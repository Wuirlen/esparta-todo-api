const mysql = require('mysql');

const connection = mysql.createPool({
    port: process.env.PORT,
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
});

module.exports = connection;