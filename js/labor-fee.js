// 劳务费列表页面脚本

document.addEventListener('DOMContentLoaded', function() {
    // 获取当前日期并格式化
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    
    // 新建劳务费按钮点击事件
    const createLaborFeeBtn = document.getElementById('createLaborFeeBtn');
    if (createLaborFeeBtn) {
        createLaborFeeBtn.addEventListener('click', function() {
            alert('新建劳务费功能正在开发中...');
        });
    }
    
    // 为表格中的操作按钮添加事件
    const viewButtons = document.querySelectorAll('.btn-primary.btn-sm');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.cells[0].textContent;
            alert(`查看劳务费单据: ${id}`);
        });
    });
    
    const editButtons = document.querySelectorAll('.btn-warning.btn-sm');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.cells[0].textContent;
            alert(`编辑劳务费单据: ${id}`);
        });
    });
});