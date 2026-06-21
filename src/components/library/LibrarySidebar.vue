<template>
  <div class="sidebar-wrap glass-card">
    <h3 class="sidebar-title">文献分类</h3>
    <div class="category-list">
      <div
        v-for="item in categoryList"
        :key="item.type"
        class="category-item"
        :class="{ active: currentType === item.type }"
        @click="changeType(item.type)"
      >
        <span class="label">{{ item.label }}</span>
        <span class="count">{{ item.count }}</span>
      </div>
    </div>
    <div class="stat-panel glass-card">
      <h4>合规动态看板</h4>
      <p>共126份公开文本，覆盖7大类资料来源；高风险样本12条</p>
      <button class="more-btn">了解更多 →</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { complianceDocs } from '@/data/complianceDocs'

const emit = defineEmits(['update:type'])
const currentType = ref('全部文献')

// 统计分类数量
const getTypeCount = (typeName) => {
  if(typeName === '全部文献') return complianceDocs.length
  return complianceDocs.filter(item => item.type === typeName).length
}

const categoryList = [
  { label: '全部文献', type: '全部文献', count: getTypeCount('全部文献') },
  { label: '政策法规', type: '政策法规', count: getTypeCount('政策法规') },
  { label: '行业动态', type: '行业动态', count: getTypeCount('行业动态') },
  { label: '企业公告', type: '企业公告', count: getTypeCount('企业公告') },
  { label: '跨境投资布局', type: '跨境投资布局', count: getTypeCount('跨境投资布局') },
  { label: 'ESG与绿色贸易', type: 'ESG与绿色贸易', count: getTypeCount('ESG与绿色贸易') },
]

const changeType = (val) => {
  currentType.value = val
  emit('update:type', val)
}
</script>

<style scoped lang="scss">
.sidebar-wrap {
  padding: 24px;
  .sidebar-title {
    font-size: 22px;
    margin-bottom: 20px;
  }
  .category-list {
    margin-bottom: 30px;
    .category-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 12px;
      margin-bottom: 8px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      color: var(--text-gray);
      transition: var(--transition-all);
      &.active {
        background: rgba(54,195,255,0.12);
        color: var(--primary-light);
      }
      &:hover:not(.active) {
        background: rgba(255,255,255,0.05);
      }
      .count {
        font-size: 13px;
      }
    }
  }
  .stat-panel {
    padding: 16px;
    h4 {
      margin-bottom: 8px;
      color: var(--primary-light);
    }
    p {
      font-size: 13px;
      color: var(--text-gray);
      line-height: 1.6;
      margin-bottom: 12px;
    }
    .more-btn {
      color: var(--primary);
      font-size: 14px;
    }
  }
}
</style>