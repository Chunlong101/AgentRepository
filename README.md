# Agent Repository - 赛博朋克智能体展示

一个基于赛博朋克风格的智能体信息展示网页，使用 HTML + CSS + JavaScript 构建。

## 🚀 功能特性

- **赛博朋克风格设计** - 深色主题配合霓虹色彩，营造未来科技感
- **智能体信息展示** - 展示智能体的详细信息，包括名称、类型、状态、能力等
- **实时筛选功能** - 根据状态（活跃/待机/维护）筛选智能体
- **智能搜索** - 支持按名称、类型、描述和能力搜索智能体
- **响应式设计** - 完美适配桌面和移动设备
- **交互特效** - 包含动画、光效、扫描线等赛博朋克视觉效果

## 🎮 技术特色

### 视觉设计
- 使用 `Orbitron` 和 `Rajdhani` 字体营造科技感
- 动态网格背景和扫描线效果
- 霓虹色彩主题（青色、粉色、绿色、黄色）
- 悬停时的发光效果和动画
- 故障风格（Glitch）标题效果

### 交互功能
- 实时数据筛选和搜索
- 智能体卡片点击交互
- 状态指示器动画
- 加载动画和过渡效果
- 响应式布局

## 📁 文件结构

```
AgentRepository/
├── index.html          # 主页面文件
├── styles.css          # 赛博朋克样式表
├── script.js           # 交互逻辑脚本
├── agents-data.json    # 智能体数据文件
└── README.md           # 项目说明文档
```

## 🛠 使用方法

1. **克隆仓库**
   ```bash
   git clone https://github.com/Chunlong101/AgentRepository.git
   cd AgentRepository
   ```

2. **启动本地服务器**
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 或使用 Node.js
   npx http-server
   ```

3. **访问网页**
   打开浏览器访问 `http://localhost:8000`

## 📊 智能体数据格式

智能体数据存储在 `agents-data.json` 文件中，格式如下：

```json
{
  "agents": [
    {
      "id": "001",
      "name": "智能体名称",
      "type": "智能体类型",
      "status": "active|standby|maintenance",
      "description": "详细描述",
      "capabilities": ["能力1", "能力2"],
      "powerLevel": 95,
      "location": "部署位置",
      "lastActive": "2025-01-20T10:30:00Z"
    }
  ]
}
```

## 🎨 自定义配置

### 修改主题色彩
在 `styles.css` 中的 `:root` 选择器内修改 CSS 变量：

```css
:root {
    --primary-bg: #0a0a0a;        /* 主背景色 */
    --accent-cyan: #00ffff;       /* 青色强调色 */
    --accent-pink: #ff0080;       /* 粉色强调色 */
    --accent-green: #00ff41;      /* 绿色强调色 */
    /* ... 更多颜色变量 */
}
```

### 添加新智能体
在 `agents-data.json` 的 `agents` 数组中添加新的智能体对象即可。

## 🌟 演示截图

![Cyberpunk Agent Repository](https://github.com/user-attachments/assets/0dfc601e-c0f7-46b8-bebb-49a59003530e)

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

---

**Powered by Cyberpunk Tech Stack** 🤖⚡