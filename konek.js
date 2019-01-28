const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sekolahku"
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    else {
        console.log("Berhasil");
    }
});

module.exports = db;