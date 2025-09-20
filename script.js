// Cyberpunk Agent Repository JavaScript

class AgentRepository {
    constructor() {
        this.agents = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.init();
    }

    async init() {
        await this.loadAgents();
        this.setupEventListeners();
        this.updateStatusBar();
        this.hideLoading();
    }

    async loadAgents() {
        try {
            const response = await fetch('agents-data.json');
            const data = await response.json();
            this.agents = data.agents;
            this.renderAgents();
        } catch (error) {
            console.error('Failed to load agents:', error);
            this.showError('Failed to load agent data');
        }
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
                this.updateFilterButtons(e.target);
            });
        });

        // Search input
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.renderAgents();
        });

        // Add cyberpunk typing effect to search
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.4)';
        });

        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.style.boxShadow = 'none';
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.renderAgents();
    }

    updateFilterButtons(activeButton) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    filterAgents() {
        return this.agents.filter(agent => {
            const matchesFilter = this.currentFilter === 'all' || agent.status === this.currentFilter;
            const matchesSearch = this.searchTerm === '' || 
                agent.name.toLowerCase().includes(this.searchTerm) ||
                agent.type.toLowerCase().includes(this.searchTerm) ||
                agent.description.toLowerCase().includes(this.searchTerm) ||
                agent.capabilities.some(cap => cap.toLowerCase().includes(this.searchTerm));
            
            return matchesFilter && matchesSearch;
        });
    }

    renderAgents() {
        const container = document.getElementById('agents-container');
        const filteredAgents = this.filterAgents();

        if (filteredAgents.length === 0) {
            container.innerHTML = this.getNoResultsHtml();
            return;
        }

        container.innerHTML = '';
        filteredAgents.forEach((agent, index) => {
            const agentCard = this.createAgentCard(agent);
            container.appendChild(agentCard);
            
            // Add staggered animation
            setTimeout(() => {
                agentCard.style.opacity = '1';
                agentCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    createAgentCard(agent) {
        const card = document.createElement('div');
        card.className = 'agent-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';

        const statusClass = `status-${agent.status}`;
        const powerPercentage = agent.powerLevel;
        const lastActiveDate = new Date(agent.lastActive).toLocaleString('zh-CN');

        card.innerHTML = `
            <div class="agent-header">
                <div>
                    <h3 class="agent-name">${agent.name}</h3>
                    <p class="agent-type">${agent.type}</p>
                </div>
                <div class="agent-status ${statusClass}">
                    <div class="indicator ${agent.status === 'active' ? 'active' : agent.status === 'maintenance' ? '' : 'warning'}"></div>
                    ${this.getStatusText(agent.status)}
                </div>
            </div>
            
            <p class="agent-description">${agent.description}</p>
            
            <div class="agent-capabilities">
                <div class="capabilities-title">能力模块</div>
                <div class="capabilities-list">
                    ${agent.capabilities.map(cap => 
                        `<span class="capability-tag">${cap}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="agent-stats">
                <div class="power-level">
                    <span style="font-size: 0.8rem; color: var(--text-muted);">能力等级:</span>
                    <div class="power-bar">
                        <div class="power-fill" style="width: ${powerPercentage}%"></div>
                    </div>
                    <span style="font-size: 0.8rem; color: var(--accent-cyan);">${powerPercentage}%</span>
                </div>
                <div class="agent-location">${agent.location}</div>
            </div>
            
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); font-size: 0.8rem; color: var(--text-muted);">
                <div>ID: ${agent.id}</div>
                <div>最后活跃: ${lastActiveDate}</div>
            </div>
        `;

        // Add click event for card interaction
        card.addEventListener('click', () => {
            this.showAgentDetails(agent);
        });

        return card;
    }

    getStatusText(status) {
        const statusMap = {
            'active': '活跃',
            'standby': '待机',
            'maintenance': '维护'
        };
        return statusMap[status] || status;
    }

    getNoResultsHtml() {
        return `
            <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🤖</div>
                <h3 style="color: var(--accent-cyan); margin-bottom: 1rem;">未找到匹配的智能体</h3>
                <p>请尝试调整搜索条件或筛选器</p>
            </div>
        `;
    }

    showAgentDetails(agent) {
        // Create a modal or detailed view - for now, just show an alert with details
        const details = `
智能体详情:
名称: ${agent.name}
类型: ${agent.type}
状态: ${this.getStatusText(agent.status)}
描述: ${agent.description}
位置: ${agent.location}
能力等级: ${agent.powerLevel}%
能力模块: ${agent.capabilities.join(', ')}
最后活跃: ${new Date(agent.lastActive).toLocaleString('zh-CN')}
        `;
        
        // Create cyberpunk-style notification
        this.showNotification(`智能体 ${agent.name} 已连接`, 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--secondary-bg);
            border: 1px solid var(--accent-cyan);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 4px;
            font-family: 'Orbitron', monospace;
            font-size: 0.9rem;
            z-index: 1000;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
            animation: slideIn 0.3s ease-out;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    updateStatusBar() {
        const agentCount = document.getElementById('agent-count');
        const lastUpdate = document.getElementById('last-update');
        
        agentCount.textContent = this.agents.length;
        lastUpdate.textContent = new Date().toLocaleTimeString('zh-CN');
        
        // Add glitch effect to the count
        this.addGlitchEffect(agentCount);
    }

    addGlitchEffect(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        let glitchInterval = setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance to glitch
                const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                element.textContent = glitchChar;
                element.style.color = 'var(--accent-pink)';
                
                setTimeout(() => {
                    element.textContent = originalText;
                    element.style.color = 'var(--accent-cyan)';
                }, 100);
            }
        }, 2000);
        
        // Stop glitch effect after 10 seconds
        setTimeout(() => {
            clearInterval(glitchInterval);
        }, 10000);
    }

    hideLoading() {
        const loadingSpinner = document.getElementById('loading-spinner');
        loadingSpinner.style.display = 'none';
    }

    showError(message) {
        const container = document.getElementById('agents-container');
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--danger-color);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                <h3 style="margin-bottom: 1rem;">系统错误</h3>
                <p>${message}</p>
                <button onclick="location.reload()" style="
                    background: transparent;
                    border: 1px solid var(--danger-color);
                    color: var(--danger-color);
                    padding: 0.7rem 1.5rem;
                    margin-top: 1rem;
                    cursor: pointer;
                    font-family: 'Orbitron', monospace;
                ">重新加载</button>
            </div>
        `;
        this.hideLoading();
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AgentRepository();
});

// Add some cyberpunk ambiance effects
document.addEventListener('DOMContentLoaded', () => {
    // Add random flicker effect to glitch text
    setInterval(() => {
        const glitchElements = document.querySelectorAll('.glitch');
        glitchElements.forEach(el => {
            if (Math.random() < 0.05) { // 5% chance
                el.style.animation = 'none';
                setTimeout(() => {
                    el.style.animation = '';
                }, 200);
            }
        });
    }, 3000);
    
    // Add typing sound effect simulation (visual only)
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let typingTimer;
        searchInput.addEventListener('input', () => {
            clearTimeout(typingTimer);
            searchInput.style.borderColor = 'var(--accent-green)';
            searchInput.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.3)';
            
            typingTimer = setTimeout(() => {
                searchInput.style.borderColor = 'var(--border-color)';
                searchInput.style.boxShadow = 'none';
            }, 500);
        });
    }
});