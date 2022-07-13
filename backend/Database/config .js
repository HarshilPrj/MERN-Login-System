const mysql = require("mysql2");

const DBconnect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "logindb",
});

DBconnect.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database is connected successfully !");
    }
});

module.exports = DBconnect;
