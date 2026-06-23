<template>
  <div class="visual-wrap">
    <div class="visual-left">
      <span class="tag">合规可视化引擎 | VISUALIZATION ENGINE</span>
      <h2>把合规文本转换成可读的业务风险判断</h2>
      <p class="desc">
        平台不只是静态展示资料，还会围绕地区、业务环节、风险等级和关键词做多维度关联，
        帮助企业运营人员快速读懂跨境合规文本之间的业务联系与潜在经营风险。
      </p>
      <ul class="feature-list">
        <li>
          <span class="check">✓</span>
          <div>
            <h4>智能关联索引</h4>
            <p>按国家、地区、业务环节建立全球合规文本深度索引</p>
          </div>
        </li>
        <li>
          <span class="check">✓</span>
          <div>
            <h4>核心实体抽取</h4>
            <p>精准提取高频风险关键词，自动形成智能化分类与合规要点</p>
          </div>
        </li>
        <li>
          <span class="check">✓</span>
          <div>
            <h4>多维直观洞察</h4>
            <p>图表化看板展示风险等级、资料类型、关键词热度分布</p>
          </div>
        </li>
      </ul>
      <router-link to="/analysis" class="btn-outline">探索可视化引擎 →</router-link>
    </div>
    <div class="visual-right glass-card">
      <img src="/images/dashboard-demo.png" alt="可视化看板演示" />
      <div class="live-tip">全球合规文献流式实时处理中... LIVE</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.visual-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  .visual-left {
    .tag {
      color: var(--primary);
      font-size: 14px;
      letter-spacing: 1px;
    }
    h2 {
      font-size: 42px;
      line-height: 1.3;
      margin: 16px 0 24px;
    }
    .desc {
      color: var(--text-gray);
      line-height: 1.8;
      margin-bottom: 32px;
    }
    .feature-list {
      margin-bottom: 40px;
      li {
        display: flex;
        gap: 14px;
        margin-bottom: 20px;
        .check {
          color: var(--success);
          font-size: 20px;
          margin-top: 2px;
        }
        h4 {
          margin-bottom: 6px;
          color: var(--text-white);
        }
        p {
          color: var(--text-gray);
          font-size: 14px;
        }
      }
    }
  }
  .visual-right {
    padding: 20px;
    position: relative;
    img {
      border-radius: var(--radius-md);
    }
    .live-tip {
      position: absolute;
      bottom: 24px;
      left: 24px;
      background: rgba(0,0,0,0.6);
      padding: 8px 16px;
      border-radius: 999px;
      font-size: 13px;
      color: var(--primary-light);
    }
  }
}
</style>