// pages/video/video.js

// 弹幕随机颜色
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  data: {
    videoList: [{
      id: '0',
      title: '茶卡盐湖',
      time: "2019-06-17",
      src: 'http://192.168.2.101:8000/yh.mp4',
      danmuList: [{
        text: '打卡1111',
        color: '#999',
        time: 1
      }, {
        text: '打卡2222',
        color: '#ffc034',
        time: 3
      }]
    }, {
      id: '1',
      title: '祁连卓尔山',
      time: "2019-06-15",
      src: 'http://192.168.2.101:8000/qls.mp4',
      danmuList: [{
        text: 'goodgoodgood',
        color: '#fff',
        time: 1
      }, {
        text: '打卡2222',
        color: '#ffc034',
        time: 3
      }]
    }, {
      id: '2',
      title: '青海湖',
      time: "2019-06-16",
      src: 'http://192.168.2.101:8000/qhh.mp4',
      danmuList: [{
        text: '1111111111',
        color: '#f24',
        time: 2
      }, {
        text: '打卡2222',
        color: '#ffc034',
        time: 3
      }]
    }, {
      id: '3',
      title: '公路-路霸牛',
      time: "2019-06-15",
      src: 'http://192.168.2.101:8000/nq.mp4',
      danmuList: [{
        text: '666',
        color: '#999',
        time: 1
      }, {
        text: '打卡2222',
        color: '#ffc034',
        time: 3
      }]
    }, {
      id: '4',
      title: '雪山',
      time: "2019-06-18",
      src: 'http://192.168.2.101:8000/xs.mp4',
      danmuList: [{
        text: '踩踩踩踩踩踩',
        color: '#000',
        time: 1
      }, {
        text: '打卡2222',
        color: '#ffc034',
        time: 3
      }]
    }, {
      id: '5',
      title: '祁连大草原',
      time: "2019-06-18",
      src: 'http://192.168.2.101:8000/cy.mp4',
      danmuList: [{
        text: 'yeye',
        color: '#ffr4e3',
        time: 1
      }, {
        text: '打卡2222',
        color: '#ffc034',
        time: 3
      }]
    }]
  },

  videoContext: null,
  inputValue: '',

  onReady() {
    this.videoContext = wx.createVideoContext('0')
    console.log(videoContext)
  },

  bindInputBlur(e) {
    this.inputValue = e.detail.value
  },
  bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  // 获取视频
  // bindButtonTap() {
  //   const that = this
  //   wx.chooseVideo({
  //     sourceType: ['album', 'camera'],
  //     maxDuration: 60,
  //     camera: ['front', 'back'],
  //     success(res) {
  //       that.setData({
  //         src: res.tempFilePath
  //       })
  //     }
  //   })
  // },
  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  // 下拉触底
  onReachBottom: function () {
    console.log('触底了')
    wx.showToast({
      title: '我也是有底线的！',
      icon: 'none',
      duration: 1500
    })
  },

  onShareAppMessage() {
    return {
      title: '美好时刻-青海',
      path: '/pages/video/video',
      success: this.forwordSuccess()
    }
  },
  // 转发成功
  forwordSuccess: function () {
    wx.showToast({
      title: '转发成功',
      icon: 'success', //icon: 'loading',
      duration: 3000
    })
  },
})