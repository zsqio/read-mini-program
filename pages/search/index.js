var app = getApp()
var API = require('../../utils/api.js');
Page({
  data: {
      userInfo: {},
      informImg: '../../images/happy.png',
      informText: '请输入您要查找的书名~',
      searchKey:'',
      searchList: [],
      hasData: false,
  },
  onLoad: function () {

  },
  bindKeyInput(e) {
        this.setData({
            searchKey: e.detail.value
        })
    },
  search() {
        if (!this.data.searchKey) {
            return
        }
        const self = this
        wx.showLoading({
            title: 'loading',
        })
        wx.request({
            url: API.BOOK_SEARCH,
            method:'get',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            data: {
                name: self.data.searchKey
            },
            success(res) {
                if (res.data.data.length) {       
                    const data = res.data.data
                    self.setData({
                        searchList: data,
                        hasData: true
                    })
                } else {
                    self.setData({
                        informImg: '../../images/unhappy.png',
                        informText: '非常抱歉,没有找到您想要的书籍,管理员会及时上架最新资源哦！'
                    })
                }
            },
            fail() {
                self.setData({
                    informImg: '../../images/unhappy.png',
                    informText: '非常抱歉,没有找到您想要的书籍,管理员会及时上架最新资源哦！'
                })
            },
            complete() {
                wx.hideLoading()
            }
        })
    },
    goDetail(event) {
        let name = event.currentTarget.dataset.name
        wx.navigateTo({
            url:'../bookDetail/index?name='+name
        })
    }
})
