/**
 * 主页JavaScript
 * 实现主页的基本交互功能
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 显示当前日期
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        currentDateElement.textContent = now.toLocaleDateString('zh-CN', options);
    }
    
    // 侧边栏菜单项点击事件
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // 移除所有菜单项的active类
            sidebarItems.forEach(function(i) {
                i.classList.remove('active');
            });
            
            // 为当前点击的菜单项添加active类
            this.classList.add('active');
            
            // 根据菜单项内容处理页面跳转
            const menuText = this.textContent.trim();
            switch (menuText) {
                case '首页':
                    window.location.href = 'main.html';
                    break;
                case '个人中心':
                    window.location.href = 'personal.html';
                    break;
                case '用户管理':
                    window.location.href = 'user-manage.html';
                    break;
                case '系统管理':
                    window.location.href = 'system-manage.html';
                    break;
                // 其他菜单项可以根据需要添加
            }
        });
    });
    
    // 通知图标点击事件（这里只是一个示例，实际功能可以根据需求扩展）
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            alert('您有3条未读通知');
        });
    }
});