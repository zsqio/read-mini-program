var app = getApp()
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
        likeStatus: false,
        likeImg: '../../images/tobeliked.png',
    },
    onLoad(options) {
        let self = this
        let name = options.name
        //获取图书基本信息
        self.getBookInfo(name)
        //获取图书详细信息
        self.getBookDetail(name)      
    },
    switchTab(event) {
        this.setData({ activeIndex: +event.target.dataset.index })
    },
    like() {
        let self = this;
        self.setData(
            {
                likeStatus: !self.data.likeStatus
            }
        ) 
        if(self.data.likeStatus) {
            self.setData(
                {
                    likeImg: '../../images/liked.png'
                }
            )
            wx.showToast({
                title: '已收藏',
                icon: 'success',
                duration: 2000
            })
        } else {            
            self.setData(
                {
                    likeImg: '../../images/tobeliked.png'
                }
            )
            wx.showToast({
                title: '已取消收藏',
                icon: 'success',
                duration: 2000
            })
        }
        
        
    },
    getBookDetail(name) {
        let self = this
        wx.request({
            url: 'http://192.168.1.104:9999/detail',
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
            url: 'http://192.168.1.104:9999/book/list',
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
    }
})