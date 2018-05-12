function RegisterModal(){
    this.usernameExist = true;  //标记注册的用户名是否已存在，默认存在
    this.createDom();
    this.registerEventListener();
};

RegisterModal.template = `<div class="modal fade" id="regModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="regModalLabel">注册用户信息</h4>
          </div>
          <div class="modal-body">
            <div class="alert alert-success hide" id="reg_success" role="alert">用户注册成功</div>
            <div class="alert alert-danger hide" id="reg_failed" role="alert">用户注册失败</div>
            <form id="reg_form">
              <div class="form-group">
                <label for="reg_username" class="control-label">用户名</label>
                <input type="text" class="form-control" id="reg_username" name="username" placeholder="请输入用户名">
              </div>
               <div class="alert alert-success hide" id="reg_user_not_exist" role="alert">用户名可用</div>
               <div class="alert alert-danger hide" id="reg_user_exist" role="alert">用户名已被占用，请重新输入</div>
              <div class="form-group">
                <label for="reg_password" class="control-label">密码</label>
                <input type="password" class="form-control" id="reg_password" name="password" placeholder="请输入密码" />              
              </div>
              <div class="form-group">
                <label for="reg_email" class="control-label">邮箱</label>
                <input type="email" class="form-control" id="reg_email" name="email" placeholder="请输入邮箱" />           
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" id="btn_register">注册</button>
          </div>
        </div>
      </div>
    </div>`;

$.extend(RegisterModal.prototype, {
    createDom : function(){
        this.element = $(RegisterModal.template);
        $("body").append(this.element);
    },
    // 注册模态框事件监听
    registerEventListener : function(){
        this.element.on("shown.bs.modal", ()=>{     //shown.bs.modal是bs的事件类型(详情看文档)
            this.element.find("#reg_username").focus();
        });
        // 绑定"用户名"文本框失焦事件
        this.element.find("#reg_username").blur($.proxy(this.checkHandler,this));
        // 绑定点击"注册"按钮点击事件
        this.element.find("#btn_register").click($.proxy(this.registerHandler,this));
    },
    // "用户名"失焦事件处理程序
    checkHandler : function(){
        // 当用户名文本失焦时去后台检查用户是否注册过(ajax),请求的是控制器文件夹中userController.js里的check方法
        $.getJSON("/api/users/check", {username:this.element.find("#reg_username").val()}, (data)=>{
            if(data.res_code === 0) {  //用户名可用
                this.element.find("#reg_user_not_exist").removeClass("hide");
                this.element.find("#reg_user_exist").addClass("hide");
                this.usernameExist = false;
            } else {    //用户名不可用
                this.element.find("#reg_user_not_exist").addClass("hide");
                this.element.find("#reg_user_exist").removeClass("hide");
                this.usernameExist = true;
            }
        })
    },
    // 点击"注册"事件处理程序
    registerHandler : function(){   //请求的是控制器文件夹中userController.js里的register方法
        if (!this.usernameExist) {
            $.post("/api/users/register", this.element.find("#reg_form").serialize(), (data)=>{
                if (data.res_code === 1) { //注册成功
                    this.element.find("#reg_success").removeClass("hide");
                    this.element.find("#reg_failed").addClass("hide");
                    this.element.find("#reg_user_not_exist").addClass("hide");
                    setTimeout(()=>{
                        this.element.modal("hide"); //model是bs里的一个方法，指整个模态框
                        this.element.find("#reg_success").addClass("hide");
                        this.element.find("#reg_failed").addClass("hide");
                        this.element.find("#reg_form").trigger("reset");
                        
                    }, 2000);
                } else {    //注册失败
                    this.element.find("#reg_success").addClass("hide");
                    this.element.find("#reg_failed").removeClass("hide");
                }
            },"json");
        }
    }
})
