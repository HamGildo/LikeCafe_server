const express = require("express");
const router = express.Router();
const conn = require("../config/DBConn.js");


//안드로이드로부터 json데이터를 <받아오기>
router.post("/Regist", function (request, response) {
    console.log(request.body);

    // 안드로이드에서 이런 형식으로 json 데이터를 보냈을 때,
    // {
    //     "testId" : "aaa",
    //     "testPw" : "1234",
    //     "testName" : "ham" 
    // }

    // 이런 형식으로 json을 파싱하여 받는다.
    let id = request.body.testId;
    let pw = request.body.testPw;
    let name = request.body.testName;
    
    // 이렇게 얻은 값을 sql에 넣어서 DB에 요청한다. (DB 정의서 확인)
    let sql = "insert into member values(?, ?, ?)";
    conn.query(sql, [id, pw, name], function (err, rows) {
        if (!err) {
            console.log(rows);

            // 자바에서 단순하게 받기만 하는거면 이거 복붙해서 넣어도 됨.
            // json파일을 만들어서 안드로이드에 200 보내기 (정상적으로 보내졌는지 확인용)
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


// 안드로이드로 json데이터 <보내기>
router.post("/SelectAll", function (request, response) {
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

                data.id = rows[i].id;
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