<template>
  <SubpageBgVideo>
    <div class="container home-wrap">
      <HeroCenter />
      <HeroVideoSwiper />
      <HomeStatsSection />
      <HomeVisualSection />
      <HomeCtaSection />
      <HomeFooter />
    </div>
  </SubpageBgVideo>
</template>

<script setup>
// 全局视频背景组件
import SubpageBgVideo from '@/components/gonggongzujian/SubpageBgVideo.vue'
// 首页所有子组件
import HeroCenter from '@/components/home/HeroCenter.vue'
import HeroVideoSwiper from '@/components/home/HeroVideoSwiper.vue'
import HomeStatsSection from '@/components/home/HomeStatsSection.vue'
import HomeVisualSection from '@/components/home/HomeVisualSection.vue'
import HomeCtaSection from '@/components/home/HomeCtaSection.vue'
import HomeFooter from '@/components/home/HomeFooter.vue'
</script>

<style scoped lang="scss">
.home-wrap {
  padding-top: 120px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 100px;
}
</style>
