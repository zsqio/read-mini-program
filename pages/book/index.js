var app = getApp()
var API = require('../../utils/api.js');
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
        hobbyList: [],
        bookList: [],
        activeIndex: 1,
        pageIndex: 1,
        totalPage: 0,
        totalCount: 0,
        loaded: false,
    },
    onLoad() {
        const self = this
        self.getBookCount()
        self.getBookList() 
        self.getRandomList()
    },
    getBookList() {
        const self = this
        wx.showLoading({
            title: 'loading',
            duration: 1000
        })
        wx.request({
            url: API.BOOK_LIST,
            method:'get',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            data: {
                pageIndex: self.data.pageIndex
            },
            success(res) {
                if(res.data.data.length) {
                    const data = [...self.data.bookList, ...res.data.data]
                    self.setData({
                        bookList: data,
                        pageIndex: self.data.pageIndex + 1,
                    })
                }        
            }
        })
    },
    //随机拉取六条数据记录
    getRandomList() {
        const self = this
        let random = Math.round(parseInt(Math.random()*self.data.totalCount))
        if(self.data.totalCount - random < 6) {
            random = Math.abs(random - 6)
        }
        wx.request({
            url: API.BOOK_LIST,
            method:'get',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            data: {
                startIndex: random
            },
            success(res) {
                const data = res.data.data
                self.setData({
                    hobbyList: data
                })
            },

        })
    },
    switchTab(event) {
        this.setData({ activeIndex: +event.target.dataset.index })
    },
    goDetail(event) {
        let name = event.currentTarget.dataset.name
        wx.navigateTo({
            url:'../bookDetail/index?name='+name
        })
    },
    goSearch() {
        wx.navigateTo({
            url: '../search/index'
        })
    },
    changeBatch() {
        wx.showLoading({
            title: 'loading',
            duration: 500
        })
        this.getRandomList()
    },
    getBookCount() {
        let self = this
        wx.request({
            url: API.BOOK_COUNT,

            success(res) {
                const totalCount = res.data.data
                const totalPage = Math.ceil((totalCount/6))
                self.setData({
                    totalPage: totalPage,
                    totalCount: totalCount
                }) 
            } 
        })
    },
    onReachBottom() {
        let self = this
        //猜你喜欢不做分页加载
        if(self.data.activeIndex === 1) {
            if(self.data.pageIndex > self.data.totalPage ) {
                self.setData({
                    loaded: true
                })
            } else {
                self.getBookList()
            }
        }else {
            return
        }
        
        
    }
})