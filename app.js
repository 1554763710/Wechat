const express = require("express");
const sha1 = require("sha1");
const {getData , setObj , simplifyObj} = require("./tools/tools");

const app = express();

app.use( async (req,res) =>{
    const {signature ,echostr ,timestamp ,nonce} = req.query;
    const token = "weixingongzonghao_guo";
    const shaText = sha1([token,timestamp,nonce].sort().join(""));

    if(req.method === "GET"){
        // 对接微信服务器
        if(shaText === signature){
            res.end(echostr);
        }else{
            res.end("error");
        }
    }else if(req.method === "POST"){
        // 接收客户端信息/通过微信服务器接收
        if(shaText !== signature){
            res.end("error");
            return;
        }
        // 得到客户发送的数据
        const xmlData = await getData(req);
        // 将 xml 数据转为 js 对象
        let jsData = setObj(xmlData);
        // js 对象简化
        let newJsData = simplifyObj(jsData);
        /* { ToUserName: 'gh_4f5a976449de',
            FromUserName: 'o6HZg1TckBEEkr4Tu5amb2JHHTEk',
            CreateTime: '1552993577',
            MsgType: 'text',
            Content: '11',
            MsgId: '22233525050256383' } */
        // 设置自动发送消息(文本)
        let content = "哈哈哈哈哈";
        if(newJsData.Content === "1"){
           content = "嘻嘻嘻嘻嘻嘻";
        }else if(newJsData.Content === "2"){
            content = "呵呵呵呵呵";
        }

        const text = `<xml>
        <ToUserName><![CDATA[${newJsData.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${newJsData.ToUserName}]]></FromUserName>
        <CreateTime>${Date.now()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${content}]]></Content>
        </xml>`;
        res.send(text);
    }
});
app.listen(3000,err =>{
    if(!err) console.log("服务器启动成功");
    else console.log(err);
})              