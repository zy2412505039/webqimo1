<template>
  <div class="swiper-wrap">
    <h2 class="module-title">平台能力演示视频</h2>
    <Swiper
      :autoplay="{ delay: 4000, disableOnInteraction: false }"
      loop
      :space-between="30"
      :slides-per-view="3"
    >
      <SwiperSlide v-for="(item, idx) in videoList" :key="idx">
        <div class="video-card glass-card">
          <!-- 视频播放器，静音自动循环 -->
          <video muted loop playsinline autoplay class="card-video">
            <source :src="item.src" type="video/mp4" />
            当前浏览器不支持视频播放
          </video>
          <div class="video-info">
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/autoplay'

// 三个视频资源配置，对应你页面三块内容
const videoList = [
  {
    src: "/1tech.mp4", // 放在public文件夹下
    title: "政策文本智能采集",
    desc: "自动抓取全球各国公开合规政策文档"
  },
  {
    src: "/2tech.mp4",
    title: "NLP关键词提取引擎",
    desc: "AI自动抽取风险、业务、合规核心词汇"
  },
  {
    src: "/3tech.mp4",
    title: "多维度数据可视化",
    desc: "图表化展示风险分布、文档分类、热度趋势"
  }
]
</script>

<style scoped lang="scss">
.swiper-wrap {
  .module-title {
    font-size: 28px;
    margin-bottom: 32px;
    color: var(--text-white);
    text-align: center;
  }
  .video-card {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    .card-video {
      width: 100%;
      height: 180px;
      object-fit: cover;
      background: #0a1428;
    }
    .video-info {
      padding: 16px;
      flex: 1;
      h4 {
        color: var(--primary-light);
        margin-bottom: 8px;
        font-size: 20px;
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