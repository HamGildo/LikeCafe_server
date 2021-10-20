const express = require("express");
const fs = require("fs");
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

router.post("/Select", function (request, response) {
    console.log(request.body);

    let mem_id = request.body.mem_id;

    let sql = "select * from cafe where cafe_id in (select cafe_id from zzim where mem_id = ?)";
    console.log(sql);
    conn.query(sql, [mem_id], function (err, rows) {
        if (!err) {
            console.log(rows);

            let arr = new Array();
            for(let i=0;i<rows.length;i++){ 
                let data = new Object(); //여러속성을 하나로 묶어주는 Object생성

                data.cafe_id = rows[i].cafe_id;
                data.cafe_name = rows[i].cafe_name;
                //data.cafe_image = rows[i].cafe_image;
                data.cafe_image = encodeImage(rows[i].cafe_id, rows[i].cafe_name);
                data.address = rows[i].address;
                data.business_hours = rows[i].business_hours;
                data.holiday = rows[i].holiday;
                data.tel = rows[i].tel;
                data.sns = rows[i].sns;
                data.category = rows[i].category;

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

function encodeImage(cafe_id, cafe_name) {
    let url = './image/';
    url += cafe_id + '_' + cafe_name + '1.jpg';
    url = url.replace(" ","");
    let readFile = fs.readFileSync(url);
    let encode = Buffer.from(readFile).toString('base64');
    return encode;
}


module.exports = router;