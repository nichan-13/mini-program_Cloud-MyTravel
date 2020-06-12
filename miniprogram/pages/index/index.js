//index.js

Page({
  data: {
    isPlayingMusic: false
  },
  bgMusic: null,

  onReady: function () {
    this.bgMusic = wx.getBackgroundAudioManager();
    this.bgMusic.src = 'cloud://travel-e2e51.7472-travel-e2e51-1302223607/bgMusic.mp3';
    this.bgMusic.title = "bgMusic"
    this.bgMusic.onCanplay(() => this.bgMusic.pause())
  },
  play: function () {
    if (this.data.isPlayingMusic) {
      this.bgMusic.pause()
    } else {
      this.bgMusic.play()
    }
    this.setData({
      "isPlayingMusic": !this.data.isPlayingMusic
    })
  },
  callContact: function () {
    wx.makePhoneCall({
      phoneNumber: '11111111111',
    })
  },
  onShareAppMessage() {
    return {
      title: '出发，去青海！',
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