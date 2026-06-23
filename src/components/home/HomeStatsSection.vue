<template>
  <div class="stats-wrap">
    <div class="section-head">
      <h2>数据智能全景概览</h2>
      <p>基于已采集的全球公开文本，提取合规主题、风险等级、关键词，形成企业跨境经营数据底座</p>
    </div>
    <div class="stats-grid">
      <div class="stat-card glass-card" v-for="item in statsArr" :key="item.key">
        <div class="card-top">
          <span class="card-label">{{ item.label }}</span>
          <span class="card-en">{{ item.enLabel }}</span>
        </div>
        <div class="card-num">{{ item.num }}</div>
        <div class="card-desc">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { statsData } from '@/data/complianceDocs'
// 统计卡片渲染数组
const statsArr = [
  {
    key: "totalDocs",
    label: "已整理合规文档总数",
    enLabel: "TOTAL MANAGED TEXTS",
    num: statsData.totalDocs,
    desc: "汇集全球自贸政策、企业公告、海外运营风险资料语料库"
  },
  {
    key: "policyCount",
    label: "政策法规文献",
    enLabel: "POLICY DOCUMENTS",
    num: statsData.policyCount,
    desc: "覆盖东南亚、欧盟、中东各国跨境监管新规"
  },
  {
    key: "industryNews",
    label: "行业企业动态",
    enLabel: "INDUSTRY NEWS",
    num: statsData.industryNews,
    desc: "全球企业跨境投资、贸易业务实时更新"
  },
  {
    key: "companyAnnounce",
    label: "上市企业公告",
    enLabel: "CORPORATE ANNOUNCEMENTS",
    num: statsData.companyAnnounce,
    desc: "外资企业海外经营合规披露文件"
  },
  {
    key: "coreKeywords",
    label: "AI提取合规关键词",
    enLabel: "COMPLIANCE KEYWORDS",
    num: statsData.coreKeywords,
    desc: "智能NLP抽取跨境风控核心业务词汇"
  },
  {
    key: "riskAlert",
    label: "高合规风险预警",
    enLabel: "RISK ALERTS",
    num: statsData.riskAlert,
    desc: "需要重点关注的跨境经营高风险条款"
  }
]
</script>

<style scoped lang="scss">
.stats-wrap {
  .section-head {
    text-align: center;
    margin-bottom: 48px;
    h2 {
      font-size: 32px;
      margin-bottom: 12px;
    }
    p {
      width: 60%;
      margin: 0 auto;
      color: var(--text-gray);
      line-height: 1.7;
    }
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .stat-card {
    padding: 28px;
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      .card-label {
        font-size: 15px;
        color: var(--text-gray);
      }
      .card-en {
        font-size: 12px;
        color: var(--text-dark-gray);
      }
    }
    .card-num {
      font-size: 52px;
      font-weight: 700;
      color: var(--primary-light);
      margin-bottom: 12px;
    }
    .card-desc {
      font-size: 14px;
      color: var(--text-gray);
      line-height: 1.6;
    }
  }
}
</style>