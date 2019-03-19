const express = require("express");
const replay = require("./replay/index");

const app = express();

app.use(replay());
app.listen(3000,err =>{
    if(!err) console.log("服务器启动成功");
    else console.log(err);
})              