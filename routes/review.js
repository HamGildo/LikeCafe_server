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
    conn.query(sql, [review_id, cafe_id, mem_id, star, content, review_image, write_date], function(err, rows){
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

// 리뷰 삭제하는 라우터다능 !
router.post("/ReviewDele", function (request, response) {
    console.log(request.body);

    let cafe_id = request.body.cafe_id;
    cafe_id = parseInt(cafe_id);
    let mem_id = request.body.mem_id;

    let sql = "delete from review where mem_id = ? and cafe_id = ?";
    console.log(sql);
    conn.query(sql, [mem_id, cafe_id], function (err, rows) {
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