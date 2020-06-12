// pages/message/message.js
Page({
  data: {
    messageList: ''
  },

  onLoad: function() {
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'viewMessage',
      success: res => {
        console.log('查询成功： ', res.result.data)
        this.setData({
          messageList: res.result.data
        })
      }
    })
    
    // 本地查询，一次只可查询二十条数据
    // const db = wx.cloud.database()
    // // 查询当前用户所有的 counters
    // db.collection('travelMessage').get({
    //   success: (res) => {
    //     this.setData({
    //       messageList: res.data
    //     })
    //     console.log('[数据库] [查询记录] 成功: ', res.data)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '留言板读取失败，请稍后重试~'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
  }

})