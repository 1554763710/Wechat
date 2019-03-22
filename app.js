const express = require("express");
const sha1 = require("sha1");
const replay = require("./replay/index");
const {appId , url} = require("./config");
const fetchTicket = require("./wechat/ticket");

const app = express();

app.set("views" , "views");
app.set("view engine" , "ejs");

app.get("/search", async (req, res) =>{
    const {ticket} = await fetchTicket();
    const noncestr = Math.random().toString().slice(2);
    const timestamp = Date.now();
    const arr = [
        `jsapi_ticket=${ticket}`,
        `noncestr=${noncestr}`,
        `timestamp=${timestamp}`,
        `url=${url}/search`
    ];
    const signature = sha1(arr.sort().join("&"));

    res.render("search",{appId, noncestr, url, timestamp, signature});
})

app.use(replay());
app.listen(3000,err =>{
    if(!err) console.log("服务器启动成功");
    else console.log(err);
})              