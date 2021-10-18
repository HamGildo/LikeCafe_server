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
    let gender = request.body.gender;
    let mem_image = request.body.mem_image;
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
                data.result = "success"; // {"ddong" : "200"}
                arr.push(data); // [{"ddong" : "200"}]
                let jsonData = JSON.stringify(arr);
                console.log(jsonData);
                response.send(jsonData); // json으로 바꿔서 안드로 ㄱ
            } else {
                // 실패
                let arr = new Array();
                let data = new Object();
                data.result = "fail"; // {"ddong" : "200"}
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


// 안드로이드로 json데이터 '닉네임' 보내기
router.post("/Nick", function (request, response) {
    console.log(request.body);

    // 이렇게 얻은 값을 sql에 넣어서 DB에 요청한다. (DB 정의서 확인)
    let sql = "select * from member";
    conn.query(sql, function (err, rows) {
        if (!err) {
            console.log(rows);
            let arr = new Array(); //배열 선언 (json들이 들어갈 것임)

            // db로부터 받아온 값들은 row 배열에 저장되어있음
            // for문을 통해서 select된 데이터 한 줄씩 json으로 만들어서 저장
            for(let i=0;i<rows.length;i++){ 

                let data = new Object(); //여러속성을 하나로 묶어주는 Object생성

                data.mem_id = rows[i].mem_id;
                data.pw = rows[i].pw;
                data.nick = rows[i].nick;
                //ex->{"id":"hot","pw":"678","nick":"Jason"}

                arr.push(data);
                //묶인 데이터를 배열에 추가
            }
        
            let jsonData = JSON.stringify(arr);
                //[{"id":"hot","pw":"678","nick":"Jason"},
                //{"id":"smart","pw":"123","nick":"SM"},
                //{"id":"2","pw":"2","nick":"2"},
                //{"id":"Test","pw":"1","nick":"1"},
                //{"id":"admin","pw":"1","nick":"1"}]
                //배열을 json형태로 변환
        
            console.log(jsonData);
        
            response.send(jsonData);
            //json형태의 데이터를 응답
            //sql 명령 실행
            //conn.end();  
        } else {
            console.log(err);
        }
    });

});





module.exports = router;