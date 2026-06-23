<template>
  <div class="container lib-page">
    <!-- 阿里云视频全屏动态背景 -->
    <div class="bg-animate-layer">
      <video
        autoplay
        muted
        loop
        playsinline
        src="https://nono2222.oss-cn-beijing.aliyuncs.com/4c9e9cb6d0aa3e13087dab8017c1b8ed.mp4"
      ></video>
      <!-- 深色遮罩，保证文字清晰 -->
      <div class="mask"></div>
    </div>

    <LibraryToolbar
      :showCount="filterList.length"
      :currentType="currentType"
    />
    <div class="lib-content">
      <LibrarySidebar v-model:type="currentType" />
      <div class="doc-list-wrap">
        <LibraryCard v-for="item in pageList" :key="item.id" :item="item" @showDetail="handleShowDetail" />
        <LibraryPagination
          v-model:page="currentPage"
          :totalPage="Math.ceil(filterList.length / pageSize)"
        />
      </div>
    </div>
    <LibraryFooter />
    <LibraryDetailModal :visible="showModal" :doc="selectedDoc" @close="handleCloseModal" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { complianceDocs } from '@/data/complianceDocs'
// 导入子组件
import LibraryToolbar from '@/components/library/LibraryToolbar.vue'
import LibrarySidebar from '@/components/library/LibrarySidebar.vue'
import LibraryCard from '@/components/library/LibraryCard.vue'
import LibraryPagination from '@/components/library/LibraryPagination.vue'
import LibraryFooter from '@/components/library/LibraryFooter.vue'
import LibraryDetailModal from '@/components/library/LibraryDetailModal.vue'

// 筛选分页逻辑
const currentType = ref('全部文献')
const currentPage = ref(1)
const pageSize = ref(6)

const showModal = ref(false)
const selectedDoc = ref({})

const handleShowDetail = (item) => {
  selectedDoc.value = item
  showModal.value = true
}

const handleCloseModal = () => {
  showModal.value = false
}

// 按分类过滤文档
const filterList = computed(() => {
  if (currentType.value === '全部文献') return complianceDocs
  return complianceDocs.filter(item => item.type === currentType.value)
})

// 当前页数据切片
const pageList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filterList.value.slice(start, end)
})
</script>

<style scoped lang="scss">
.lib-page {
  padding-top: 120px;
  padding-bottom: 80px;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* 视频背景容器：固定全屏，层级最低 */
.bg-animate-layer {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  overflow: hidden;
  pointer-events: none;

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    /* 保留你原来的缓慢流动缩放动画 */
    animation: slow-flow 35s linear infinite alternate;
  }

  .mask {
    position: absolute;
    inset: 0;
    background: rgba(0, 6, 22, 0.35);
  }
}

/* 视频缓慢缩放动态动画 */
@keyframes slow-flow {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1.06);
  }
}

/* 页面内容层级高于背景 */
.lib-content {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 32px;
  position: relative;
  z-index: 2;
}
</style>