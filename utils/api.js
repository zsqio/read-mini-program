//api of request
var API = {    
    BOOK_LIST: 'http://192.168.1.104:9999/book/list',
    COLLECT_LIST: 'http://192.168.1.104:9999/collect/list',
    COLLECT_STATUS: 'http://192.168.1.104:9999/collect/status',
    BOOK_Of_TAG: 'http://192.168.1.104:9999/book/tag',
    BOOK_COLLECT: 'http://192.168.1.104:9999/collect/',
    BOOK_COUNT: 'http://192.168.1.104:9999/book/count',
    BOOK_SEARCH: 'http://192.168.1.104:9999/book/search',
    BOOK_COMMENT: 'http://192.168.1.104:9999/comment/add',
    COMMENT_LIST: 'http://192.168.1.104:9999/comment/list',
    NEW_WISHES: 'http://192.168.1.104:9999/wish/add',
    WISH_LIST: 'http://192.168.1.104:9999/wish/mine',
    WISH_DELETE: 'http://192.168.1.104:9999/wish/delete'
}

module.exports = API