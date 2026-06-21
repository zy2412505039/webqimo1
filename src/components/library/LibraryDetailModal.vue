<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content glass-card">
          <button class="close-btn" @click="$emit('close')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="modal-header">
            <div class="type-tag">{{ doc.type }}</div>
            <div class="meta-line">
              <span class="date">{{ doc.date }}</span>
              <span 
                class="risk-tag"
                :class="{
                  low: doc.riskLevel === '低风险',
                  mid: doc.riskLevel === '中风险',
                  high: doc.riskLevel === '高风险'
                }"
              >{{ doc.riskLevel }}</span>
            </div>
          </div>
          
          <h1 class="modal-title">{{ doc.title }}</h1>
          
          <div class="tag-group">
            <span v-for="tag in doc.tags" :key="tag" class="tag">#{{ tag }}</span>
          </div>
          
          <div class="detail-section">
            <h3 class="section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              内容摘要
            </h3>
            <p class="content-text">{{ doc.content }}</p>
          </div>
          
          <div class="detail-section">
            <h3 class="section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              核心高频词
            </h3>
            <div class="kw-list">
              <span v-for="(kw, index) in keywordArray" :key="index" class="kw-item">{{ kw }}</span>
            </div>
          </div>
          
          <div class="detail-section">
            <h3 class="section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
              风险评估
            </h3>
            <div class="risk-assessment">
              <div class="risk-bar">
                <div 
                  class="risk-fill"
                  :class="{
                    low: doc.riskLevel === '低风险',
                    mid: doc.riskLevel === '中风险',
                    high: doc.riskLevel === '高风险'
                  }"
                  :style="{ width: riskWidth }"
                ></div>
              </div>
              <p class="risk-desc">{{ riskDesc }}</p>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-primary" @click="$emit('close')">关闭</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: Boolean,
  doc: Object
})

defineEmits(['close'])

const keywordArray = computed(() => {
  if (!props.doc?.keywords) return []
  // 兼容 keywords 为字符串或数组两种情况
  if (Array.isArray(props.doc.keywords)) {
    return props.doc.keywords.flatMap(k => String(k).split(/[,，]/).map(s => s.trim()).filter(s => s))
  }
  return String(props.doc.keywords).split(/[,，]/).map(k => k.trim()).filter(k => k)
})

const riskWidth = computed(() => {
  const level = props.doc?.riskLevel
  if (level === '低风险') return '33%'
  if (level === '中风险') return '66%'
  return '100%'
})

const riskDesc = computed(() => {
  const level = props.doc?.riskLevel
  if (level === '低风险') return '该文档涉及的合规风险较低，建议日常关注即可'
  if (level === '中风险') return '该文档涉及中等合规风险，建议重点关注并制定应对措施'
  return '该文档涉及高合规风险，建议立即评估并采取相应风控措施'
})
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  width: 100%;
  max-width: 720px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 32px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-all);
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: var(--text-white);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .type-tag {
    font-size: 14px;
    color: var(--primary-light);
  }
  .meta-line {
    display: flex;
    gap: 16px;
    font-size: 14px;
    .date {
      color: var(--text-dark-gray);
    }
    .risk-tag {
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 13px;
      &.low {
        background: rgba(52, 211, 153, 0.15);
        color: var(--success);
      }
      &.mid {
        background: rgba(251, 191, 36, 0.15);
        color: var(--warning);
      }
      &.high {
        background: rgba(248, 113, 113, 0.15);
        color: var(--danger);
      }
    }
  }
}

.modal-title {
  font-size: 28px;
  line-height: 1.4;
  margin-bottom: 16px;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
  .tag {
    font-size: 13px;
    color: var(--text-gray);
    padding: 4px 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-sm);
  }
}

.detail-section {
  margin-bottom: 28px;
  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    color: var(--primary-light);
    margin-bottom: 14px;
  }
}

.content-text {
  color: var(--text-gray);
  line-height: 1.9;
  font-size: 15px;
}

.kw-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .kw-item {
    padding: 6px 16px;
    background: linear-gradient(135deg, rgba(54, 195, 255, 0.15), rgba(137, 224, 255, 0.1));
    border-radius: 999px;
    font-size: 14px;
    color: var(--primary-light);
    border: 1px solid rgba(54, 195, 255, 0.2);
  }
}

.risk-assessment {
  .risk-bar {
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 12px;
    .risk-fill {
      height: 100%;
      border-radius: 999px;
      transition: width 0.5s ease;
      &.low {
        background: linear-gradient(90deg, var(--success), #6ee7b7);
      }
      &.mid {
        background: linear-gradient(90deg, var(--warning), #fcd34d);
      }
      &.high {
        background: linear-gradient(90deg, var(--danger), #fb923c);
      }
    }
  }
  .risk-desc {
    color: var(--text-gray);
    font-size: 14px;
    line-height: 1.6;
  }
}

.modal-footer {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid var(--glass-border);
  margin-top: 16px;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
}
</style>
