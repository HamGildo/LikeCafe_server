const express = require("express");
const router = express.Router();

const conn = require("../config/DBConn.js");

router.post("/searchByCategory", function (request, response) {
    console.log(request.body);

    let category = request.body.category;
    let region = request.body.region;

    category = "%" + category + "%";
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
                data.cafe_image = rows[i].cafe_image;
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


module.exports = router;