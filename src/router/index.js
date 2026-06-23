import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/library',
    name: '文本资料库',
    component: () => import('@/views/Library.vue')
  },
  {
    path: '/keywords',
    name: '关键词智能分析',
    component: () => import('@/views/Keywords.vue')
  },
  {
    path: '/analysis',
    name: '数据可视化看板',
    component: () => import('@/views/Analysis.vue')
  },
  {
    path: '/about',
    name: '项目平台介绍',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/innovation',
    name: '智能合规中心',
    component: () => import('@/views/Innovation.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router