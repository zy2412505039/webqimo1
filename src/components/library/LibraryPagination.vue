<template>
  <div class="page-wrap">
    <button class="page-btn" :disabled="page === 1" @click="page--">上一页</button>
    <span class="page-num">第{{ page }}页</span>
    <button class="page-btn" :disabled="page >= totalPage" @click="page++">下一页</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  page: Number,
  totalPage: Number
})
const emit = defineEmits(['update:page'])
</script>

<style scoped lang="scss">
.page-wrap {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
  align-items: center;
  .page-btn {
    padding: 8px 20px;
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-sm);
    color: var(--text-gray);
    &:hover:not(:disabled) {
      border-color: var(--primary);
      color: var(--primary);
    }
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
  .page-num {
    color: var(--text-white);
  }
}
</style>