// 获取 access_token
// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

const rq = require("request-promise-native");
const { write , read} = require("../tools/tools");
const fetchAT = require("./getAT");
const {URL_PREFIX} = require("../config");
// 发送请求,获取access_token,设置过期时间
async function getTicket(){
    const { access_token } = await fetchAT();
    const url = `${URL_PREFIX}ticket/getticket?access_token=${access_token}&type=jsapi`;
    
    const ticket = await rq({
        method : "GET",
        url,
        json : true
    })
    ticket.expires_in = Date.now() + 7200000 -300000;
    const newTicket = { ticket:ticket.ticket, expires_in:ticket.expires_in }
    write("ticket.txt" ,newTicket);
    return ticket;
}
module.exports = function fetchTicket(){
    return read("ticket.txt")
    .then(data =>{
        if( data.expires_in > Date.now()){
            // 未过期
            return data;
        }else{
            // 已过期
            return getTicket();
        }
    }).catch(err =>{
        return getTicket();
    })
    
}

// (async ()=>{
//     let result = await fetchTicket()
//     console.log(result)
// })()