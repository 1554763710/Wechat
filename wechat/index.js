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
const URL_PREFIX = "https://api.weixin.qq.com/cgi-bin/";
// 创建菜单
async function createMenu(){
    const { access_token } = await fetchAT();
    const url = `${URL_PREFIX}menu/create?access_token=${access_token}`;

    // 发送post请求
    const result = rq({method : "POST" ,url ,json : true ,body : menu}); 
    return result;
}
// 删除菜单
async function deleteMenu(){
    const { access_token } = await fetchAT();
    const url = `${URL_PREFIX}menu/delete?access_token=${access_token}`;

    // 发送post请求
    const result = rq({method : "POST" ,url ,json : true });
    return result;
}
// 创建用户标签
async function createTag(name){
    const { access_token } = await fetchAT();
    const url = `${URL_PREFIX}tags/create?access_token=${access_token}`;

    // 发送post请求
    const result = rq({method:"POST", url, json:true , body:{"tag":{ name }}});
    return result;
}
// 批量为用户打下标签
async function usersTag(openid_list, tagid){
    const { access_token } = await fetchAT();
    const url = `${URL_PREFIX}tags/members/batchtagging?access_token=${access_token}`;

    // 发送post请求
    const result = rq({method:"POST", url, json:true , body:{ openid_list, tagid }});
    return result;
}
// 得到标签下的用户
async function getTagUsers(tagid, next_openid = ""){
    const { access_token } = await fetchAT();
    const url = `${URL_PREFIX}user/tag/get?access_token=${access_token}`;

    // 发送post请求
    const result = rq({method:"POST", url, json:true , body:{ tagid, next_openid }});
    return result;
}
// 得到所有的标签名
async function getTags(){
    const { access_token } = await fetchAT();
    const url = `${URL_PREFIX}tags/get?access_token=${access_token}`;

    // 发送post请求
    const result = rq({method:"GET", url, json:true });
    return result;
}
// 通过标签群发消息
async function messageSendAll(body){
    const { access_token } = await fetchAT();
    const url = `${URL_PREFIX}message/mass/sendall?access_token=${access_token}`;

    // 发送post请求
    const result = rq({method:"POST", url, json:true ,body});
    return result;
}
// 运行
(async ()=>{

    // 自定义菜单(要先将之前删除,在自定义菜单)
    /*let result = await deleteMenu();
    console.log(result);
    result = await createMenu();
    console.log(result);*/

    // 用户分类 (创建标签 --> 添加用户 --> 获取标签下的用户)
    // let result1 = await createTag("class");
    // console.log(result1);
    // let result2 = await usersTag(["o6HZg1TckBEEkr4Tu5amb2JHHTEk"], result1.tag.id);
    // console.log(result2);
    // let result3 = await getTagUsers(result1.tag.id);
    // console.log(result3);

    // 得到标签名
    // let result = await getTags();
    // console.log(result);

    // 通过标签群发消息
    const body = {
        "filter":{
           "is_to_all":true,
           "tag_id":100
        },
        "text":{
           "content":"吃鸡"
        },
         "msgtype":"text"
    }
    let result = await messageSendAll(body);
    console.log(result);
})();