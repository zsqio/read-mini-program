//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
      userInfo: {},
      informImg: '../../images/happy.png',
      informText: '请输入您要查找的书名~',
      searchKey:'',
      bookList: [],
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
        const _this = this
        wx.showLoading({
            title: 'loading',
        })
        wx.request({
            url: 'http://localhost:8888/book/list',
            data: {
                status: 0,
                title: _this.data.searchKey
            },
            success(res) {
                if (res.data.result) {
                    const data = res.data.data
                    data.forEach(item => {
                        item.record_date = date.formatTime(item.record_date).substring(0, 10)
                    })
                    _this.setData({
                        bookList: data
                    })
                } else {
                    
                }
            },
            fail() {
                _this.setData({
                        informImg: '../../images/unhappy.png',
                        informText: '非常抱歉,没有找到您想要的书籍,管理员会及时上架最新资源哦！'
                    })
            },
            complete() {
                wx.hideLoading()
            }
        })
    },
})
