var util = require('../../utils/util.js');
var API = require('../../utils/api.js');
var app = getApp()
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
             url: API.COLLECT_LIST,
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
  },
  goDetail(event) {
      console.log('11')
      const name = event.currentTarget.dataset.name
      wx.navigateTo({
          url:'../bookDetail/index?name=' + name
      })
  }
})