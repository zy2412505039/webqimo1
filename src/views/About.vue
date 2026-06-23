<template>
  <div class="container about-page">
    <!-- 阿里云视频动态背景层 -->
    <div class="bg-animate-layer">
      <video
        autoplay
        muted
        loop
        playsinline
        src="https://nono2222.oss-cn-beijing.aliyuncs.com/%E7%BD%91%E9%A1%B5%E5%9B%9B%E9%83%A8%E5%88%86%E5%8A%A8%E6%80%81%E8%83%8C%E6%99%AF%E5%9B%BE%E6%B7%BB%E5%8A%A0.mp4"
      ></video>
      <div class="mask"></div>
    </div>

    <AboutHero />
    <AboutDimensions />
    <AboutStack />
    <AboutStandard />
    <!-- 新增平台优势卡片 -->
    <div class="adv-card glass-card">
      <h2>平台核心优势</h2>
      <div class="adv-flex">
        <div class="adv-item">
          <h4>轻量化部署</h4>
          <p>前端独立可视化项目，无需后端对接，本地即可运行预览全部功能</p>
        </div>
        <div class="adv-item">
          <h4>可视化程度高</h4>
          <p>搭载雷达、饼图、柱状、仪表盘多维度风控可视化图表，数据直观</p>
        </div>
        <div class="adv-item">
          <h4>视觉交互优化</h4>
          <p>磨砂玻璃科技UI、动态流动背景、无抖动导航，全站交互顺滑稳定</p>
        </div>
        <div class="adv-item">
          <h4>模块化开发</h4>
          <p>页面组件拆分完整，方便后期新增功能、对接后端接口</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AboutHero from '@/components/about/AboutHero.vue'
import AboutDimensions from '@/components/about/AboutDimensions.vue'
import AboutStack from '@/components/about/AboutStack.vue'
import AboutStandard from '@/components/about/AboutStandard.vue'
</script>

<style scoped lang="scss">
.about-page {
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

.adv-card {
  padding: 32px;
  margin-top: 40px;
  position: relative;
  z-index: 2;
  h2 {
    text-align: center;
    color: #fff;
    font-size: 28px;
    margin-bottom: 30px;
  }
  .adv-flex {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 24px;
    .adv-item {
      padding: 20px;
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-md);
      h4 {
        color: var(--primary-light);
        margin-bottom: 10px;
      }
      p {
        color: var(--text-gray);
        font-size: 14px;
        line-height: 1.7;
      }
    }
  }
}
</style>