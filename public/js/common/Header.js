function Header(container){
    // 头部需要加入的容器
    this.container = $(container);
    this.createDom();
    this.createRegisterModal();
    this.createLoginModal();
    this.loginEventListener();
    this.getLoginStatus();
}

// 头部模板
Header.template = `<nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="">库存管理系统</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="active index"><a href="/">首页</a></li>
            <li class="list"><a href="/html/list.html">列表</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right" id="login_reg_link">
            <li data-toggle="modal" data-target="#loginModal"><a href="javascript:void(0);">登录</a></li>
            <li data-toggle="modal" data-target="#regModal"><a href="javascript:void(0);">注册</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right hide" id="login_success_link">
            <li><a href="javascript:void(0);">欢迎您：</a></li>
            <li><a href="javascript:void(0);" id="logout_link">退出</a></li>
          </ul>
        </div>
      </div>
    </nav>`;

$.extend(Header.prototype, {
    createDom : function(){
        this.element = $(Header.template);
        this.container.html(this.element);
    },

    // 创建登录模态框
    createLoginModal : function(){
        new LoginModal();
    },

    // 创建注册模态框
    createRegisterModal : function(){
        new RegisterModal();
    },

    // 用户退出账户的事件监听
    loginEventListener : function(){
      this.element.find("#logout_link").on("click", $.proxy(this.logoutHandler, this));
    },
    // 退出账户事件处理程序
    logoutHandler : function(){
      //ajax请求控制器文件夹中的userController.js中的logout方法
      $.get("/api/users/logout", ()=>{
        window.location.reload();
      })
    },

    //获取用户登录状态
    getLoginStatus : function(){
        //ajax请求控制器文件夹中的userController.js中的isLogin方法
        $.getJSON("/api/users/isLogin", (data)=>{
            if (data.res_code === 1) { // 已登录
                this.element.find("#login_reg_link").addClass("hide");
                this.element.find("#login_success_link").removeClass("hide").find("a:first").text("欢迎您：" + data.res_body.username);
            } else { // 未登录       
                this.element.find("#login_reg_link").removeClass("hide");
                this.element.find("#login_success_link").addClass("hide");
            }
        })
    } 
});


