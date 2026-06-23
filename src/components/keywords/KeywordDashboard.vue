<template>
  <div class="rank-wrap glass-card">
    <h3>关键词热度TOP排行</h3>
    <div class="rank-list">
      <div class="rank-item" v-for="(item, idx) in keywordList" :key="idx">
        <span class="rank-num">{{ idx + 1 }}</span>
        <span class="rank-name">{{ item.name }}</span>
        <span class="rank-value">热度值：{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { keywordList } from '@/data/complianceDocs'
</script>

<style scoped lang="scss">
.rank-wrap {
  padding: 24px;
  height: 460px;
  h3 {
    margin-bottom: 20px;
    font-size: 22px;
    color: var(--text-white);
  }
  .rank-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .rank-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #1a2738;
  }
  .rank-num {
    color: var(--primary-light);
    width: 30px;
  }
  .rank-name {
    flex: 1;
    color: #fff;
  }
  .rank-value {
    color: var(--text-gray);
  }
}
</style>