<template>
  <div class="doc-card glass-card">
    <div class="card-header">
      <div class="type-tag">{{ item.type }}</div>
      <div class="meta-line">
        <span class="date">{{ item.date }}</span>
        <span 
          class="risk-tag"
          :class="{
            low: item.riskLevel === '低风险',
            mid: item.riskLevel === '中风险',
            high: item.riskLevel === '高风险'
          }"
        >{{ item.riskLevel }}</span>
      </div>
    </div>
    <h2 class="doc-title">{{ item.title }}</h2>
    <div class="tag-group">
      <span v-for="tag in item.tags" :key="tag" class="tag">#{{ tag }}</span>
    </div>
    <p class="doc-desc">{{ item.content.slice(0,120) }}...</p>
    <div class="card-footer">
      <div class="kw-text">
        <span>核心高频词：</span>
        {{ item.keywords.join('，') }}
      </div>
      <button class="detail-btn btn-primary" @click="$emit('showDetail', item)">查看详情</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object
})
</script>

<style scoped lang="scss">
.doc-card {
  padding: 28px;
  margin-bottom: 24px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
    .type-tag {
      font-size: 13px;
      color: var(--primary-light);
    }
    .meta-line {
      display: flex;
      gap: 16px;
      font-size: 13px;
      .date {
        color: var(--text-dark-gray);
      }
      .risk-tag {
        padding: 2px 8px;
        border-radius: 4px;
        &.low {
          background: rgba(52,211,153,0.15);
          color: var(--success);
        }
        &.mid {
          background: rgba(251,191,36,0.15);
          color: var(--warning);
        }
        &.high {
          background: rgba(248,113,113,0.15);
          color: var(--danger);
        }
      }
    }
  }
  .doc-title {
    font-size: 24px;
    margin-bottom: 12px;
  }
  .tag-group {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
    .tag {
      font-size: 13px;
      color: var(--text-gray);
    }
  }
  .doc-desc {
    color: var(--text-gray);
    line-height: 1.7;
    margin-bottom: 20px;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .kw-text {
      font-size: 13px;
      color: var(--text-dark-gray);
    }
    .detail-btn {
      padding: 10px 24px;
      font-size: 14px;
    }
  }
}
</style>