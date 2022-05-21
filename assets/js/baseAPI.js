// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
// 请求拦截器
$.ajaxPrefilter((options) => {
    options.url = "http://www.liulongbin.top:3007" + options.url;

    // 在请求之前给有权限的接口注入 token
    // 统一为有权限的接口，设置 headers 请求头
    // console.log(options.url.includes("/my/")); // false 和 true
    // console.log(options.url.indexOf("/my/")); // -1 和 30
    // 注意这里不能使用indexOf()
    if (options.url.includes("/my/")) {
        options.headers = {
            Authorization: localStorage.getItem("token"),
        };
    }
});
