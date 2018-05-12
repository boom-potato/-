function LoginModal(){
    this.createDom();
    this.loginEventListener();
}

LoginModal.template = `<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="loginModalLabel">登录用户</h4>
          </div>
          <div class="modal-body">
          <div class="alert alert-danger hide" role="alert" id="login_error">用户名或密码错误</div>
            <form id="login_form">
              <div class="form-group">
                <label for="login_username" class="control-label">用户名</label>
                <input type="text" class="form-control" id="login_username" name="username" placeholder="请输入用户名">
              </div>
              <div class="from-group">
                <label for="login_password" class="control-label">密码</label>
                <input type="password" class="form-control" id="login_password" name="password" placeholder="请输入密码" />            
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" id="btn_login">登录</button>
          </div>
        </div>
      </div>
    </div>`;

$.extend(LoginModal.prototype, {
    createDom : function(){
        this.element = $(LoginModal.template);
        $("body").append(this.element);
    },
    // 当点击"登录"按钮时的事件监听
    loginEventListener : function() {
        this.element.find("#btn_login").on("click", $.proxy(this.loginHandler,this));
    },
    // 当点击"登录"按钮时的处理程序
    loginHandler : function(){
        // 发送ajax请求是在控制器文件夹下的userController.js里的方法
        $.post("/api/users/login", this.element.find("#login_form").serialize(), (data)=>{
            if (data.res_code === 0) { // 用户名或密码错误
                this.element.find("#login_error").removeClass("hide");
                this.element.find("#login_form").trigger("reset"); 
                      
            } else { // 登录成功
                window.location.reload();       
            }
        }, "json");
    },
})
