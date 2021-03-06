const express = require("express");
const app = express();
const cafeRouter = require("./routes/cafe");
const memberRouter = require("./routes/member");
const reviewRouter = require("./routes/review");
const zzimRouter = require("./routes/zzim");
const detailRouter = require("./routes/detail");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:false}));
app.use('/Cafe',cafeRouter);
app.use('/Member', memberRouter);
app.use('/Review', reviewRouter);
app.use('/Zzim', zzimRouter);
app.use('/Detail', detailRouter);
app.listen(3003);
// 3003 -> server, 3307 -> Mysql