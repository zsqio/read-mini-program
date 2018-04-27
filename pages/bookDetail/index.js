var app = getApp()
Page({
    data: {
        detailList: [
            {
                title:'每个人心里都有一个丁丁',
                intro:'生活在二十世纪五六十年代的中国孩子，应该都读过这样一种书，它有成年人的巴掌大小，不太厚，里面用黑白线条图画讲述各种各样的故事，像《西游记》《三国演义》《水浒传》等等，用1分钱就可以从路边的小摊上租到，能够美美地看上半天。',
                illustration: 'https://img3.doubanio.com/view/freyr_page_photo/raw/public/2465.jpg'
            },
            {
                title:'每个人心里都有一个丁丁',
                intro:'生活在二十世纪五六十年代的中国孩子，应该都读过这样一种书，它有成年人的巴掌大小，不太厚，里面用黑白线条图画讲述各种各样的故事，像《西游记》《三国演义》《水浒传》等等，用1分钱就可以从路边的小摊上租到，能够美美地看上半天。',
                illustration: 'https://img3.doubanio.com/view/freyr_page_photo/raw/public/2464.jpg'
            },
            {
                title:'每个人心里都有一个丁丁',
                intro:'生活在二十世纪五六十年代的中国孩子，应该都读过这样一种书，它有成年人的巴掌大小，不太厚，里面用黑白线条图画讲述各种各样的故事，像《西游记》《三国演义》《水浒传》等等，用1分钱就可以从路边的小摊上租到，能够美美地看上半天。',
                illustration: 'https://img3.doubanio.com/view/freyr_page_photo/raw/public/2440.jpg'
            }
        ],
        infoList: [
            {
                label: '书名:',
                value: '《丁丁历险记》'
            },
            {
                label: '作者:',
                value: '[比利时]埃尔热'
            },
            {
                label: '出版社:',
                value: '中国少年儿童出版社'
            },
            {
                label: '出版时间:',
                value: '2009年01月'
            },
            {
                label: '定价:',
                value: 440
            },
            {
                label: '装帧:',
                value: '平装'
            }
        ],
        catalogList: [
            '《丁丁在刚果》',
            '《丁丁在美洲》',
            '《法老的雪茄》',
            '《蓝莲花》',
            '《破损的耳朵》',
            '《奥托卡王的权杖》',
            '《金钳螃蟹贩毒集团》'
        ],
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