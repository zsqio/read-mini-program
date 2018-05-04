var util = require('../../utils/util.js');
Page({
  data:{
      collectList: []
  },
  onLoad(options){
      let self = this
      wx.setNavigationBarTitle({
        title: "我的收藏"
      })
      wx.getUserInfo({
            success: function(res) {
                let userInfo = res.userInfo
                let nickName = userInfo.nickName
                self.getMyCollect(nickName)
            }
        })   
  },
  getMyCollect(user) {
      let self = this
      wx.showLoading({
         title: 'loading',
      })
      wx.request({
             url: 'http://192.168.1.104:9999/collect/list',
            method:'get',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            data: {
                user: user
            },
            success(res) {
                if(res.data.data.length) {
                    const data = res.data.data
                    self.setData({
                        collectList: data
                    })
                } else {

                }               
            },
            complete() {
                wx.hideLoading()
            }
      })
  }
})