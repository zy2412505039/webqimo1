<template>
  <div class="container kw-page">
    <!-- 阿里云视频动态背景层 -->
    <div class="bg-animate-layer">
      <video
        autoplay
        muted
        loop
        playsinline
        src="https://nono2222.oss-cn-beijing.aliyuncs.com/d8d5fb8750a47c54963cadf918795997.mp4"
      ></video>
      <div class="mask"></div>
    </div>

    <KeywordHeader />
    <div class="kw-grid">
      <KeywordCloud />
      <KeywordDashboard />
    </div>
    <KeywordRelatedList />
    <!-- 新增风控名词释义 -->
    <div class="explain-card glass-card">
      <h3>跨境风控核心名词释义</h3>
      <div class="explain-list">
        <div class="explain-item">
          <h4>跨境贸易制裁</h4>
          <p>指主权国家针对境外企业、经济体出台进出口限制、资金冻结、业务封禁类监管政策，属于高风险业务标签。</p>
        </div>
        <div class="explain-item">
          <h4>ESG合规</h4>
          <p>环境、社会、治理三维企业合规标准，海外上市、海外投资必备审核资质。</p>
        </div>
        <div class="explain-item">
          <h4>跨境资金风控</h4>
          <p>外汇结算、跨境回款、境外账户资金流转监管核验，规避洗钱、非法外流风险。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import KeywordHeader from '@/components/keywords/KeywordHeader.vue'
import KeywordCloud from '@/components/keywords/KeywordCloud.vue'
import KeywordDashboard from '@/components/keywords/KeywordDashboard.vue'
import KeywordRelatedList from '@/components/keywords/KeywordRelatedList.vue'
</script>

<style scoped lang="scss">
.kw-page {
  padding-top: 120px;
  padding-bottom: 80px;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* 视频背景容器 */
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
    background: rgba(0, 6, 22, 0.35);
  }
}

/* 视频缓慢缩放流动动画 */
@keyframes slow-flow {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1.06);
  }
}

.kw-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
}
.explain-card {
  padding: 24px;
  margin-top: 40px;
  position: relative;
  z-index: 2;
  h3 {
    color: #fff;
    margin-bottom: 20px;
    font-size: 22px;
  }
  .explain-list {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 20px;
    .explain-item {
      border: 1px solid var(--glass-border);
      padding: 16px;
      border-radius: var(--radius-md);
      h4 {
        color: var(--primary-light);
        margin-bottom: 8px;
      }
      p {
        color: var(--text-gray);
        font-size: 14px;
        line-height: 1.6;
      }
    }
  }
}
</style>