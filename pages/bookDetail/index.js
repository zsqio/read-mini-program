var app = getApp()
var API = require('../../utils/api.js');
var Util = require('../../utils/util.js');
Page({
    data: {
        name:'',
        user: '',
        avatar:'',
        detailInfo: {},
        commentList: [],
        activeIndex: 1,
        likeStatus: 0,
        likeImg: '../../images/tobeliked.png',
        isShow: false,
        isLoad: true,
        emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
        emoji: [
        "60a", "60b", "60c", "60d", "60f",
        "61b", "61d", "61e", "61f",
        "62a", "62c", "62e",
        "602", "603", "605", "606", "608",
        "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
        "63a", "63b", "63c", "63d", "63e", "63f",
        "64a", "64b", "64f", "681",
        "68a", "68b", "68c",
        "344", "345", "346", "347", "348", "349", "351", "352", "353",
        "414", "415", "416",
        "466", "467", "468", "469", "470", "471", "472", "473",
        "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
        ],
        emojis: [],
        content: ''    
    },
    onLoad(options) {
        let self = this
        let name = options.name
        self.setData ({
            name: name
        })
        //获取图书基本信息
        self.getBookInfo(name) 
        self.getCommentList(name)
        wx.getUserInfo({
            success: function(res) {
                let userInfo = res.userInfo
                let nickName = userInfo.nickName
                let avatarUrl = userInfo.avatarUrl
                console.log(name, nickName)
                self.getCollectStaus(name,nickName)
                self.setData({
                    user: nickName,
                    avatar:avatarUrl
                })
            }
        }) 
        var em = {}, that = this, emChar = that.data.emojiChar.split("-");
        var emojis = []
        self.data.emoji.forEach(function (v, i) {
        em = {
            char: emChar[i],
            emoji: "0x1f" + v
        };
        emojis.push(em)
        });
        self.setData({
            emojis: emojis
        })                      
    },
    //切换tab
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
                icon: 'none',
                duration: 2000
            })
        } else {  
            url = 'insert'  
            wx.showToast({
                title: '已收藏',
                icon: 'none',
                duration: 2000
            })
        } 
        self.collect(url,self.data.name, self.data.user, self.data.detailInfo.cover) 
    },

    //收藏或者取消收藏图书
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
    //获取图书基本信息
    getBookInfo(name) {
        let self = this
        wx.showLoading(
            {
                title: 'loading'
            }
        )
        wx.request({
            url: API.BOOK_SEARCH,
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
            },
            complete() {
                wx.hideLoading()
            }
        })
    },
    //获取图书收藏状态
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
    },
    getCommentList(name) {
        const self = this
        wx.request({
            url: API.COMMENT_LIST,
            method:'get',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            data: {
                name: name
            },
            success(res) {
                const data = res.data.data
                data.forEach((item, index) => {
                    let time = new Date(parseInt(item.commentDate))
                    item.commentDate = Util.formatTime(time)
                })
                self.setData({
                    commentList: data
                })
            }
        })
    },
    commentInput(event) {
        this.setData({
            content:event.detail.value
        })
    },
    emojiShowHide() {
        const self = this
        self.setData({
            isShow: !self.data.isShow,
            isLoad: false,
        })
    },
    emojiChoose(event) {
        const self = this
        const emoji = event.currentTarget.dataset.emoji
        self.setData({
            content: self.data.content + emoji 
        })
    },
    submitComment() {
        const self = this
        if(!self.data.content.trim()) {
            wx.showToast({
                title: '还未输入任何内容',
                icon: 'none',
                duration: 1000
            })
            return 
        }
        var commentData = {
            name: self.data.name,
            user: self.data.user,
            userAvatar: self.data.avatar,
            comment: self.data.content
        }
        wx.request({
            url: API.BOOK_COMMENT,
            method:'post',
            header: {
                'content-type':'application/x-www-form-urlencoded'
            },
            data: commentData,
            success(res) {
                if(res.data.result) {
                    wx.showToast({
                        title: '评论成功',
                        icon: 'none',
                        duration: 1000
                    })
                    self.getCommentList(self.data.name)
                } else {
                    wx.showToast({
                        title: '评论失败, 请稍后再试',
                        icon: 'none',
                        duration: 1000
                    })
                }
                self.setData({
                    content: '',
                    isShow: false,
                    isLoad: true
                })
            }
        })
    },

    //单击标签跳转到指定的标签列表页
    goTagList(event) {
        const tag = event.currentTarget.dataset.tag
        wx.navigateTo({
          url:'../list/index?tag='+tag
        })
    }
})