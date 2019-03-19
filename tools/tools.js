
const {parseString} = require('xml2js');

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
    }
}