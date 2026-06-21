<template>
  <div class="dim-wrap">
    <h2 class="module-title">四大核心业务模块</h2>
    <div class="dim-grid">
      <div class="dim-card glass-card" v-for="mod in moduleList" :key="mod.title">
        <h3>{{ mod.title }}</h3>
        <p>{{ mod.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const moduleList = [
  {
    title: "合规文本资料库",
    desc: "分类存储全球政策、企业公告、行业动态、ESG文件，支持筛选、分页、详情查看"
  },
  {
    title: "关键词智能提取分析",
    desc: "AI自动抽取文档核心词汇，生成热度词云、关联文档、热度排行"
  },
  {
    title: "多维数据可视化看板",
    desc: "饼图、雷达、柱状、仪表盘多图表展示文档分布、风险指数、月度增量"
  },
  {
    title: "跨境合规风险预警",
    desc: "自动标记高、中、低风险文档，提炼经营风险点，辅助企业决策"
  }
]
</script>

<style scoped lang="scss">
.dim-wrap {
  margin-bottom: 60px;
  .module-title {
    text-align: center;
    font-size: 28px;
    margin-bottom: 32px;
    color: #fff;
  }
  .dim-grid {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 24px;
    .dim-card {
      padding: 26px;
      h3 {
        color: var(--primary-light);
        margin-bottom: 12px;
        font-size: 20px;
      }
      p {
        color: var(--text-gray);
        line-height: 1.7;
      }
    }
  }
}
</style>