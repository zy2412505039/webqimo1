<template>
  <div class="ana-header">
    <span class="sub-tag">数据智能全景 | PANORAMIC DATA INTELLIGENCE</span>
    <h1>数据智能概览</h1>
    <p>基于已采集的全球公开文本资料，提取来源类型、合规主题、关键词与风险等级，形成跨境业务数据决策底座</p>
    <!-- 新增顶部统计卡片 -->
    <div class="num-card-group">
      <div class="num-card glass-card">
        <p class="num-title">文档总数量</p>
        <p class="num-val">128</p>
      </div>
      <div class="num-card glass-card">
        <p class="num-title">提取关键词总数</p>
        <p class="num-val">216</p>
      </div>
      <div class="num-card glass-card">
        <p class="num-title">高风险文档</p>
        <p class="num-val">23</p>
      </div>
      <div class="num-card glass-card">
        <p class="num-title">本月新增文件</p>
        <p class="num-val">30</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ana-header {
  text-align: center;
  margin-bottom: 60px;
  .sub-tag {
    color: var(--primary);
    font-size: 14px;
    letter-spacing: 1px;
  }
  h1 {
    font-size: 42px;
    margin: 16px 0 12px;
    color: #fff;
  }
  p {
    width: 65%;
    margin: 0 auto;
    color: var(--text-gray);
    line-height: 1.7;
  }
  .num-card-group {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 20px;
    width: 80%;
    margin: 30px auto 0;
    .num-card {
      padding: 20px;
      .num-title {
        font-size: 14px;
        color: var(--text-gray);
        margin-bottom: 8px;
      }
      .num-val {
        font-size: 32px;
        color: var(--primary-light);
        font-weight: bold;
      }
    }
  }
}
</style>