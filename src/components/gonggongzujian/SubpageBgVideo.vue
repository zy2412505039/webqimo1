<template>
  <div class="video-bg-wrap">
    <!-- 视频加载占位 -->
    <div v-if="videoLoading" class="video-loading">
      <div class="loading-text">平台资源加载中，请稍候...</div>
    </div>
    <!-- 全屏背景视频 -->
    <video
      class="bg-video"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      @loadeddata="videoLoading = false"
    >
      <source src="/bg-main.mp4" type="video/mp4" />
      您的浏览器不支持MP4视频播放
    </video>
    <!-- 双层渐变遮罩，降低深色透明度，视频更明显 -->
    <div class="mask-layer-1"></div>
    <div class="mask-layer-2"></div>
    <!-- 页面内容插槽 -->
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 视频加载状态控制
const videoLoading = ref(true)
</script>

<style scoped lang="scss">
.video-bg-wrap {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}
.video-loading {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: #040812;
  display: flex;
  align-items: center;
  justify-content: center;
  .loading-text {
    font-size: 20px;
    color: var(--primary);
    letter-spacing: 1px;
  }
}
.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -3;
  /* 原0.65 → 改为0.8，画面变亮，视频细节更清晰 */
  filter: brightness(0.8);
}
.mask-layer-1 {
  position: absolute;
  inset: 0;
  z-index: -2;
  /* 原0.92/0.75 降低透明度，减少黑色遮挡 */
  background: linear-gradient(135deg, rgba(4, 8, 18, 0.70) 0%, rgba(10, 18, 40, 0.55) 100%);
}
.mask-layer-2 {
  position: absolute;
  inset: 0;
  z-index: -1;
  /* 径向遮罩透明度降低 */
  background: radial-gradient(circle at center, transparent 0%, rgba(4, 8, 18, 0.25) 100%);
}
.page-content {
  position: relative;
  z-index: 2;
  width: 100%;
}
</style>