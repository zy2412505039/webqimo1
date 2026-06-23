<template>
  <div class="cta-wrap glass-card">
    <div class="cta-text">
      <h2>立即开启跨境合规数据智能分析</h2>
      <p>收录全球120+份合规文档，覆盖贸易、投资、税务、ESG四大业务场景</p>
    </div>
    <div class="cta-btns">
      <router-link to="/library" class="btn-primary">浏览全部合规文档</router-link>
      <router-link to="/keywords" class="btn-outline">查看关键词热度分析</router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.cta-wrap {
  padding: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  .cta-text h2 {
    font-size: 30px;
    margin-bottom: 10px;
  }
  .cta-text p {
    color: var(--text-gray);
  }
  .cta-btns {
    display: flex;
    gap: 20px;
  }
}
</style>