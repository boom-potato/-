// 头部布局DOM放置容器
function HeaderAndFooter(headerSelector){
    this.headerSelector = headerSelector || ".header";
    this.init();
}

$.extend(HeaderAndFooter.prototype, {
    init : function() {
        // 创建头部
        this.createHeader();
    },
    createHeader : function(){
        new Header(this.headerSelector);
    }
});
