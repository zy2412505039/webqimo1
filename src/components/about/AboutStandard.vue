<template>
  <div class="std-wrap glass-card">
    <h2>合规数据处理标准流程</h2>
    <div class="step-list">
      <div class="step-item" v-for="(step,idx) in stepList" :key="idx">
        <div class="step-num">{{ idx+1 }}</div>
        <div class="step-text">
          <h4>{{ step.title }}</h4>
          <p>{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stepList = [
  { title: "多源文本采集", desc: "自动抓取各国政府官网、企业公告、行业媒体公开合规文档" },
  { title: "文本清洗分类", desc: "去除无效冗余内容，按政策/企业/ESG/投资四大类自动归档" },
  { title: "NLP语义解析", desc: "抽取关键词、风险等级、地区、业务场景标签" },
  { title: "数据入库存储", desc: "结构化数据存入本地模拟数据库，支持快速检索筛选" },
  { title: "可视化渲染展示", desc: "统计数据转化图表，词云、看板、文档列表前端呈现" }
]
</script>

<style scoped lang="scss">
.std-wrap {
  padding: 32px;
  h2 {
    text-align: center;
    font-size: 28px;
    margin-bottom: 36px;
    color: #fff;
  }
  .step-list {
    .step-item {
      display: flex;
      gap: 20px;
      margin-bottom: 28px;
      align-items: flex-start;
      .step-num {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--primary);
        color: #040812;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
      }
      .step-text h4 {
        margin-bottom: 6px;
        color: var(--primary-light);
      }
      .step-text p {
        color: var(--text-gray);
        line-height: 1.6;
      }
    }
  }
}
</style>