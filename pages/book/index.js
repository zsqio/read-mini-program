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
        ]
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
    }
})