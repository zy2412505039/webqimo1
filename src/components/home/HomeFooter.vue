<template>
  <footer class="home-footer">
    <div class="container footer-inner">
      <div class="footer-left">
        <h3>全球跨境数字风控平台</h3>
        <p>一站式跨境合规文本采集、NLP智能解析、数据可视化分析系统</p>
        <div class="contact">
          <p>平台服务：跨境企业合规数据支撑</p>
          <p>技术支持：ZIJINZIJIN 研发团队</p>
        </div>
      </div>
      <div class="footer-center">
        <h4>快速导航</h4>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/library">文本资料库</router-link></li>
          <li><router-link to="/keywords">关键词分析</router-link></li>
          <li><router-link to="/analysis">数据可视化</router-link></li>
          <li><router-link to="/about">项目介绍</router-link></li>
        </ul>
      </div>
      <div class="footer-right">
        <p class="copyright">© 2026 ZIJINZIJIN All Rights Reserved</p>
        <p class="tip">本平台仅用于跨境合规数据研究演示</p>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped lang="scss">
.home-footer {
  margin-top: 80px;
  padding: 40px 0;
  border-top: 1px solid var(--glass-border);
  .footer-inner {
    display: grid;
    grid-template-columns: 1fr 180px 1fr;
    gap: 40px;
  }
  .footer-left h3 {
    color: var(--primary-light);
    margin-bottom: 10px;
    font-size: 20px;
  }
  .footer-left p {
    color: var(--text-gray);
    line-height: 1.7;
    margin-bottom: 12px;
  }
  .contact {
    margin-top: 16px;
    p {
      font-size: 14px;
      color: var(--text-dark-gray);
    }
  }
  .footer-center h4 {
    margin-bottom: 16px;
    color: var(--text-white);
  }
  .footer-center li {
    margin-bottom: 10px;
    a {
      color: var(--text-gray);
      transition: var(--transition-all);
      &:hover {
        color: var(--primary);
      }
    }
  }
  .footer-right {
    text-align: right;
    .copyright {
      color: var(--text-gray);
      margin-bottom: 8px;
    }
    .tip {
      font-size: 13px;
      color: var(--text-dark-gray);
    }
  }
}
</style>