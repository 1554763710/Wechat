

const sha1 = require("sha1");
const {getData , setObj , simplifyObj} = require("../tools/tools");
const type = require("./type");
const responces = require("./responces");
const {token} = require("../config")

module.exports = () =>{
    return async (req,res) =>{
        const {signature ,echostr ,timestamp ,nonce} = req.query;
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
            
            
            const options = responces(newJsData);
            const text = type(options);
            console.log(text);
            res.send(text);
        }
    }
}