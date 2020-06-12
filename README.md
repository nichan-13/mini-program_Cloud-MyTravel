# mini-program_Cloud-MyTravel
微信小程序云开发-旅游邀请函

## 小程序简介
这是一个 `微信小程序` + `云开发` 开发的一个旅游邀请函小程序，由图片、视频、地图介绍和展示旅游地点，可填写信息后报名加入队伍，可在留言板查看所有已报名人员的出行宣言。

## 项目目录说明
```
  "pages":[
    "pages/index/index",       // 首页（寻找伙伴），邀请函海报，可开启和暂停背景音乐，可联系发起人
    "pages/partner/partner",   // 报名页（加入队伍），填写信息提交报名加入队伍
    "pages/picture/picture",   // 图片展示页（记录瞬间），竖向轮播图展示
    "pages/map/map",           // 地图页（集合地点），标记旅游集合地点
    "pages/video/video",       // 视频展示页（美景实拍），展示旅游风景视频，可发弹幕
    "pages/message/message"    // 留言板页，显示所有报名人员的出行宣言
  ]
```

## 项目云开发说明
- 数据库  
    - 集合名称 travelMessage  
    - 字段说明  
        ```
            _id：系统自动生成的id
            message：用户提交的出行宣言
            name：用户提交的姓名
            num_people：用户提交的出行人数
            phone：用户提交的电话号码
        ```  

- 文件存储  
    - 小程序前端直接上传的云端文件，项目中上传了**记录瞬间**的轮播图片及**美景实拍**的视频  

- 云函数
    - cloudfunctions/addMessage  将用户提交数据添加至数据库
    - cloudfunctions/viewMessage  查询数据库中的所有数据  

##  项目展示
1. 寻找伙伴  
    ![index.jpg](https://z4a.net/images/2020/06/12/index.jpg)

2. 记录瞬间  
    ![picture.jpg](https://z4a.net/images/2020/06/12/picture.jpg)

3. 美景实拍  
    ![video.jpg](https://z4a.net/images/2020/06/12/video.jpg)

4. 集合地点  
    ![map.jpg](https://z4a.net/images/2020/06/12/map.jpg)

5. 加入队伍  
    ![patner.jpg](https://z4a.net/images/2020/06/12/patner.jpg)

6. 留言板  
    ![message.jpg](https://z4a.net/images/2020/06/12/message.jpg)


## 开发注意
对于下方几条提示有疑问的可见 [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)  

- 导入项目需填写自己的**appid**，勾选**云开发**选项
- 将 `pages/index/index.js` 中 `onReady() { this.bgMusic.src }` 音乐链接换成自己的链接，建议搭建一个本地服务器或上传至云存储
- 将 `pages/picture/picture.js` 中轮播图片链接换成自己的链接，建议直接放在image目录下或上传至云存储
- 将 `pages/video/video.js` 中 `videoList.src` 换成自己的链接，建议搭建一个本地服务器或上传至云存储
- 将 `pages/partner/partner.js` 中模拟服务器代码的**appid**和**secret**换成自己的appid和secret，发送模板消息中的**tmplIds**、**template_id**更换成自己的模板消息id，并将 `data` 内的数据修改为自己的模板对应的数据


## 参考文档  

- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)  

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

