Page({
    data: {
        informImg: '../../images/happy.png',
    },
    onLoad() {
        
    },
    goNewWish() {
        wx.navigateTo({
            url: '../newWish/index'
        })
    }
})