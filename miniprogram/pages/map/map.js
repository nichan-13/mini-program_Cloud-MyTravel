// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 102.041445,
    latitude: 36.530123,
    markers: [{
      id: 0,
      longitude: 102.041445,
      latitude: 36.530123,
      iconPath: '/image/icon/coord.png',
      width: 40,
      height: 40,
      zIndex: 2
    }]
  },
  markersTap: function () {
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: '西宁曹家堡国际机场',
      address: '中关村东路8号'
    })
  },

  btnTap: function() {
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
      }
     })
  }
})