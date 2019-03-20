const fetchAT = require("./getAT");
const rq = require("request-promise-native");

const menu =  {
    "button":[
    {    
         "type":"click",
         "name":"今日歌曲",
         "key":"V1001_TODAY_MUSIC"
     },
     {
          "name":"菜单",
          "sub_button":[
          {    
              "type":"view",
              "name":"搜索",
              "url":"http://www.soso.com/"
           },
           {
                "type":"miniprogram",
                "name":"wxa",
                "url":"http://mp.weixin.qq.com",
                "appid":"wx286b93c14bbf93aa",
                "pagepath":"pages/lunar/index"
            },
           {
              "type":"click",
              "name":"赞一下我们",
              "key":"V1001_GOOD"
           }]
      }]
}

async function createMenu(){
    const { access_token } = await fetchAT();
    const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`;

    // 发送post请求
    const result = rq({method : "POST" ,url ,json : true ,body : menu}); 
    return result;
}

async function deleteMenu(){
    const { access_token } = await fetchAT();
    const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${access_token}`;

    // 发送post请求
    const result = rq({method : "POST" ,url ,json : true });
    return result;
}

(async ()=>{
    let result = await deleteMenu();
    console.log(result);
    result = await createMenu();
    console.log(result);
})();