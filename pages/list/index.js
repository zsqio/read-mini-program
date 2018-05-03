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

      //设置页面title
      wx.setNavigationBarTitle({
        title: tag
      })  
  },
  //根据标签搜索图书信息
  getBooksOfTag(tag) {
      let self = this
      wx.showLoading({
         title: 'loading',
      })
      var keyword = tag
      wx.request({
            url: 'http://192.168.1.104:9999/book/tag',
            method:'get',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            data: {
                tag: keyword
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
  goDetail(event) {
      const name = event.currentTarget.dataset.name
      wx.navigateTo({
          url:'../bookDetail/index?name=' + name
      })
  }
})
