Page({
    data: {
        userInfo: null,
    },
    onLoad() {
        var self = this
        wx.setNavigationBarTitle({
            title: "个人信息"
        }) 
        wx.getUserInfo({
            success(res) {
                var userInfo = res.userInfo
                console.log(userInfo)
                if(userInfo.gender === 0) {
                    userInfo.gender = '保密'
                } else if(userInfo.gender === 1) {
                    userInfo.gender = '男'
                } else {
                    userInfo.gender = '女'
                }
                self.setData({
                    userInfo: userInfo
                })
            }
        }) 
        
        
    }
})