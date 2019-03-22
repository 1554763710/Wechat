
const {parseString} = require('xml2js');
const { writeFile , readFile} = require("fs");
const { resolve } = require("path");

module.exports = {
    // 得到客户发送的数据
    getData : (req) =>{
        return new Promise((resolve ,reject) =>{
            let xmlData = "";
            // 接收到的数据
            req.on("data" , data =>{
                xmlData += data.toString();
            }).on("end" , () =>{
                // 数据接收完成
                resolve(xmlData);
            })
        })
    },
    // 将 xml 数据转为 js 对象
    setObj : (xmlData) =>{
        let jsData = null;
        parseString(xmlData, function (err, result) {
            jsData = result;
        });
        return jsData;
    },
    // js 对象简化
    simplifyObj : (jsData) =>{
        let newJsData = {};
        for(const key in jsData.xml){
            newJsData[key] = jsData.xml[key][0];
        }
        return newJsData;
    },
    // 写入文件
    write (fileUrl , data){
        fileUrl = resolve(__dirname ,"../wechat" ,fileUrl)
        return new Promise( (resolve ,reject) =>{
            writeFile(fileUrl ,JSON.stringify(data) ,err =>{
                if(!err) resolve("文件保存成功");
                else reject(err);
            })
        })
    },
    // 读取文件
    read (fileUrl){
        fileUrl = resolve(__dirname ,"../wechat" ,fileUrl)
        return new Promise((resolve ,reject) =>{
            readFile(fileUrl, (err ,data)=>{
                if(!err){
                    resolve(JSON.parse(data));
                }else {
                    reject(err);
                }
            })
        })
    }
}