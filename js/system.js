// 邮件模版相关功能
const emailTemplateModule = {
    // 系统预置变量
    systemVariables: [
        { name: '${user_name}', desc: '用户姓名' },
        { name: '${task_title}', desc: '任务标题' },
        { name: '${task_content}', desc: '任务内容' },
        { name: '${create_time}', desc: '创建时间' },
        { name: '${deadline}', desc: '截止时间' }
    ],

    // 模版类型
    templateTypes: [
        { id: 1, name: '任务通知' },
        { id: 2, name: '系统通知' },
        { id: 3, name: '审批通知' },
        { id: 4, name: '其他通知' }
    ],

    // 初始化
    init() {
        this.bindEvents();
    },

    // 绑定事件
    bindEvents() {
        // 添加模版按钮点击事件
        document.getElementById('addTemplateBtn').addEventListener('click', () => {
            this.showTemplateModal();
        });

        // 表格操作按钮事件委托
        document.querySelector('#module-tab .table').addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName === 'BUTTON') {
                const tr = target.closest('tr');
                const action = target.textContent;
                switch (action) {
                    case '查看':
                        this.viewTemplate(tr);
                        break;
                    case '编辑':
                        this.editTemplate(tr);
                        break;
                    case '删除':
                        this.deleteTemplate(tr);
                        break;
                    case '停用':
                    case '启用':
                        this.toggleTemplateStatus(tr);
                        break;
                }
            }
        });
    },

    // 显示模版编辑模态框
    showTemplateModal(data = null) {
        const modalHtml = `
            <div class="modal" id="templateModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${data ? '编辑' : '添加'}邮件模版</h5>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <form id="templateForm">
                                <div class="form-group">
                                    <label>业务类型</label>
                                    <select class="form-control" name="type" required>
                                        ${this.templateTypes.map(type => 
                                            `<option value="${type.id}" ${data && data.type === type.id ? 'selected' : ''}>
                                                ${type.name}
                                            </option>`
                                        ).join('')}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>模版名称</label>
                                    <input type="text" class="form-control" name="name" required 
                                           value="${data ? data.name : ''}">
                                </div>
                                <div class="form-group">
                                    <label>邮件内容</label>
                                    <div class="template-variables">
                                        可用变量：
                                        ${this.systemVariables.map(v => 
                                            `<span class="badge badge-info" title="${v.desc}" 
                                                   onclick="emailTemplateModule.insertVariable('${v.name}')">
                                                ${v.name}
                                            </span>`
                                        ).join('')}
                                    </div>
                                    <textarea class="form-control" name="content" rows="6" required>
                                        ${data ? data.content : ''}
                                    </textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" onclick="emailTemplateModule.saveTemplate()">
                                保存
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 添加模态框到页面
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHtml;
        document.body.appendChild(modalContainer.firstElementChild);

        // 显示模态框
        $('#templateModal').modal('show');

        // 模态框关闭时移除DOM
        $('#templateModal').on('hidden.bs.modal', function () {
            this.remove();
        });
    },

    // 插入变量到内容编辑器
    insertVariable(variable) {
        const textarea = document.querySelector('#templateForm textarea[name="content"]');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        textarea.value = text.substring(0, start) + variable + text.substring(end);
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + variable.length;
    },

    // 保存模版
    saveTemplate() {
        const form = document.getElementById('templateForm');
        if (form.checkValidity()) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // TODO: 调用API保存数据
            console.log('保存模版数据:', data);
            
            // 关闭模态框
            $('#templateModal').modal('hide');
            
            // 刷新列表
            this.refreshTemplateList();
        } else {
            form.reportValidity();
        }
    },

    // 查看模版
    viewTemplate(tr) {
        const data = this.getTemplateData(tr);
        this.showTemplateModal(data);
        // 设置表单只读
        const form = document.getElementById('templateForm');
        form.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
        document.querySelector('#templateModal .btn-primary').style.display = 'none';
    },

    // 编辑模版
    editTemplate(tr) {
        const data = this.getTemplateData(tr);
        this.showTemplateModal(data);
    },

    // 删除模版
    deleteTemplate(tr) {
        if (confirm('确定要删除该模版吗？')) {
            // TODO: 调用API删除数据
            tr.remove();
        }
    },

    // 切换模版状态
    toggleTemplateStatus(tr) {
        const button = tr.querySelector('.btn-warning, .btn-success');
        const isEnabled = button.textContent === '启用';
        
        // TODO: 调用API更新状态
        
        if (isEnabled) {
            button.textContent = '停用';
            button.classList.replace('btn-success', 'btn-warning');
        } else {
            button.textContent = '启用';
            button.classList.replace('btn-warning', 'btn-success');
        }
    },

    // 获取模版数据
    getTemplateData(tr) {
        return {
            type: 1, // 示例数据
            name: tr.cells[1].textContent,
            content: '示例模版内容'
        };
    },

    // 刷新模版列表
    refreshTemplateList() {
        // TODO: 调用API获取最新列表数据
        console.log('刷新模版列表');
    }
};

// 邮箱设置相关功能
const emailConfigModule = {
    init() {
        this.bindEvents();
    },

    bindEvents() {
        // 添加配置按钮点击事件
        document.getElementById('addEmailConfigBtn').addEventListener('click', () => {
            this.showConfigModal();
        });

        // 表格操作按钮事件委托
        document.querySelector('#email-tab .table').addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName === 'BUTTON') {
                const tr = target.closest('tr');
                const action = target.textContent;
                switch (action) {
                    case '编辑':
                        this.editConfig(tr);
                        break;
                    case '删除':
                        this.deleteConfig(tr);
                        break;
                    case '停用':
                    case '启用':
                        this.toggleConfigStatus(tr);
                        break;
                }
            }
        });
    }
};

// 初始化模块
document.addEventListener('DOMContentLoaded', () => {
    emailTemplateModule.init();
    emailConfigModule.init();
});