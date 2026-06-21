<template>
  <header class="global-nav glass-card">
    <div class="container nav-inner">
      <!-- 左侧平台LOGO -->
      <div class="nav-logo">
        <h2>紫金矿业跨境合规文本采集可视化平台</h2>
      </div>
      <!-- 中间导航菜单 -->
      <nav class="nav-menu">
        <router-link
          v-for="item in menuList"
          :key="item.path"
          :to="item.path"
          class="menu-item"
          :class="{ active: $route.path === item.path }"
        >
          {{ item.name }}
        </router-link>
      </nav>
      <!-- 右侧功能区 -->
      <div class="nav-action">
        <div class="search-box" :class="{ active: showSearch }">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            v-model="searchText"
            @focus="handleSearchFocus"
            @blur="handleSearchBlur"
            @keyup.enter="handleSearchEnter"
            @input="debouncedSearch"
            placeholder="搜索海外矿业政策、矿区合规风险、跨境矿产贸易法规"
          />
          <button v-if="searchText" class="clear-btn" @click="clearSearch">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="user-box">
          <span>平台管理员</span>
        </div>
      </div>

      <!-- 搜索结果下拉面板 -->
      <Transition name="search-dropdown">
        <div v-if="showSearch && searchResults.length > 0" class="search-dropdown">
          <div class="dropdown-header">
            <span class="result-count">找到 {{ searchResults.length }} 个结果</span>
          </div>
          <div class="dropdown-content">
            <div
              v-for="(item, idx) in searchResults"
              :key="idx"
              class="result-item"
              :class="item.type"
              @click="handleResultClick(item)"
            >
              <svg class="result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path v-if="item.type === 'doc'" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline v-if="item.type === 'doc'" points="14 2 14 8 20 8"/>
                <circle v-if="item.type === 'keyword'" cx="12" cy="12" r="10"/>
                <circle v-if="item.type === 'country'" cx="12" cy="12" r="10"/>
                <line v-if="item.type === 'country'" x1="2" y1="12" x2="22" y2="12"/>
              </svg>
              <div class="result-info">
                <span class="result-title">{{ item.title }}</span>
                <span class="result-desc">{{ item.desc }}</span>
              </div>
              <span class="result-tag">{{ item.tag }}</span>
            </div>
          </div>
          <div v-if="searchResults.length >= 6" class="dropdown-footer">
            <button @click="goToSearchPage">查看全部结果</button>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { complianceDocs, keywordList } from '@/data/complianceDocs'

const router = useRouter()
const searchText = ref('')
const showSearch = ref(false)
const searchResults = ref([])
let debounceTimer = null

const menuList = [
  { path: '/', name: '首页' },
  { path: '/library', name: '文本资料库' },
  { path: '/keywords', name: '关键词智能分析' },
  { path: '/analysis', name: '数据可视化看板' },
  { path: '/innovation', name: '智能合规中心' },
  { path: '/about', name: '项目平台介绍' }
]

// 全球国家数据（用于搜索）
const countryData = [
  { name: '中国', score: 72, riskLevel: '中风险', mainRisk: '数据跨境传输' },
  { name: '美国', score: 45, riskLevel: '高风险', mainRisk: '贸易制裁' },
  { name: '俄罗斯', score: 28, riskLevel: '极高风险', mainRisk: '全面制裁' },
  { name: '英国', score: 68, riskLevel: '中风险', mainRisk: '脱欧合规' },
  { name: '德国', score: 75, riskLevel: '低风险', mainRisk: 'ESG披露' },
  { name: '日本', score: 78, riskLevel: '低风险', mainRisk: '数据保护' },
  { name: '韩国', score: 76, riskLevel: '低风险', mainRisk: '出口管制' },
  { name: '印度', score: 58, riskLevel: '中风险', mainRisk: '外资审查' },
  { name: '新加坡', score: 85, riskLevel: '低风险', mainRisk: '反洗钱' },
  { name: '阿联酋', score: 65, riskLevel: '中风险', mainRisk: '反洗钱' },
  { name: '土耳其', score: 48, riskLevel: '高风险', mainRisk: '金融管制' },
  { name: '澳大利亚', score: 80, riskLevel: '低风险', mainRisk: '外资审查' }
]

// 防抖搜索
function debouncedSearch() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    performSearch()
  }, 300)
}

// 执行搜索
function performSearch() {
  const query = searchText.value.trim().toLowerCase()
  if (!query) {
    searchResults.value = []
    return
  }

  const results = []

  // 搜索文档
  complianceDocs.forEach(doc => {
    const match =
      doc.title.toLowerCase().includes(query) ||
      doc.type.toLowerCase().includes(query) ||
      doc.tags.some(tag => tag.toLowerCase().includes(query)) ||
      (doc.keywords && doc.keywords.join('').toLowerCase().includes(query)) ||
      doc.content.toLowerCase().includes(query)
    
    if (match && results.length < 6) {
      results.push({
        type: 'doc',
        title: doc.title,
        desc: doc.content.slice(0, 60) + '...',
        tag: doc.type,
        url: '/library',
        data: doc
      })
    }
  })

  // 搜索关键词
  keywordList.forEach(keyword => {
    if (keyword.name.toLowerCase().includes(query) && results.length < 6) {
      results.push({
        type: 'keyword',
        title: keyword.name,
        desc: `热度值：${keyword.value}`,
        tag: '关键词',
        url: '/keywords',
        data: keyword
      })
    }
  })

  // 搜索国家
  countryData.forEach(country => {
    if (country.name.toLowerCase().includes(query) && results.length < 6) {
      results.push({
        type: 'country',
        title: country.name,
        desc: `${country.riskLevel} · ${country.mainRisk}`,
        tag: '国家风险',
        url: '/innovation',
        data: country
      })
    }
  })

  searchResults.value = results
}

// 搜索框聚焦
function handleSearchFocus() {
  showSearch.value = true
}

// 搜索框失焦（延迟关闭）
function handleSearchBlur() {
  setTimeout(() => {
    showSearch.value = false
  }, 200)
}

// 回车搜索
function handleSearchEnter() {
  if (searchResults.value.length > 0) {
    handleResultClick(searchResults.value[0])
  } else if (searchText.value.trim()) {
    goToSearchPage()
  }
}

// 点击搜索结果
function handleResultClick(item) {
  router.push(item.url)
  searchText.value = ''
  searchResults.value = []
  showSearch.value = false
}

// 清空搜索
function clearSearch() {
  searchText.value = ''
  searchResults.value = []
}

// 跳转到搜索结果页
function goToSearchPage() {
  router.push('/library')
  searchText.value = ''
  searchResults.value = []
  showSearch.value = false
}

// 点击外部关闭搜索
function handleClickOutside(e) {
  const searchBox = document.querySelector('.search-box')
  const dropdown = document.querySelector('.search-dropdown')
  if (searchBox && !searchBox.contains(e.target) && dropdown && !dropdown.contains(e.target)) {
    showSearch.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>

<style scoped lang="scss">
.global-nav {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  max-width: 1440px;
  z-index: 999;
  padding: 14px 24px;
  transition: none !important;
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.nav-logo h2 {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-light);
  letter-spacing: 0.5px;
}
.nav-menu {
  display: flex;
  gap: 40px;
  .menu-item {
    color: var(--text-gray);
    font-size: 15px;
    padding: 4px 0;
    transition: color 0.2s ease !important;
    min-width: max-content;
    &:hover {
      color: var(--primary-light);
    }
    &.active {
      color: var(--primary-light);
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--primary);
        border-radius: 2px;
        transition: none;
      }
    }
  }
}
.nav-action {
  display: flex;
  align-items: center;
  gap: 20px;
  .search-box {
    position: relative;
    display: flex;
    align-items: center;
    width: 240px;

    .search-icon {
      position: absolute;
      left: 12px;
      width: 16px;
      height: 16px;
      color: var(--text-dark-gray);
      pointer-events: none;
    }

    input {
      width: 100%;
      background: rgba(255,255,255,0.08);
      border: 1px solid var(--glass-border);
      border-radius: 999px;
      padding: 8px 16px 8px 36px;
      color: #fff;
      outline: none;
      font-size: 14px;
      transition: all 0.2s ease;

      &::placeholder {
        color: var(--text-dark-gray);
      }
      &:focus {
        border-color: var(--primary);
        box-shadow: 0 0 8px rgba(54,195,255,0.2);
        width: 320px;
      }
    }

    .clear-btn {
      position: absolute;
      right: 12px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-gray);
      transition: color 0.2s ease;

      svg {
        width: 14px;
        height: 14px;
      }

      &:hover {
        color: #fff;
      }
    }
  }
  .user-box {
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid var(--glass-border);
    color: var(--text-gray);
    font-size: 14px;
    transition: border-color 0.2s ease;
    &:hover {
      border-color: var(--primary);
    }
  }
}

/* 搜索下拉面板 */
.search-dropdown {
  position: absolute;
  top: 100%;
  right: 16px;
  margin-top: 12px;
  width: 420px;
  background: rgba(10, 18, 32, 0.98);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  z-index: 1000;

  .dropdown-header {
    padding: 12px 16px;
    border-bottom: 1px solid var(--glass-border);

    .result-count {
      font-size: 12px;
      color: var(--text-gray);
    }
  }

  .dropdown-content {
    max-height: 320px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--glass-border);
      border-radius: 3px;
    }
  }

  .result-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(54, 195, 255, 0.1);
    }

    .result-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 16px;
        height: 16px;
      }

      &.doc {
        background: rgba(137, 224, 255, 0.2);
        color: var(--primary-light);
      }

      &.keyword {
        background: rgba(52, 211, 153, 0.2);
        color: #34d399;
      }

      &.country {
        background: rgba(251, 191, 36, 0.2);
        color: #fbbf24;
      }
    }

    .result-info {
      flex: 1;
      min-width: 0;

      .result-title {
        display: block;
        font-size: 14px;
        color: var(--text-white);
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .result-desc {
        display: block;
        font-size: 12px;
        color: var(--text-gray);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .result-tag {
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      white-space: nowrap;

      &.doc {
        background: rgba(137, 224, 255, 0.2);
        color: var(--primary-light);
      }

      &.keyword {
        background: rgba(52, 211, 153, 0.2);
        color: #34d399;
      }

      &.country {
        background: rgba(251, 191, 36, 0.2);
        color: #fbbf24;
      }
    }
  }

  .dropdown-footer {
    padding: 12px;
    border-top: 1px solid var(--glass-border);
    text-align: center;

    button {
      padding: 8px 24px;
      background: rgba(54, 195, 255, 0.1);
      border: 1px solid rgba(54, 195, 255, 0.3);
      border-radius: 8px;
      color: var(--primary-light);
      font-size: 13px;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(54, 195, 255, 0.2);
        border-color: var(--primary);
      }
    }
  }
}

/* 下拉动画 */
.search-dropdown-enter-active,
.search-dropdown-leave-active {
  transition: all 0.2s ease;
}
.search-dropdown-enter-from,
.search-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
