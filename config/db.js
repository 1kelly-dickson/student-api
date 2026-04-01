const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school_management'
});

db.connect(err => {
    if (err) {
        console.error('error connecting to mysql:', err);
        return;
    }
    console.log('connected to mysql successfully');
});

module.exports = db;