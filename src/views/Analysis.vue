<template>
  <div class="container ana-page">
    <!-- 阿里云视频动态背景层 -->
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

    <AnalysisHero />
    <div class="chart-grid-1">
      <AnalysisCategoryPie />
      <AnalysisStageBar />
    </div>
    <div class="chart-grid-2">
      <AnalysisRiskRadar />
      <AnalysisGauge />
    </div>
  </div>
</template>

<script setup>
import AnalysisHero from '@/components/analysis/AnalysisHero.vue'
import AnalysisCategoryPie from '@/components/analysis/AnalysisCategoryPie.vue'
import AnalysisStageBar from '@/components/analysis/AnalysisStageBar.vue'
import AnalysisRiskRadar from '@/components/analysis/AnalysisRiskRadar.vue'
import AnalysisGauge from '@/components/analysis/AnalysisGauge.vue'
import * as echarts from 'echarts'
</script>

<style scoped lang="scss">
.ana-page {
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

.chart-grid-1, .chart-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  position: relative;
  z-index: 2;
}
</style>