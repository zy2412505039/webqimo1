<template>
  <div class="stack-wrap glass-card">
    <h2>平台技术架构栈</h2>
    <div class="stack-list">
      <div class="stack-item" v-for="tech in techList" :key="tech.name">
        <h4>{{ tech.name }}</h4>
        <p>{{ tech.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const techList = [
  { name: "Vite + Vue3", desc: "前端极速构建框架，Composition API组件化开发" },
  { name: "Vue Router4", desc: "单页面路由管理，页面导航与路由守卫" },
  { name: "ECharts5", desc: "多维度数据可视化图表，饼图/雷达/柱状/仪表盘" },
  { name: "SCSS", desc: "模块化样式管理，全局主题变量统一管控" },
  { name: "GSAP", desc: "页面入场、悬浮平滑动画效果" },
  { name: "Swiper", desc: "首页视频轮播、图文滑动组件" }
]
</script>

<style scoped lang="scss">
.stack-wrap {
  padding: 32px;
  margin-bottom: 40px;
  h2 {
    font-size: 28px;
    margin-bottom: 30px;
    text-align: center;
    color: #fff;
  }
  .stack-list {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 24px;
    .stack-item {
      padding: 20px;
      border: 1px solid var(--glass-border);
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