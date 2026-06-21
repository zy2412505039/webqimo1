<template>
  <div class="relate-wrap glass-card">
    <h3>高热度关键词关联合规文档</h3>
    <div class="relate-item" v-for="doc in hotDocList" :key="doc.id">
      <h4>{{ doc.title }}</h4>
      <div class="kw-tag">
        关联关键词：{{ doc.keywords.slice(0,4).join('、') }}
      </div>
      <p class="desc">{{ doc.content.slice(0,90) }}...</p>
    </div>
  </div>
</template>

<script setup>
import { complianceDocs } from '@/data/complianceDocs'
// 筛选高风险/高热度文档展示
const hotDocList = complianceDocs.filter(item => ['高风险','中风险'].includes(item.riskLevel)).slice(0,6)
</script>

<style scoped lang="scss">
.relate-wrap {
  padding: 24px;
  h3 {
    margin-bottom: 24px;
    font-size: 22px;
  }
  .relate-item {
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--glass-border);
    h4 {
      margin-bottom: 8px;
      color: var(--primary-light);
    }
    .kw-tag {
      font-size: 13px;
      color: var(--text-gray);
      margin-bottom: 8px;
    }
    .desc {
      font-size: 14px;
      color: var(--text-dark-gray);
      line-height: 1.6;
    }
  }
}
</style>