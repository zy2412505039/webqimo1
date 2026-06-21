<template>
  <div class="kw-header">
    <span class="sub-tag">关键词智能分析 | KEYWORD ANALYSIS</span>
    <h1>合规关键词热度全景分析</h1>
    <p>基于NLP文本抽取算法，自动提取海外矿业合规文档核心词汇，统计热度、关联文档、风险标签，直观展示跨境业务风控重点方向</p>
    <div class="total-kw">
      累计提取核心关键词：{{ totalKw }} 个
    </div>
  </div>
</template>

<script setup>
import { keywordList } from '@/data/complianceDocs'
const totalKw = keywordList.length
</script>

<style scoped lang="scss">
.kw-header {
  text-align: center;
  margin-bottom: 60px;
  .sub-tag {
    color: var(--primary);
    letter-spacing: 1px;
    font-size: 14px;
  }
  h1 {
    font-size: 40px;
    margin: 16px 0 20px;
  }
  p {
    width: 70%;
    margin: 0 auto 24px;
    color: var(--text-gray);
    line-height: 1.8;
  }
  .total-kw {
    font-size: 20px;
    color: var(--primary-light);
  }
}
</style>