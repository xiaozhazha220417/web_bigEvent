$(function () {
    // 点击切换效果
    $("#link_reg").click(() => {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    // 点击切换效果
    $("#link_login").click(() => {
        $(".login-box").show();
        $(".reg-box").hide();
    });

    // 获取form
    const form = layui.form;

    // 定义表单验证规则
    form.verify({
        // 定义校验密码
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 定义确认密码规则
        repwd: (val) => {
            // 获取注册 密码框的值
            const pwd = $(".reg-box [name=password]").val();
            // 校验 密码和确认密码是否一致
            if (val !== pwd) return "两次密码不一致！";
        },
    });

    // 定义请求 根路径
    // const baseUrl = "http://www.liulongbin.top:3007";

    // 定义 layui 的弹窗组件 layer
    const layer = layui.layer;

    // 监听注册表单提交，发送注册请求
    $("#form_reg").on("submit", (e) => {
        // 阻止 form 默认提交行为
        e.preventDefault();

        // 发起注册请求
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg("注册失败！");
                layer.msg("注册成功！");
                // 清空表单的内容
                $(this)[0].reset();
                // 跳转到登录界面
                $("#link_login").click();
            },
        });
    });

    // 监听登录表单提交，发送登录请求
    $("#form_login").on("submit", function (e) {
        // 阻止 form 默认提交行为
        e.preventDefault();
        // console.log($(this).serialize()); // username=xiaozhazha05&password=123123

        // 发起登录请求
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("登录失败！");
                layer.msg("登录成功！");
                // console.log(res);
                // 将用户唯一标识保存到本地
                localStorage.setItem("token", res.token);
                // 登录成功后跳转到 index.html
                location.href = "/index.html";
                // 清空表单的内容
                $(this)[0].reset();
            },
        });
    });
});
