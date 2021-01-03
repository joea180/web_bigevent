$(function(){
    // 调用getUserInfo 获取用户基本信息
    getUserInfo()

    $('#btnLogout').on('click',function() {
        // console.log('ok');
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // console.log('ok');
            // 1.清空本地储存的token
            localStorage.removeItem('token')
            // 2.重新跳转至登录页面
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
          });
    })
})
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers 就是请求头对象
        // headers:{
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            // console.log(res.data.username[0]);
            // 判断是否获取用户信息成功
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 获取用户信息成功后，开始渲染用户的头像
            renderAvatar(res.data)
        },
        // 不论成功与否，最终都会调用 complete 回调函数
        // complete: function(res) {
        //     // console.log('1');
        //     // 在 complete 回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res .responseJSON.message === '身份认证失败！') {
        //         // 1. 强制清空 token 
        //         localStorage.removeItem('token')
        //         // 2. 强制跳转至登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    // 展示用户的名称
    $('.welcome').html('欢迎&nbsp&nbsp' + name)
    // 展示用户的头像  经过判断后有头像的话渲染头像,没有的话渲染昵称的首字
    if(user.user_pic !== null) {
        // 渲染头像
        $('.layui-nav-img').attr('scr',user.user_pic).show()
        $('.text-avavtar').hide()
    }else {
        // 渲染文字
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avavtar').html(first)
    }
}