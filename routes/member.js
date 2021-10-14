const express = require("express");
const router = express.Router();
const conn = require("../config/DBConn.js");


//회원가입 라우터
router.post("/Regist", function (request, response) {
    console.log(request.body);

    let mem_id = request.body.mem_id;
    let pw = request.body.pw;
    let nick = request.body.nick;
    let birth = request.body.birth;
    let gender = request.body.gender;

    let sql = "insert into member values(?, ?, ?, ?, ?)";
    conn.query(sql, [mem_id, pw, nick, birth, gender], function (err, rows) {
        if (!err) {
            console.log(rows);
            let arr = new Array();
            let data = new Object();
            data.status = "200";
            arr.push(data);
            let jsonData = JSON.stringify(arr);
            console.log(jsonData);
            response.send(jsonData);

        } else {
            console.log(err);
        }
    });
    //sql 명령 실행
    //conn.end();
});

module.exports = router;