
module.exports =  (options) =>{
    let text = `<xml>
        <ToUserName><![CDATA[${options.toUserName}]]></ToUserName>
        <FromUserName><![CDATA[${options.fromUserName}]]></FromUserName>
        <CreateTime>${options.createTime}</CreateTime>
        <MsgType><![CDATA[${options.type}]]></MsgType>`;
    if(options.type === "text"){
        text += `<Content><![CDATA[${options.content}]]></Content>`;
    }else if(options.type === "image"){
        text += `<Image>
        <MediaId><![CDATA[${options.mediaid}]]></MediaId>
      </Image>`; 
    }else if (options.type === 'voice') {
        text += `<Voice>
        <MediaId><![CDATA[${options.mediaId}]]></MediaId>
      </Voice>`
      } else if (options.type === 'video') {
        text += `<Video>
        <MediaId><![CDATA[${options.mediaId}]]></MediaId>
        <Title><![CDATA[${options.title}]]></Title>
        <Description><![CDATA[${options.description}]]></Description>
      </Video>`
      } else if (options.type === 'music') {
        text += `<Music>
        <Title><![CDATA[${options.title}]]></Title>
        <Description><![CDATA[${options.description}]]></Description>
        <MusicUrl><![CDATA[${options.musicUrl}]]></MusicUrl>
        <HQMusicUrl><![CDATA[${options.hqMusicUrl}]]></HQMusicUrl>
        <ThumbMediaId><![CDATA[${options.mediaId}]]></ThumbMediaId>
      </Music>`
      } else if (options.type === 'news'){
        text += options.arr.reduce((pre , item)=>{
            return pre + `<item>
            <Title><![CDATA[${item.title}]]></Title>
            <Description><![CDATA[${item.description}]]></Description>
            <PicUrl><![CDATA[${item.picUrl}]]></PicUrl>
            <Url><![CDATA[${item.url}]]></Url>
          </item>`
        } , `<ArticleCount>${options.arr.length}</ArticleCount>
        <Articles>`)
        text += `</Articles>`;
      }
    text += `</xml>`;
    return text;
}