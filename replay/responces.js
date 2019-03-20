module.exports = (newJsData) =>{
    let options = {
        toUserName : newJsData.FromUserName,
        fromUserName : newJsData.ToUserName,
        createTime : Date.now(),
        type : "text"
    }

    if(newJsData.MsgType === "text"){
        options.content = "哈哈哈哈哈";
        if(newJsData.Content === "1"){
            options.content = "嘻嘻嘻嘻嘻嘻";
        }else if(newJsData.Content && newJsData.Content.indexOf("2") !== -1){
            options.content = "呵呵呵呵呵";
        }
    } else if(newJsData.MsgType === "voice"){
        options.content = newJsData.Recognition;
    } else if(newJsData.MsgType === "location"){
        options.content = `地理位置维度:${newJsData.Location_X}
        \n 地理位置经度:${newJsData.Location_Y}
        \n 地图缩放大小:${newJsData.Scale}
        \n 地理位置信息:${newJsData.Label}`;
    }else if(newJsData.MsgType === "event"){
        if(newJsData.Event === "subscribe"){
            if(newJsData.EventKey){
                options.content = "二维码带参数关注~";
                return;
            }
            options.content = "你好,欢迎关注~";
        }else if(newJsData.Event === "CLICK"){
            options.content = "点击菜单";
        }else if(newJsData.Event === "unsubscribe"){
            console.log("取关");
            options.content = "";
        }
    }else if(newJsData.MsgType === "image"){
        options.type = "image";
        options.mediaid = newJsData.MediaId;
        options.content = "";
    }
    return options;
}