// pages/partner/partner.js
Page({
  data: {
    array: [1, 2, 3, 4],
    name: '',
    phone: '',
    numPeople: 1,
    message: ''
  },

  // 留言板
  toMessagePage: function () {
    wx.navigateTo({
      url: '../message/message',
    })
  },
  // 出行人数
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', Number(e.detail.value)  + 1)
    this.setData({
      numPeople: Number(e.detail.value) + 1
    })
  },

  // 验证姓名
  nameChange: function (e) {
    this.checkName(e.detail.value)
  },
  // 验证号码
  phoneChange: function (e) {
    this.checkPhone(e.detail.value)
  },
  // checkName
  checkName: function (data) {
    var reg = /^[\u4E00-\u9FA5A-Za-z]+$/;
    return this.check(data, reg, '请输入正确的姓名！')
  },
  // checkPhone
  checkPhone: function (data) {
    var reg = /^(((13)|(15)|(17)|(18))\d{9})$/;
    return this.check(data, reg, '请输入正确的手机号码！')
  },
  // check
  check: function (data, reg, errMsg) {
    if (!reg.test(data)) {
      wx.showToast({
        title: errMsg,
        icon: 'none',
        duration: 1500
      })
      return false
    }
    return true
  },

  // 表单验证
  formSubmit: function (e) {
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var num_people = this.data.numPeople;
    var message = e.detail.value.message;
    // console.log('name:' + name + ' phone:' + phone + ' num:' + num_people + ' message:' + message)

    if (this.checkName(name) && this.checkPhone(phone)) {
      wx.cloud.callFunction({
        // 需调用的云函数名
        name: 'addMessage',
        // 传给云函数的参数
        data: {
          name,
          phone,
          num_people,
          message
        },
        success: res => {
          console.log('提交成功 ', res)
          this.setData({
            name: null,
            phone: null,
            numPeople: 1,
            message: null
          })
        },
        fail: (err) => {
          wx.showToast({
            icon: 'none',
            title: '提交失败，请稍后再试~'
          })
          console.error('提交失败：', err)
        }
      });

      // 此处编写代码将e.detail.value提交到服务器
      wx.login({
        success: res => {
          server.post({
            code: res.code
          }, () => {
            // 将表单提交给服务器，传入formId和code
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000
            })
            // 提交成功后，由服务器发送模板消息
            server.sentTemplateMessage(res => {
              console.log('模板消息发送结果：', res.data)
            })
          })
        }
      })
    }
  }
})

// 模拟服务器代码
var server = {
  appid: 'your appid',
  secret: 'your secret',
  // 用于保存用户的openid
  user: {
    openid: ''
  },
  // 用于接收表单，调用this.getOpenid()根据code换取openid
  post: function (data, success) {
    // console.log('收到客户端提交的数据', data);
    this.getOpenid(data.code, res => {
      console.log('用户openid:' + res.data.openid);
      this.user.openid = res.data.openid;
      success();
    })
  },
  // 用于根据code获取openid
  getOpenid: function (code, success) {
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      data: {
        appid: this.appid,
        secret: this.secret,
        grant_type: 'authorization_code',
        js_code: code
      },
      success: success
    })
  },
  // 用于发送模板消息
  sentTemplateMessage: function (success) {
    wx.requestSubscribeMessage({
      tmplIds: ['your tmplIds'],
      success: () => {
        console.log('requestSubscribeMessage成功！')
        var user = this.user
        var data = {
          touser: user.openid,
          template_id: 'your template_id',
          page: 'index',

          "data": {
            "thing1": {
              "value": "出发，去青海！"
            },
            "thing2": {
              "value": "@Ooooh"
            },
            "thing3": {
              "value": "@青海旅游小队"
            },
            "time4": {
              "value": "2020-07-01 09:00"
            }
          }
        }
        this.getAccessToken(res => {
          var token = res.data.access_token
          console.log('服务器access_token：' + token)
          var url = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + token
          wx.request({
            url: url,
            method: 'POST',
            data: data,
            success: success
          })
        })
      },
      fail(err) {
        console.log(err)
      }
    });
  },
  // 用于获取access_token
  getAccessToken: function (success) {
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + this.appid + '&secret=' + this.secret
    wx.request({
      url: url,
      success: success
    })
  }

}