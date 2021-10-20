const express = require("express");
const router = express.Router();

const conn = require("../config/DBConn.js");



// 리뷰 보내는 라우터다냥 !
router.post("/ReviewPage", function (request, response) {
    console.log(request.body);

    let review_id = "5";
    let cafe_id = parseInt(request.body.cafe_id);
    let mem_id = request.body.mem_id;
    let star = parseInt(request.body.star);
    let content = request.body.content;
    let review_image = request.body.review_image;
    let write_date = request.body.write_date;


    let sql = "insert into review values (?,?,?,?,?,?,?)";
    conn.query(sql, [review_id, cafe_id, mem_id, star, content, review_image, write_date], function (err, rows) {
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


});

router.post("/SelectByMemId", function (request, response) {
    console.log(request.body);

    let mem_id = request.body.mem_id;
    
    let sql = "select * from review r, cafe c where r.cafe_id = c.cafe_id and mem_id = ?"
    conn.query(sql, [mem_id], function (err, rows) {
        if (!err) {
            console.log(rows);

            let arr = new Array();
            for (let i = 0; i < rows.length; i++) {
                let data = new Object(); //여러속성을 하나로 묶어주는 Object생성

                // private int id;
                // private int cafe_id;
                // private String cafe_name;
                // private String mem_id;
                // private double star;
                // private String content;
                // private int image;

                data.review_id = rows[i].review_id;
                data.cafe_id = rows[i].cafe_id;
                data.cafe_name = rows[i].cafe_name;
                data.mem_id = rows[i].mem_id;
                data.star = rows[i].star;
                data.content = rows[i].content;
                data.review_image = rows[i].review_image;

                arr.push(data);
                //묶인 데이터를 배열에 추가
            }
            let jsonData = JSON.stringify(arr);

            console.log(jsonData);
            response.send(jsonData);

        } else {
            console.log(err);
        }
    });

});

// 리뷰 삭제하는 라우터다능 !
router.post("/ReviewDele", function (request, response) {
    console.log(request.body);

    let review_id = request.body.review_id;
    review_id = parseInt(review_id);
    
    let sql = "delete from review where review_id = ?";
    console.log(sql);
    conn.query(sql, [review_id], function (err, rows) {
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
});


module.exports = router;