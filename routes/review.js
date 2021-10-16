const express = require("express");
const router = express.Router();

const conn = require("../config/DBConn.js");

router.post("/Review", function (request, response) {
    console.log(request.body);

    let review = request.body.et_review_writebox;

    let sql = "insert into review values(?)";
    conn.query(sql, [review], function(err, rows){
        if (!err) {
            console.log(rows);

            let str = new String();
            let data = new Object();
            data.status = "200";
            arr.push(data);
            let jsonData = JSON.stringify(str);
            console.log(jsonData);
            response.send(jsonData);
            
        } else {
            console.log(err);
        }
    });

    
});


module.exports = router;