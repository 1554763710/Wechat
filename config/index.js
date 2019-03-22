
module.exports = {
    url : "http://7bb94312.ngrok.io",
    token : "weixingongzonghao_guo" ,
    appId : "wx69bdfca5513761b1",
    appSecret : "cc90b34fa9976f546c937f5c4bdad6cb",
    menu : {
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
    },
    URL_PREFIX : "https://api.weixin.qq.com/cgi-bin/",
}
