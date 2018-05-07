Page({
    data: {
        name: '',
        author: '',
        user: '',
        informStatus: false
    },
    onLoad() {

    },
    handleChange(event) {
        const value = event.detail.value
        console.log(value)
        this.setData({
            informStatus: value
        })
    },
    nameInput(event) {
        this.setData({
            name: event.detail.value
        })
    },
    authorInput(event) {
        this.setData({
            name: event.detail.value
        })
    },

    //保存心愿单
    saveWish() {

    }

})