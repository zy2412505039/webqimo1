<template>
  <span class="icon-box">{{ iconName }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  iconName: {
    type: String,
    default: "📄"
  }
})
</script>

<style scoped lang="scss">
.icon-box {
  font-size: 20px;
}
</style>