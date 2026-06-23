<template>
  <div class="toolbar-wrap">
    <div class="title-area">
      <h1>合规文献资料库</h1>
      <p>显示{{ showCount }}条合规文献 · 当前分类：{{ currentType }}</p>
    </div>
    <div class="btn-group">
      <button class="tool-btn">重置筛选</button>
      <button class="tool-btn">最新发布</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showCount: Number,
  currentType: String
})
</script>

<style scoped lang="scss">
.toolbar-wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  .title-area h1 {
    font-size: 36px;
    margin-bottom: 8px;
  }
  .title-area p {
    color: var(--text-gray);
  }
  .btn-group {
    display: flex;
    gap: 14px;
    .tool-btn {
      padding: 8px 16px;
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-sm);
      color: var(--text-gray);
      transition: var(--transition-all);
      &:hover {
        border-color: var(--primary);
        color: var(--primary);
      }
    }
  }
}
</style>