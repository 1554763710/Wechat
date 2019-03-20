// 获取 access_token
// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

const rq = require("request-promise-native");
const { writeFile , readFile} = require("fs");
// 发送请求,获取access_token,设置过期时间
async function getAccessToken(){
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx69bdfca5513761b1&secret=cc90b34fa9976f546c937f5c4bdad6cb`;
    
    const result = await rq({
        method : "GET",
        url,
        json : true
    })
    result.expires_in = Date.now() + 7200000 -300000;
    writeFile("./node/wenchat/wechat/accesstoken.txt" ,JSON.stringify(result) ,err =>{
        if(!err) console.log("文件保存成功");
        else console.log(err);
    })
    return result;
}
module.exports = function fetchAT(){
    return new Promise((resolve ,reject) =>{
        const data = readFile("./node/wenchat/wechat/accesstoken.txt", (err ,data)=>{
            if(!err){
                resolve(JSON.parse(data));
            }else {
                reject(err);
            }
        })
    }).then(data =>{
        if( data.expires_in > Date.now()){
            // 未过期
            return data;
        }else{
            // 已过期
            return getAccessToken();
        }
    }).catch(err =>{
        return getAccessToken();
    })
    
}