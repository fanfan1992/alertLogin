/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function alertLogin(nameUrl,passUrl,loginUrl) { 
    var nUrl = nameUrl;  //username的验证url;
    var pUrl = passUrl;  //usernmae的password的验证url; 
    var lUrl = loginUrl;
    var oBtn = document.getElementById('login');
    var name_ok = true;
    var pass_ok = true;
    oBtn.onclick = function () {
        var sHeight = document.documentElement.scrollHeight;
        var sWidth = document.documentElement.scrollWidth;
        var wWidth = document.documentElement.clientWidth;
        var mask = document.createElement("div");
        /* 生成遮罩层 */
        mask.id = "mask";
        mask.style.height = sHeight + 'px';
        document.body.appendChild(mask);
        /* 遮罩层生成结束 */
        
        /*生成登录框*/
        var login = document.createElement("div");
        login.id = "loginkuang";
        var html = "<a id='close' href='javascript:;' ></a>"
        html += "<div id='user_login'>";
        html += "<div class='user_text'><span>用户名:</span><input type='text'id='username' name='username' /><a class='right'></a><a class='error'></a></div>";
        html += "<div class='user_text'><span>密&nbsp;&nbsp;码:</span><input type='password' id='password' name='password' /><a class='right'></a><a class='error'></a></div>";
        html += "<input type='submit' id='submit' name='submit' value='登录' />";
        html += "<input type='reset' id='reset' name='reset' value='重置' /></div>";
        html += "<a id='zhucelink' href='__ROOT__/Home/User/zhuce/'>注册用户</a>";
        login.innerHTML = html;
        document.body.appendChild(login);
        /*登录框生成结束*/
        
        /*简单适应设备，调整登录框大小*/
        var wHeight = document.documentElement.clientHeight;
        if (wWidth < 400) {
            login.style.width = 200 + 'px';
            login.style.height = 200 + 'px';
            var user = document.getElementById('user_login');
            user.style.marginLeft = 20 + 'px';
        }
        var height = login.offsetHeight;
        var width = login.offsetWidth;
        login.style.top = (wHeight - height) / 2 + 'px';
        login.style.left = (wWidth - width) / 2 + 'px';
        /* 适应完毕*/
        
        /* 验证js 使用jQuery完成，ajax无刷新验证 */
        $("#username").focusin(function () {
            $(this).css('border', '1px red solid');
        });

        $("#username").focusout(function () {
            $(this).css('border', '1px #999999 solid');
            var username = $(this).val();
            $.ajax({
                url: nUrl,
                type: 'post',
                data: {
                    username: username
                },
                success: function (data) {
                    if (data != 0) {
                        $("#username").siblings().eq(1).css('display', 'inline-block');
                        $("#username").siblings().eq(2).css('display', 'none');
                        name_ok = true;
                    } else {
                        $("#username").siblings().eq(1).css('display', 'none');
                        $("#username").siblings().eq(2).css('display', 'inline-block');
                        name_ok = false;
                    }
                }
            });
        });
        $("#password").focusin(function () {
            $(this).css('border', '1px red solid');
        });
        $("#password").focusout(function () {
            $(this).css('border', '1px #999999 solid');
            var username = $('#username').val();
            var password = $(this).val();
            $.ajax({
                url: pUrl,
                type: 'post',
                data: {
                    username: username,
                    password: password
                },
                success: function (data) {
                    if (data != 0) {
                        $("#password").siblings().eq(1).css('display', 'inline-block');
                        $("#password").siblings().eq(2).css('display', 'none');
                        pass_ok = true;
                    } else {
                        $("#password").siblings().eq(1).css('display', 'none');
                        $("#password").siblings().eq(2).css('display', 'inline-block');
                        pass_ok = false;
                    }

                }
            });
        });
        $('#submit').click(function () {
            var username = $('#username').val();         
            if (pass_ok && name_ok){
                //点击submit后,验证成功则后台session生成
                $.ajax({
                    url:lUrl,  //生成登录用户名session的url
                    type: 'post',
                    data: {
                        username: username
                    },
                    success: function (data) {
                        if (data == '1') {
                            alert('登陆成功');
                            $('#login').html(username);
                            document.body.removeChild(mask);
                            document.body.removeChild(login);
                            location.href = '';
                        } else {
                            alert('登录出现问题！');
                        }
                    }
                });
            } else {
                if (!name_ok) {
                    alert('用户名不存在！')
                }
                if (!pass_ok & name_ok) {
                    alert('密码错误！');
                }
            }

        });
        $("#reset").click(function () {
            $("#username").val('');
            $("#password").val('');
        });
        var onClose = document.getElementById('close');
        onClose.onclick = mask.onclick = function () {
            document.body.removeChild(mask);
            document.body.removeChild(login);
        };

    };


}



