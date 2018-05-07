var API = require('../../utils/api.js');
Page({
    data: {
        informImg: '../../images/happy.png',
        wishList:[],
        user: '',
        hasData: false
    },
    onLoad() {
        const self = this
        wx.getUserInfo({
            success(res) {
                const data = res.userInfo
                self.setData({
                    user: data.nickName
                })
                self.getWishList(data.nickName)    
            }
        })     
    },
    onShow() {
        this.getWishList(this.data.user)
    },
    getWishList(user) {
        const self = this
        wx.showLoading({
            title: 'loading'
        })
        wx.request({
            url: API.WISH_LIST,
            method: 'get',
            data: {
                user: user
            },
            success(res) {
                    const data = res.data.data
                    data.forEach((item, index) => {
                        item.status = item.status? '已上架': '未上架'
                    })
                    let flag = false
                    if(data.length) {
                        flag = true
                    } else {
                        flag = false
                    }
                    self.setData({
                        wishList: data,
                        hasData: flag
                    })
            },
            complete() {
                wx.hideLoading()
            }
        })
    },
    deleteWish(event) {
        const self = this
        const name = event.currentTarget.dataset.name
        wx.showModal({
             title: '提示',
            content: '确定要删除该心愿吗',
            success(res) {
                if (res.confirm) {
                    wx.request({
                    url: API.WISH_DELETE,
                    method: 'post',
                    data: {
                        name: name,
                        user: self.data.user
                    },
                    success(res) {
                        if(res.data.result) {
                            wx.showToast({
                                title: '删除成功',
                                icon: 'none',
                                duration: 2000
                            })
                        } else {
                            wx.showToast({
                                title: '删除失败',
                                icon: 'none',
                                duration: 1000
                            })
                        }
                        self.getWishList(self.data.user)
                    }
                })
            }
            }
        })
        
    },
    goNewWish() {
        wx.navigateTo({
            url: '../newWish/index'
        })
    }
})