const express = require("express");
const router = express.Router();

const conn = require("../config/DBConn.js");

// 카페 대표 상세 정보를 가져오는 라우터 
router.post("/DetailInfo", function (request, response) {
    console.log(request.body);

    let cafe_id = request.body.cafe_id;

    let sql = "select * from cafedetail where cafe_id = ? and keyword_id in (4, 21, 22, 23) order by (keyword_id)";
    console.log(sql);
    conn.query(sql, [cafe_id], function (err, rows) {
        if (!err) {
            console.log(rows);

            let arr = new Array();
            let data = new Object(); //여러속성을 하나로 묶어주는 Object생성

            data.parking = rows[0].content;
            data.space = rows[1].content;
            data.tableNum = rows[2].content;
            data.floor = rows[3].content;

            arr.push(data);

            let jsonData = JSON.stringify(arr);
            console.log(jsonData);
            response.send(jsonData);

        } else {
            console.log(err);
        }
    });

});

router.post("/GetKeywords", function (request, response) {
    console.log(request.body);

    let cafe_id = request.body.cafe_id;

    let sql = "select * from detailview where cafe_id = ? order by (keyword_id);";
    console.log(sql);
    conn.query(sql, [cafe_id], function (err, rows) {
        if (!err) {
            console.log(rows);

            let arr = new Array();
            let data = new Object(); //여러속성을 하나로 묶어주는 Object생성
            data.keywords = "";
            for (let i = 0; i < rows.length; i++) {
                data.keywords += rows[i].keyword_name+",";
            }

            (data.keywords).slice(0, -1);
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