const express = require("express");
const sha1 = require("sha1");
const app = express();

app.use((req,res) =>{
    /* { signature: '5f3b392dfac721e926327f9b80663d15dcabb47d',
  echostr: '7817495729074196183',
  timestamp: '1552991767',
  nonce: '1828053622' } */
    const {signature ,echostr ,timestamp ,nonce} = req.query;
    const token = "weixingongzonghao_guo";
    const shaText = sha1([token,timestamp,nonce].sort().join(""));
    if(shaText === signature){
        res.end(echostr);
    }else{
        res.end("error");
    }
});
app.listen(3000,err =>{
    if(!err) console.log("服务器启动成功");
    else console.log(err);
})              