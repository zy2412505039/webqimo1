<template>
  <div class="ai-chat glass-card">
    <div class="chat-header">
      <div class="ai-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      </div>
      <div class="header-info">
        <h3>合规智能助手</h3>
        <span class="status">基于 RAG 检索增强生成</span>
      </div>
    </div>

    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="['message', msg.role]"
      >
        <div class="avatar">
          <span v-if="msg.role === 'user'">我</span>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </div>
        <div class="content">
          <div class="text" v-html="formatMessage(msg.content)"></div>
          <div v-if="msg.sources && msg.sources.length" class="sources">
            <span class="sources-label">参考来源：</span>
            <span v-for="(src, idx) in msg.sources" :key="idx" class="source-tag">{{ src }}</span>
          </div>
        </div>
      </div>

      <div v-if="isTyping" class="message assistant typing">
        <div class="avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </div>
        <div class="content">
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="quick-questions">
      <button
        v-for="q in quickQuestions"
        :key="q"
        class="quick-btn"
        @click="handleQuickQuestion(q)"
      >
        {{ q }}
      </button>
    </div>

    <div class="chat-input">
      <input
        v-model="inputText"
        @keyup.enter="sendMessage"
        placeholder="输入合规相关问题..."
        :disabled="isTyping"
      />
      <button class="send-btn" @click="sendMessage" :disabled="!inputText.trim() || isTyping">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { complianceDocs } from '@/data/complianceDocs'

let msgId = 0
function generateId() {
  return 'msg-' + ++msgId + '-' + Date.now()
}

const messages = ref([])
const inputText = ref('')
const isTyping = ref(false)
const messagesContainer = ref(null)

const quickQuestions = [
  '什么是跨境合规风险？',
  '如何规避外汇管制风险？',
  'ESG披露有哪些要求？',
  '数据跨境传输合规要点'
]

// RAG 知识库 - 基于文档内容构建
const knowledgeBase = [
  {
    keywords: ['跨境合规', '风险', '定义', '什么是'],
    answer: `<strong>跨境合规风险</strong>是指企业在开展跨境业务时，因不符合目标国家或地区的法律法规要求而可能面临的法律、财务或声誉损失风险。

主要风险类型包括：
• <strong>外汇资金风险</strong>：跨境资金流动受限、汇率波动
• <strong>贸易制裁风险</strong>：违反国际制裁规定
• <strong>ESG披露风险</strong>：环境、社会、治理信息披露不合规
• <strong>数据合规风险</strong>：跨境数据传输违反当地法规
• <strong>税务风险</strong>：跨境税务筹划不当

建议企业建立完善的合规管理体系，定期进行风险评估。`,
    sources: ['跨境合规指南', '风险管理手册']
  },
  {
    keywords: ['外汇', '管制', '规避', '资金'],
    answer: `<strong>外汇管制风险规避策略：</strong>

1. <strong>事前规划</strong>
   • 充分了解目标国家外汇政策
   • 建立多币种账户体系
   • 与银行建立良好合作关系

2. <strong>合规操作</strong>
   • 真实贸易背景下的资金收付
   • 完整保留交易凭证
   • 及时申报大额跨境交易

3. <strong>风险对冲</strong>
   • 使用远期结售汇锁定汇率
   • 购买汇率波动保险
   • 分散币种配置

4. <strong>应急预案</strong>
   • 建立应急资金池
   • 制定资金调度方案`,
    sources: ['外汇管理指引', '跨境资金流动管理办法']
  },
  {
    keywords: ['ESG', '披露', '要求', '环境', '社会', '治理'],
    answer: `<strong>ESG披露核心要求：</strong>

<strong>环境维度 (E)</strong>
• 碳排放数据及减排目标
• 能源消耗与清洁能源使用比例
• 废弃物管理与循环利用
• 生物多样性保护措施

<strong>社会维度 (S)</strong>
• 员工权益与劳动标准
• 供应链社会责任管理
• 社区参与与公益投入
• 客户隐私与数据保护

<strong>治理维度 (G)</strong>
• 董事会结构与独立性
• 反腐败与商业道德
• 风险管理与内部控制
• 股东权益保护

建议参考 GRI 标准、TCFD 框架进行披露。`,
    sources: ['ESG披露指引', '可持续发展报告标准']
  },
  {
    keywords: ['数据', '跨境', '传输', '合规', '隐私'],
    answer: `<strong>数据跨境传输合规要点：</strong>

<strong>1. 法律依据确认</strong>
• 获得数据主体明确同意
• 签订标准合同条款(SCC)
• 通过安全评估认证

<strong>2. 数据分类分级</strong>
• 识别敏感个人信息
• 评估数据出境必要性
• 建立数据资产清单

<strong>3. 安全保障措施</strong>
• 端到端加密传输
• 访问权限最小化
• 审计日志留存

<strong>4. 监管申报</strong>
• 网信部门安全评估申报
• 定期提交数据出境报告
• 建立应急响应机制

<strong>关键法规：</strong>《个人信息保护法》《数据安全法》《数据出境安全评估办法》`,
    sources: ['数据安全法', '个人信息保护法', '数据出境安全评估办法']
  },
  {
    keywords: ['制裁', '贸易', '名单', '合规'],
    answer: `<strong>贸易制裁合规管理：</strong>

<strong>1. 制裁名单筛查</strong>
• 实时更新制裁名单数据库
• 客户、供应商、合作伙伴筛查
• 交易对手方尽职调查

<strong>2. 物项管控</strong>
• 两用物项识别与分类
• 出口许可证申请
• 最终用途证明

<strong>3. 内部控制</strong>
• 建立制裁合规政策
• 定期培训相关人员
• 设立合规审查流程

<strong>4. 应急处置</strong>
• 发现违规立即报告
• 配合监管调查
• 整改与补救措施

<strong>主要制裁名单：</strong>美国SDN名单、欧盟制裁名单、联合国制裁名单`,
    sources: ['出口管制法', '贸易制裁合规指南']
  },
  {
    keywords: ['税务', '跨境', '筹划', '转让定价'],
    answer: `<strong>跨境税务合规要点：</strong>

<strong>1. 转让定价管理</strong>
• 关联交易定价原则
• 同期资料准备
• 国别报告申报

<strong>2. 常设机构判定</strong>
• 避免构成常设机构
• 税收协定优惠申请
• 利润归属计算

<strong>3. 税务申报义务</strong>
• 海外收入申报
• 税收抵免计算
• CRS信息交换

<strong>4. 反避税合规</strong>
• 受控外国公司规则
• 一般反避税条款
• 合理商业目的证明

建议聘请专业税务顾问，确保跨境税务安排合规。`,
    sources: ['跨境税务管理指引', '转让定价法规']
  }
]

// RAG 检索函数
function retrieveRelevantDocs(query) {
  const queryLower = query.toLowerCase()
  let bestMatch = null
  let highestScore = 0

  for (const item of knowledgeBase) {
    let score = 0
    for (const keyword of item.keywords) {
      if (queryLower.includes(keyword.toLowerCase())) {
        score += 1
      }
    }
    if (score > highestScore) {
      highestScore = score
      bestMatch = item
    }
  }

  // 如果没有匹配，返回默认回答
  if (!bestMatch || highestScore === 0) {
    return {
      answer: `抱歉，我暂时无法回答这个问题。您可以尝试以下方式获取帮助：

• 查阅我们的<strong>文本资料库</strong>获取相关文档
• 使用更具体的关键词重新提问
• 联系合规专家获取专业建议

您也可以尝试问一些常见问题，如：
- 什么是跨境合规风险？
- 如何规避外汇管制风险？`,
      sources: []
    }
  }

  return bestMatch
}

// 格式化消息（支持简单的 HTML）
function formatMessage(text) {
  return text.replace(/\n/g, '<br>')
}

// 发送消息
async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isTyping.value) return

  // 添加用户消息
  messages.value.push({
    id: generateId(),
    role: 'user',
    content: text
  })
  inputText.value = ''

  await nextTick()
  scrollToBottom()

  // 模拟 AI 思考
  isTyping.value = true

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200))

  // RAG 检索
  const result = retrieveRelevantDocs(text)

  isTyping.value = false

  // 添加 AI 回复
  messages.value.push({
    id: generateId(),
    role: 'assistant',
    content: result.answer,
    sources: result.sources
  })

  await nextTick()
  scrollToBottom()
}

// 快捷问题
function handleQuickQuestion(q) {
  inputText.value = q
  sendMessage()
}

// 滚动到底部
function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 初始化欢迎消息
onMounted(() => {
  messages.value.push({
    id: generateId(),
    role: 'assistant',
    content: `您好！我是<strong>合规智能助手</strong>，基于 RAG（检索增强生成）技术为您解答跨境合规相关问题。

我可以帮助您：
• 解答跨境合规风险相关问题
• 提供合规管理建议
• 引用相关法规文档

请问有什么可以帮您的？`,
    sources: []
  })
})
</script>

<style scoped lang="scss">
.ai-chat {
  display: flex;
  flex-direction: column;
  height: 600px;
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--glass-border);

  .ai-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--primary), var(--primary-light));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 24px;
      height: 24px;
      color: #040812;
    }
  }

  .header-info {
    h3 {
      font-size: 18px;
      color: var(--text-white);
      margin-bottom: 4px;
    }
    .status {
      font-size: 12px;
      color: var(--text-gray);
    }
  }
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--glass-border);
    border-radius: 3px;
  }
}

.message {
  display: flex;
  gap: 12px;
  max-width: 85%;

  &.user {
    align-self: flex-end;
    flex-direction: row-reverse;

    .avatar {
      background: var(--primary);
      color: #040812;
    }
    .content {
      background: linear-gradient(135deg, var(--primary), var(--primary-light));
      color: #040812;
    }
  }

  &.assistant {
    align-self: flex-start;

    .avatar {
      background: rgba(54, 195, 255, 0.2);
      color: var(--primary);
    }
    .content {
      background: rgba(18, 26, 42, 0.8);
      border: 1px solid var(--glass-border);
    }
  }
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
  }
}

.content {
  padding: 14px 18px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.7;

  .text {
    :deep(strong) {
      color: var(--primary-light);
    }
  }

  .sources {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(110, 190, 255, 0.1);
    font-size: 12px;

    .sources-label {
      color: var(--text-gray);
      margin-right: 8px;
    }

    .source-tag {
      display: inline-block;
      padding: 2px 8px;
      background: rgba(54, 195, 255, 0.15);
      color: var(--primary-light);
      border-radius: 4px;
      margin-right: 6px;
      font-size: 11px;
    }
  }
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 4px 0;

  span {
    width: 8px;
    height: 8px;
    background: var(--primary);
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out both;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.quick-questions {
  padding: 12px 20px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  border-top: 1px solid var(--glass-border);

  .quick-btn {
    padding: 8px 14px;
    background: rgba(54, 195, 255, 0.1);
    border: 1px solid rgba(54, 195, 255, 0.2);
    border-radius: 20px;
    color: var(--primary-light);
    font-size: 12px;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(54, 195, 255, 0.2);
      border-color: var(--primary);
    }
  }
}

.chat-input {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid var(--glass-border);

  input {
    flex: 1;
    padding: 14px 18px;
    background: rgba(18, 26, 42, 0.6);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    color: var(--text-white);
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease;

    &::placeholder {
      color: var(--text-dark-gray);
    }
    &:focus {
      border-color: var(--primary);
    }
    &:disabled {
      opacity: 0.6;
    }
  }

  .send-btn {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--primary), var(--primary-light));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    svg {
      width: 20px;
      height: 20px;
      color: #040812;
    }

    &:hover:not(:disabled) {
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(54, 195, 255, 0.4);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
