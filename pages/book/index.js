var app = getApp()
Page({
    data: {
        bannerList: [
            '../../images/banner/banner1.jpg',
            '../../images/banner/banner2.jpg',
            '../../images/banner/banner3.jpg',
            '../../images/banner/banner4.jpg',
            '../../images/banner/banner5.jpg',
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        bookList: [
            {
                imgUrl:'../../images/banner/banner3.jpg',
                iconUrl:'../../images/bookIcon/ding.jpg',
                title:'丁丁历险记',
                subTitle: '跟着丁丁去历险',
                price: 89,
            },
            {
                imgUrl:'../../images/banner/banner4.jpg',
                iconUrl:'../../images/bookIcon/pig.jpg',
                title:'小猪佩奇故事书系列',
                subTitle: '二十册佩奇故事书画册',
                price: 126,
            },
            {
                imgUrl:'../../images/banner/banner2.jpg',
                iconUrl:'../../images/bookIcon/time.jpg',
                title:'诚品时光',
                subTitle: '首次了解诚品时光，绝不只是一家书店',
                price: 56,
            },
        ],
        rankList: [],
        activeIndex: 1,
    },
    onLoad() {
        this.getBookList();
    },
    getBookList() {
        const self = this
        wx.showLoading({
            title: 'loading',
        })
        wx.request({
            url: 'http://192.168.1.104:9999/book/list',
            method:'get',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            success(res) {
                if(res.data.data.length) {
                    const data = res.data.data
                    self.setData({
                        rankList: data
                    })
                } else {

                }               
            },
            complete() {
                wx.hideLoading()
            }
        })
    },
    switchTab(event) {
        this.setData({ activeIndex: +event.target.dataset.index })
    },
    goDetail() {
        wx.navigateTo({
            url:'../bookDetail/index?id=1'
        })
    },
    goSearch() {
        wx.navigateTo({
            url: '../search/index'
        })
    }
})