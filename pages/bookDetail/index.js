var app = getApp()
var API = require('../../utils/api.js');
Page({
    data: {
        baseInfo: {
            name: '',
            engName: '',
            cover: '',
            author: '',
            piblisher: '',
            isbn: '',
            tag: []
        },
        name:'',
        user: '',
        detailInfo: {
            authorIntro: '',
            bookIntro: '',
        },
        commentList: [
            {
                avatar: 'https://img3.doubanio.com/icon/u3048252-14.jpg',
                name: '呆姐呆',
                comment: '买给我侄女李小曦,她非常喜欢~'
            },
            {
                avatar: 'https://img3.doubanio.com/icon/u3048252-14.jpg',
                name: '呆姐呆',
                comment: '买给我侄女李小曦,她非常喜欢~'
            },
            {
                avatar: 'https://img3.doubanio.com/icon/u3048252-14.jpg',
                name: '呆姐呆',
                comment: '买给我侄女李小曦,她非常喜欢~'
            },
            {
                avatar: 'https://img3.doubanio.com/icon/u3048252-14.jpg',
                name: '呆姐呆',
                comment: '买给我侄女李小曦,她非常喜欢~'
            },
            {
                avatar: 'https://img3.doubanio.com/icon/u3048252-14.jpg',
                name: '呆姐呆',
                comment: '买给我侄女李小曦,她非常喜欢~'
            },

        ],
        activeIndex: 1,
        likeStatus: 0,
        likeImg: '../../images/tobeliked.png',
    },
    onLoad(options) {
        let self = this
        let name = options.name
        self.setData ({
            name: name
        })
        //获取图书基本信息
        self.getBookInfo(name)
        //获取图书详细信息
        self.getBookDetail(name) 
        wx.getUserInfo({
            success: function(res) {
                let userInfo = res.userInfo
                let nickName = userInfo.nickName
                console.log(name, nickName)
                self.getCollectStaus(name,nickName)
                self.setData({
                    user: nickName
                })
            }
        })                       
    },
    switchTab(event) {
        this.setData({ activeIndex: +event.target.dataset.index })
    },
    like() {
        let self = this;
        let url = ''
        if(self.data.likeStatus) { 
            url = 'delete'       
            wx.showToast({
                title: '已取消收藏',
                icon: 'success',
                duration: 2000
            })
        } else {  
            url = 'insert'  
            wx.showToast({
                title: '已收藏',
                icon: 'success',
                duration: 2000
            })
        } 
        self.collect(url,self.data.name, self.data.user, self.data.baseInfo.cover) 
    },
    collect(url, name, user, cover) {
        let self = this
        wx.request({
            url: API.BOOK_COLLECT + url,
            method:'post',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            data: {
                name,
                user,
                cover
            },
            success(res) {  
                self.getCollectStaus(self.data.name, self.data.user)
            }
        })
    },
    getBookDetail(name) {
        let self = this
        wx.request({
            url: API.BOOK_DETAIL,
            method:'get',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            data: {
                name: name
            },
            success(res) {
                if(res.data.data.length) {
                    const data = res.data.data
                    self.setData({
                        detailInfo: data[0]
                    })
                } else {

                }               
            }
        })
    },
    getBookInfo(name) {
        let self = this
        wx.showLoading(
            {
                title: 'loading'
            }
        )
        wx.request({
            url: API.BOOK_LIST,
            method:'get',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            data: {
                name: name
            },
            success(res) {
                if(res.data.data.length) {
                    const data = res.data.data
                    self.setData({
                        baseInfo: data[0]
                    })
                } else {

                }               
            },
            complete() {
                wx.hideLoading()
            }
        })
    },
    getCollectStaus(name, user) {
        let self = this
        wx.request({
            url: API.COLLECT_STATUS,
            method:'get',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            data: {
                name: name,
                user: user
            },
            success(res) {
                let status = res.data.status
                 if(status) {
                     self.setData({
                         likeStatus: status,
                         likeImg: '../../images/liked.png'
                     })
                 } else {
                     self.setData({
                         likeStatus: status,
                         likeImg: '../../images/tobeliked.png'
                     })
                 }        
            }
        })
    } 
})