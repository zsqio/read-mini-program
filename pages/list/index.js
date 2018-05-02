//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
      bookList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
      
    })
  },
  onLoad: function (options) {
      var self = this
      var tag = options.tag
      self.getBooksOfTag(tag)    
  },
  getBooksOfTag(tag) {
      wx.showLoading({
              title: 'loading',
          })
      var keyword = tag
      wx.request({
        url: 'http://192.168.1.104:9999/book/search?tag='+ keyword,
        method:'get',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            success(res) {
                if(res.data.data.length) {
                    const data = res.data.data
                    self.setData({
                        bookList: data
                    })
                } else {

                }               
            },
            complete() {
                wx.hideLoading()
            }
      })
  },
})
