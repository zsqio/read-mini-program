var API = require('../../utils/api.js');
Page({

    data: {
        name: '',
        author: '',
        user: '',
        informStatus: false
    },
    onLoad() {
        const self = this
        wx.getUserInfo({
            success(res) {
                const data = res.userInfo
                self.setData({
                    user: data.nickName
                })
            
            }
        })
    },
    handleChange(event) {
        const value = event.detail.value
        this.setData({
            informStatus: value
        })
    },
    nameInput(event) {
        this.setData({
            name: event.detail.value
        })
    },
    authorInput(event) {
        this.setData({
            author: event.detail.value
        })
    },

    //保存心愿单
    saveWish() {
        const self = this
        wx.request({
            url: API.NEW_WISHES,
            method: 'post',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            data: {
                name: self.data.name,
                author: self.data.author,
                user: self.data.user,
                informStatus: self.data.informStatus
            },
            success(res) {
                if(res.data.result) {
                    wx.showToast({
                        title: '心愿单保存成功',
                        icon: 'none',
                        duration: 1000
                    })
                    self.setData({
                        name: '',
                        author: '',
                        informStatus: false
                    })
                } else {
                    wx.showToast({
                        title: '心愿单保存失败',
                        icon: 'none',
                        duration: 1000
                    })
                }
            }
        })
    }

})