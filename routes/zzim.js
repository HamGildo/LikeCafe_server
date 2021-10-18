const express = require("express");
const router = express.Router();

const conn = require("../config/DBConn.js");

router.post("/ZzimCnt", function (request, response) {
    console.log(request.body);

    let cafe_id = request.body.cafe_id;
    cafe_id = parseInt(cafe_id);
    let sql = "select * from zzim where cafe_id = ?";
    console.log(sql);
    conn.query(sql, [cafe_id], function (err, rows) {
        if (!err) {
            console.log(rows);  

            let arr = new Array();
            let data = new Object();

            data.zzimCnt = rows.length;
        
            arr.push(data);
            let jsonData = JSON.stringify(arr);
        
            console.log(jsonData);
            response.send(jsonData);
        } else {
            console.log(err);
        }
    });
});

router.post("/ZzimSel", function (request, response) {
    console.log(request.body);

    let cafe_id = request.body.cafe_id;
    cafe_id = parseInt(cafe_id);
    let mem_id = request.body.mem_id;
    
    let sql = "select * from zzim where cafe_id = ? and mem_id = ?";
    console.log(sql);
    conn.query(sql, [cafe_id, mem_id], function (err, rows) {
        if (!err) {
            console.log(rows);  

            let arr = new Array();
            let data = new Object();

            data.zzimSel = rows.length;
        
            arr.push(data);
            let jsonData = JSON.stringify(arr);
        
            console.log(jsonData);
            response.send(jsonData);
        } else {
            console.log(err);
        }
    });
});

router.post("/Insert", function (request, response) {
    console.log(request.body);

    let cafe_id = request.body.cafe_id;
    cafe_id = parseInt(cafe_id);
    let mem_id = request.body.mem_id;

    let sql = "insert into zzim values(?, ?)";
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

router.post("/Delete", function (request, response) {
    console.log(request.body);

    let cafe_id = request.body.cafe_id;
    cafe_id = parseInt(cafe_id);
    let mem_id = request.body.mem_id;

    let sql = "delete from zzim where mem_id = ? and cafe_id = ?";
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