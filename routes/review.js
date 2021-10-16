const express = require("express");
const router = express.Router();

const conn = require("../config/DBConn.js");

router.post("/ReviewPage", function (request, response) {
    console.log(request.body);

    let cafe_id = parseInt(request.body.cafe_id);
    let mem_id = request.body.mem_id;
    let star = parseInt(request.body.star);
    let review = request.body.et_review_writebox;
    let review_image = request.body.review_image;
    let write_date = request.body.write_date;
    

    let sql = "insert into review values(?,?,?,?,?,?)";
    conn.query(sql, [cafe_id, mem_id, star, review, review_image, write_date], function(err, rows){
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