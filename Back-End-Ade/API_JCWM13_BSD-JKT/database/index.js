// import module
const mysql = require('mysql')

// configure mysql
const connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'adeaja',
    password : 'adeaja123',
    database : 'practice_jcwm13'
})

module.exports = connection