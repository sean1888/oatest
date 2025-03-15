/**
 * 登录页面JavaScript
 * 实现登录表单验证和提交功能
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取登录表单元素
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('loginError');
    
    // 添加表单提交事件监听
    loginForm.addEventListener('submit', function(event) {
        // 阻止表单默认提交行为
        event.preventDefault();
        
        // 获取用户名和密码
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // 表单验证
        if (!username) {
            showError('请输入用户名');
            usernameInput.focus();
            return;
        }
        
        if (!password) {
            showError('请输入密码');
            passwordInput.focus();
            return;
        }
        
        // 显示加载状态
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading"></span> 登录中...';
        submitBtn.disabled = true;
        
        // 模拟登录请求
        setTimeout(function() {
            // 这里是模拟登录，实际项目中应该发送AJAX请求到服务器验证
            if (username === 'admin' && password === 'admin123') {
                // 登录成功，跳转到主页
                window.location.href = 'main.html';
            } else {
                // 登录失败，显示错误信息
                showError('用户名或密码错误，请重试');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        }, 1500); // 延迟1.5秒模拟网络请求
    });
    
    // 显示错误信息的函数
    function showError(message) {
        loginError.textContent = message;
        loginError.style.display = 'block';
        
        // 3秒后自动隐藏错误信息
        setTimeout(function() {
            loginError.style.display = 'none';
        }, 3000);
    }
    
    // 输入框获得焦点时隐藏错误信息
    usernameInput.addEventListener('focus', function() {
        loginError.style.display = 'none';
    });
    
    passwordInput.addEventListener('focus', function() {
        loginError.style.display = 'none';
    });
});