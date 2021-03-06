const express = require("express");
const router = express.Router();
const fs = require("fs");
const sharp = require("sharp");
const mysql = require("mysql");
const conn = require("../config/DBConn.js");

router.post("/SearchByCategory", function (request, response) {
    console.log(request.body);

    let category = request.body.category;
    let region = request.body.region;


    category = "%" + category + "%";
    if(region == "지역선택") {region = "";}
    region = region + "%";
    
    let sql = "select * from cafe where category like ? and address like ?";
    console.log(sql);
    conn.query(sql, [category, region], function (err, rows) {
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

router.post("/SearchByKeyword", function (request, response) {
    console.log(request.body);

    let keyword = request.body.keyword;
    keyword = keyword.slice(0, -1);
    let region = request.body.region;
    if(region == "지역선택") {region = "";}
    region = region + "%";
    
    let sqlArr = keyword.split(',');
    let sql = "select * from detailview v, cafe c where v.cafe_id = c.cafe_id"
    sql += " and keyword_name in (";
    sqlArr.forEach(element => {
        sql += "?" + ",";
    });
    sql = sql.slice(0, -1) + ")";
    sql += " and address like ? group by v.cafe_id";
    sql += " having count(v.cafe_id) >= ?";
    
    sqlArr.push(region);
    sqlArr.push(sqlArr.length - 1);
    console.log(sqlArr);
    let sqll = mysql.format(sql, sqlArr);
    console.log(sqll);
    conn.query(sqll, function (err, rows) {
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




// 리뷰 페이지에 카페 정보(카페명, 주소)를 가져오는 라우터
// (10월 20일 작성 ... )
router.post("/CafeInfo", function (request, response) {
    console.log(request.body);
    let cafe_id = request.body.cafe_id;

    let sql = "select * from member where cafe_id = ?";
    conn.query(sql, [cafe_id], function (err, rows) {
        if (!err) {
            console.log(rows);
            let arr = new Array(); 
            let data = new Object();

            // id로 요청하면 어차피 row는 1개만 나옴 (id는 유일값)
            data.cafe_name = rows[0].cafe_name;
            data.address = rows[0].address;
            // 돌려주고 싶은 자료들 보내주면 됨

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