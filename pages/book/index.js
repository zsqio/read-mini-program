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
        rankList: [
            {
                coverUrl: '../../images/cover/1.jpg',
                title:'追风筝的人',
                engTitle:'The Kite Runner',
                author: '[美] 卡勒德·胡赛尼 / 李继宏 / 上海人民出版社 / 2006-5 / 29.00元',
                desc: '“为你，千千万万遍”',
                score: 8.9,
            },
            {
                coverUrl: '../../images/cover/2.jpg',
                title:'小王子',
                engTitle:'The Kite Runner',
                author: '[法] 圣埃克苏佩里 / 马振聘 / 人民文学出版社 / 2003-8 / 22.00元',
                desc: '“送给小朋友”',
                score: 9.0,
            },
            {
                coverUrl: '../../images/cover/3.jpg',
                title:'围城',
                author: '钱锺书 / 人民文学出版社 / 1991-2 / 19.00',
                desc: '“对于“人艰不拆”四个字最彻底的违抗”',
                score: 8.9,
            },
        ],
        activeIndex: 1,
    },
    onLoad() {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
            //更新数据
            that.setData({
                userInfo:userInfo
            })
        })
    },
    switchTab(event) {
        this.setData({ activeIndex: +event.target.dataset.index })
    },
    goDetail() {
        wx.navigateTo({
            url:'../bookDetail/index?id=1'
        })
    }
})