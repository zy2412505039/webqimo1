<template>
  <div class="hero-center">
    <p class="sub-title">紫金矿业跨境贸易合规智能风控 · 海外矿业业务数据分析平台</p>
    <h1 class="main-title">
      紫金矿业跨境业务合规文本采集<br/>前端展示平台
    </h1>
    <p class="desc">
      面向紫金矿业海外矿产投资、跨境矿产贸易、境外矿山财税合规场景，自动采集全球矿产行业政策法规、各国矿业监管公告、海外矿山经营风险案例，通过 NLP 智能提取矿业合规关键词、跨境经营风险等级、海外矿区业务关联信息，为紫金矿业全球矿山运营、跨境矿产贸易提供全维度合规数据决策支撑。平台覆盖东南亚、非洲、澳洲、美洲等紫金矿业核心海外矿区区域合规资料，自动标记矿产投资、劳工环保、跨境税务等高风险条款，降低紫金矿业海外矿业经营合规风险与管控成本。
    </p>
    <div class="btn-group">
      <router-link to="/library" class="btn-primary">开始探索资料库</router-link>
      <router-link to="/analysis" class="btn-outline">查看数据看板</router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.hero-center {
  text-align: center;
  padding: 60px 0;
  .sub-title {
    color: var(--primary-light);
    font-size: 16px;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }
  .main-title {
    font-size: 56px;
    line-height: 1.3;
    margin-bottom: 24px;
    font-weight: 700;
  }
  .desc {
    width: 70%;
    margin: 0 auto 40px;
    color: var(--text-gray);
    font-size: 18px;
    line-height: 1.8;
  }
  .btn-group {
    display: flex;
    gap: 24px;
    justify-content: center;
  }
}
</style>