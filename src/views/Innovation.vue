<template>
  <div class="container innovation-page">
    <!-- 视频背景 -->
    <div class="bg-animate-layer">
      <video
        autoplay
        muted
        loop
        playsinline
        src="https://nono2222.oss-cn-beijing.aliyuncs.com/f9942cf97ae710d46e9707dfe38b6c4a.mp4"
      ></video>
      <div class="mask"></div>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <h1>智能合规中心</h1>
      <p>AI 驱动的合规风险管理平台</p>
      <div class="feature-tags">
        <span class="tag">RAG 智能问答</span>
        <span class="tag">全球风险热力图</span>
        <span class="tag">合规健康评分</span>
      </div>
    </div>

    <!-- 功能标签页 -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['tab-btn', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key"
      >
        <span class="tab-icon" v-html="tab.icon"></span>
        {{ tab.label }}
      </button>
    </div>

    <!-- 内容区域 -->
    <div class="content-area">
      <!-- AI 智能问答 -->
      <div v-if="activeTab === 'ai'" class="tab-content">
        <AIChat />
      </div>

      <!-- 3D 地球热力图 -->
      <div v-if="activeTab === 'globe'" class="tab-content">
        <GlobeHeatmap />
      </div>

      <!-- 合规评分体系 -->
      <div v-if="activeTab === 'score'" class="tab-content">
        <ComplianceScore />
      </div>
    </div>

    <!-- 快速统计 -->
    <div class="quick-stats">
      <div class="stat-card">
        <div class="stat-icon ai">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">24/7</span>
          <span class="stat-label">AI 在线服务</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon globe">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">186</span>
          <span class="stat-label">监管国家</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon score">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">72</span>
          <span class="stat-label">合规健康分</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon docs">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-value">1,280+</span>
          <span class="stat-label">知识库文档</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AIChat from '@/components/innovation/AIChat.vue'
import GlobeHeatmap from '@/components/innovation/GlobeHeatmap.vue'
import ComplianceScore from '@/components/innovation/ComplianceScore.vue'

const activeTab = ref('ai')

const tabs = [
  {
    key: 'ai',
    label: 'AI 智能问答',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
  },
  {
    key: 'globe',
    label: '全球风险热力图',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>'
  },
  {
    key: 'score',
    label: '合规健康评分',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
  }
]
</script>

<style scoped lang="scss">
.innovation-page {
  padding-top: 120px;
  padding-bottom: 80px;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* 视频背景 */
.bg-animate-layer {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  overflow: hidden;
  pointer-events: none;

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    animation: slow-flow 35s linear infinite alternate;
  }

  .mask {
    position: absolute;
    inset: 0;
    background: rgba(0, 6, 22, 0.45);
  }
}

@keyframes slow-flow {
  0% { transform: translate(-50%, -50%) scale(1); }
  100% { transform: translate(-50%, -50%) scale(1.06); }
}

/* 页面标题 */
.page-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;

  h1 {
    font-size: 42px;
    font-weight: 700;
    background: linear-gradient(135deg, #36c3ff, #89e0ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 12px;
  }

  p {
    font-size: 18px;
    color: var(--text-gray);
    margin-bottom: 20px;
  }

  .feature-tags {
    display: flex;
    justify-content: center;
    gap: 12px;

    .tag {
      padding: 6px 16px;
      background: rgba(54, 195, 255, 0.1);
      border: 1px solid rgba(54, 195, 255, 0.2);
      border-radius: 20px;
      font-size: 13px;
      color: var(--primary-light);
    }
  }
}

/* 标签页 */
.tabs {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  position: relative;
  z-index: 2;

  .tab-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background: rgba(18, 26, 42, 0.6);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    color: var(--text-gray);
    font-size: 15px;
    font-weight: 500;
    transition: all 0.3s ease;

    .tab-icon {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      :deep(svg) {
        width: 20px;
        height: 20px;
      }
    }

    &:hover {
      background: rgba(54, 195, 255, 0.1);
      border-color: rgba(54, 195, 255, 0.3);
      color: var(--text-white);
    }

    &.active {
      background: linear-gradient(135deg, rgba(54, 195, 255, 0.2), rgba(137, 224, 255, 0.1));
      border-color: var(--primary);
      color: var(--primary-light);
      box-shadow: 0 0 20px rgba(54, 195, 255, 0.2);
    }
  }
}

/* 内容区域 */
.content-area {
  position: relative;
  z-index: 2;
  margin-bottom: 40px;

  .tab-content {
    animation: fadeIn 0.3s ease;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 快速统计 */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  position: relative;
  z-index: 2;

  .stat-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: rgba(18, 26, 42, 0.6);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--primary);
      transform: translateY(-4px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 24px;
        height: 24px;
        color: #fff;
      }

      &.ai {
        background: linear-gradient(135deg, #36c3ff, #89e0ff);
      }

      &.globe {
        background: linear-gradient(135deg, #34d399, #6ee7b7);
      }

      &.score {
        background: linear-gradient(135deg, #fbbf24, #fcd34d);
      }

      &.docs {
        background: linear-gradient(135deg, #a78bfa, #c4b5fd);
      }
    }

    .stat-info {
      display: flex;
      flex-direction: column;

      .stat-value {
        font-size: 24px;
        font-weight: 700;
        color: var(--text-white);
      }

      .stat-label {
        font-size: 13px;
        color: var(--text-gray);
      }
    }
  }
}

/* 响应式 */
@media (max-width: 1200px) {
  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 32px;
  }

  .tabs {
    flex-direction: column;
    align-items: center;

    .tab-btn {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
  }

  .quick-stats {
    grid-template-columns: 1fr;
  }
}
</style>
