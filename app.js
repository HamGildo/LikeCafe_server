const express = require("express");
const app = express();
const router = require("./routes/router.js");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:false}));
app.use(router);
app.listen(3003);
// 3003 -> server, 3307 -> Mysql