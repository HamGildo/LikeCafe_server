const mysql = require("mysql");
// npm install express mysql --save

let conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    port: 3306,
    database: "likecafe_db"
});

// let conn = mysql.createConnection({
//     host: "project-db-stu.ddns.net",
//     user: "team_g_4",
//     password: "smhrd4",
//     port: 3307,
//     database: "campus_g_4_1012"
// });
// Mysql 연결정보등록

//conn.connect();
// Mysql과 연결실행

module.exports = conn;