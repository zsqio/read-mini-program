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
        hobbyList: [
            {
                image:'https://img1.doubanio.com/view/subject/l/public/s2659208.jpg',
                name:'月亮和六便士',
            },
            {
                image:'https://img1.doubanio.com/view/subject/l/public/s3984108.jpg',
                name:'目送',
            },
            {
                image:'https://img3.doubanio.com/view/ark_article_cover/retina/public/3052392.jpg?v=1395393449.0',
                name:'灿烂千阳',
            },
            {
                image: 'https://img3.doubanio.com/view/subject/l/public/s1015872.jpg',
                name: '我们仨'
            },
            {
                image: 'https://img1.doubanio.com/view/subject/l/public/s10339418.jpg',
                name: '偷影子的人'
            },
            {
                image: 'https://img1.doubanio.com/view/subject/l/public/s2380159.jpg',
                name: '麦田里的守望者'
            }
        ],
        bookList: [],
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
            url: API.BOOK_LIST,
            method:'get',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            success(res) {
                if(res.data.data.length) {
                    const data = res.data.data
                    self.setData({
                        bookList: data
                    })
                } else {

                }               
            },
            complete() {
                wx.hideLoading()
            }
        })
    },

    //当用户存在收藏的图书的时候，将我的收藏作为猜你喜欢的内容
    getCollectList(user) {

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
        console.log('换一批~')
    }
})