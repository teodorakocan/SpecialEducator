const sql = require('mssql');
const dbConfig = require('../configurations/dbConfig');

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => console.log('Databese Connection Failed! Bad Config: ', err))

module.exports = {
    sql, poolPromise
}