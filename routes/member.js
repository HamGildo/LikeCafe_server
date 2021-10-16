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

// 회원수정 라우터 (by 안영상)
router.post("/Modify", function (request, response) {
    console.log(request.body);

    let nick = request.body.nick;
    let pw = request.body.pw;
    let birth = request.body.birth;
    let gender = request.body.sex;
    let mem_image = request.body.image;
    let mem_id = "test"; 

    

    let sql = "update member set nick = ?, pw = ?, birth = ?, gender = ?, mem_image = ? where mem_id = ?";
    conn.query(sql, [nick, pw, birth, gender, mem_image, mem_id], function (err, rows) {
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

//로그인 라우터(by 강성희)
router.post("/Login", function (request, response) {
    console.log(request.body);

    let id = request.body.id;
    let pw = request.body.pw;

    let sql = "select * from member where mem_id = ? and pw = ?";
    conn.query(sql, [id, pw], function (err, rows) {
        if (!err) {

            if (rows.length > 0) {
                // 성공
                // 안드로이드한테도 알려줘야징~
                let arr = new Array();
                let data = new Object();
                data.status = "success"; // {"ddong" : "200"}
                arr.push(data); // [{"ddong" : "200"}]
                let jsonData = JSON.stringify(arr);
                console.log(jsonData);
                response.send(jsonData); // json으로 바꿔서 안드로 ㄱ
            } else {
                // 실패
                let arr = new Array();
                let data = new Object();
                data.status = "fail"; // {"ddong" : "200"}
                arr.push(data); // [{"ddong" : "200"}]
                let jsonData = JSON.stringify(arr);
                console.log(jsonData);
                response.send(jsonData); // json으로 바꿔서 안드로 ㄱ
            }

        } else {
            console.log(err);
        }
    });
    //sql 명령 실행
    //conn.end();
});

module.exports = router;