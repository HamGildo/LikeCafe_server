const express = require("express");
const app = express();
const cafeRouter = require("./routes/cafe");
const memberRouter = require("./routes/member");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:false}));
app.use('/Cafe',cafeRouter);
app.use('/Member', memberRouter);
app.listen(3003);
// 3003 -> server, 3307 -> Mysql