<template>
  <div class="globe-container glass-card">
    <div class="globe-header">
      <h3>全球合规风险热力图</h3>
      <div class="legend">
        <span class="legend-item low"><i></i>低风险</span>
        <span class="legend-item medium"><i></i>中风险</span>
        <span class="legend-item high"><i></i>高风险</span>
        <span class="legend-item critical"><i></i>极高风险</span>
      </div>
    </div>

    <div ref="globeRef" class="globe-chart"></div>

    <div class="country-info" v-if="selectedCountry">
      <div class="country-header">
        <h4>{{ selectedCountry.name }}</h4>
        <span :class="['risk-badge', selectedCountry.riskLevel]">
          {{ selectedCountry.riskLabel }}
        </span>
      </div>
      <div class="country-details">
        <div class="detail-item">
          <span class="label">合规指数</span>
          <span class="value">{{ selectedCountry.score }}</span>
        </div>
        <div class="detail-item">
          <span class="label">主要风险</span>
          <span class="value">{{ selectedCountry.mainRisk }}</span>
        </div>
        <div class="detail-item">
          <span class="label">监管强度</span>
          <div class="progress-bar">
            <div class="progress" :style="{ width: selectedCountry.regulation + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-value">{{ stats.totalCountries }}</span>
        <span class="stat-label">监管国家</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ stats.highRisk }}</span>
        <span class="stat-label">高风险地区</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ stats.sanctions }}</span>
        <span class="stat-label">制裁名单</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ stats.updates }}</span>
        <span class="stat-label">本月更新</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, nextTick } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'

const globeRef = ref(null)
const selectedCountry = ref(null)
let chartInstance = null

const stats = reactive({
  totalCountries: 186,
  highRisk: 23,
  sanctions: 1542,
  updates: 47
})

// 全球合规风险数据
const countryData = [
  { name: '中国', coord: [116.4, 39.9], score: 72, riskLevel: 'medium', riskLabel: '中风险', mainRisk: '数据跨境传输', regulation: 85 },
  { name: '美国', coord: [-95.7, 37.1], score: 45, riskLevel: 'high', riskLabel: '高风险', mainRisk: '贸易制裁', regulation: 92 },
  { name: '俄罗斯', coord: [105.3, 61.5], score: 28, riskLevel: 'critical', riskLabel: '极高风险', mainRisk: '全面制裁', regulation: 95 },
  { name: '英国', coord: [-0.1, 51.5], score: 68, riskLevel: 'medium', riskLabel: '中风险', mainRisk: '脱欧合规', regulation: 78 },
  { name: '德国', coord: [10.4, 51.2], score: 75, riskLevel: 'low', riskLabel: '低风险', mainRisk: 'ESG披露', regulation: 72 },
  { name: '法国', coord: [2.3, 48.9], score: 73, riskLevel: 'low', riskLabel: '低风险', mainRisk: '数字税', regulation: 70 },
  { name: '日本', coord: [139.7, 35.7], score: 78, riskLevel: 'low', riskLabel: '低风险', mainRisk: '数据保护', regulation: 65 },
  { name: '韩国', coord: [127.0, 37.6], score: 76, riskLevel: 'low', riskLabel: '低风险', mainRisk: '出口管制', regulation: 68 },
  { name: '印度', coord: [77.2, 28.6], score: 58, riskLevel: 'medium', riskLabel: '中风险', mainRisk: '外资审查', regulation: 75 },
  { name: '巴西', coord: [-47.9, -15.8], score: 62, riskLevel: 'medium', riskLabel: '中风险', mainRisk: '税务合规', regulation: 60 },
  { name: '伊朗', coord: [53.7, 32.4], score: 15, riskLevel: 'critical', riskLabel: '极高风险', mainRisk: '全面制裁', regulation: 98 },
  { name: '朝鲜', coord: [127.0, 40.3], score: 8, riskLevel: 'critical', riskLabel: '极高风险', mainRisk: '全面制裁', regulation: 99 },
  { name: '新加坡', coord: [103.8, 1.4], score: 85, riskLevel: 'low', riskLabel: '低风险', mainRisk: '反洗钱', regulation: 55 },
  { name: '香港', coord: [114.2, 22.3], score: 70, riskLevel: 'medium', riskLabel: '中风险', mainRisk: '制裁关联', regulation: 80 },
  { name: '阿联酋', coord: [54.4, 24.5], score: 65, riskLevel: 'medium', riskLabel: '中风险', mainRisk: '反洗钱', regulation: 70 },
  { name: '沙特', coord: [46.7, 24.7], score: 60, riskLevel: 'medium', riskLabel: '中风险', mainRisk: '本地化要求', regulation: 72 },
  { name: '南非', coord: [28.0, -26.2], score: 55, riskLevel: 'medium', riskLabel: '中风险', mainRisk: 'BEE合规', regulation: 65 },
  { name: '澳大利亚', coord: [133.8, -25.3], score: 80, riskLevel: 'low', riskLabel: '低风险', mainRisk: '外资审查', regulation: 58 },
  { name: '加拿大', coord: [-106.3, 56.1], score: 77, riskLevel: 'low', riskLabel: '低风险', mainRisk: '数据保护', regulation: 62 },
  { name: '墨西哥', coord: [-102.5, 23.6], score: 52, riskLevel: 'medium', riskLabel: '中风险', mainRisk: '劳工标准', regulation: 68 },
  { name: '越南', coord: [108.3, 14.1], score: 63, riskLevel: 'medium', riskLabel: '中风险', mainRisk: '劳工合规', regulation: 55 },
  { name: '泰国', coord: [100.5, 13.8], score: 67, riskLevel: 'medium', riskLabel: '中风险', mainRisk: '外资限制', regulation: 60 },
  { name: '印尼', coord: [120.0, -0.8], score: 58, riskLevel: 'medium', riskLabel: '中风险', mainRisk: '本地化要求', regulation: 65 },
  { name: '土耳其', coord: [35.2, 39.0], score: 48, riskLevel: 'high', riskLabel: '高风险', mainRisk: '金融管制', regulation: 78 },
  { name: '阿根廷', coord: [-63.6, -38.4], score: 45, riskLevel: 'high', riskLabel: '高风险', mainRisk: '外汇管制', regulation: 82 },
  { name: '尼日利亚', coord: [8.7, 9.1], score: 42, riskLevel: 'high', riskLabel: '高风险', mainRisk: '反腐败', regulation: 75 },
  { name: '埃及', coord: [30.0, 26.8], score: 50, riskLevel: 'medium', riskLabel: '中风险', mainRisk: '外汇管制', regulation: 70 },
  { name: '波兰', coord: [19.1, 51.9], score: 71, riskLevel: 'low', riskLabel: '低风险', mainRisk: '数据保护', regulation: 68 },
  { name: '瑞士', coord: [8.2, 46.8], score: 88, riskLevel: 'low', riskLabel: '低风险', mainRisk: '银行保密', regulation: 45 },
  { name: '荷兰', coord: [5.3, 52.1], score: 82, riskLevel: 'low', riskLabel: '低风险', mainRisk: '税务透明', regulation: 52 }
]

// 获取风险等级对应的颜色
function getRiskColor(riskLevel) {
  const colors = {
    low: '#34d399',
    medium: '#fbbf24',
    high: '#f87171',
    critical: '#dc2626'
  }
  return colors[riskLevel] || colors.medium
}

// 获取散点大小
function getScatterSize(score) {
  return Math.max(8, Math.min(25, (100 - score) / 4 + 8))
}

// 初始化图表
function initChart() {
  if (!globeRef.value) return

  chartInstance = echarts.init(globeRef.value)

  const scatterData = countryData.map(item => ({
    name: item.name,
    value: [...item.coord, item.score],
    itemStyle: {
      color: getRiskColor(item.riskLevel)
    },
    symbolSize: getScatterSize(item.score),
    data: item
  }))

  const option = {
    backgroundColor: 'transparent',
    globe: {
      baseTexture: null,
      shading: 'color',
      environment: null,
      atmosphere: {
        show: true,
        offset: 5,
        color: '#36c3ff',
        glowPower: 3
      },
      light: {
        ambient: {
          intensity: 0.8
        },
        main: {
          intensity: 0.5
        }
      },
      viewControl: {
        autoRotate: true,
        autoRotateSpeed: 3,
        autoRotateAfterStill: 3,
        distance: 200,
        alpha: 40,
        beta: 0,
        minAlpha: 5,
        maxAlpha: 90
      },
      globeRadius: 100,
      itemStyle: {
        color: '#0a1628',
        borderWidth: 0.5,
        borderColor: '#1a3a5c'
      }
    },
    series: [
      // 地球表面网格
      {
        type: 'scatter3D',
        coordinateSystem: 'globe',
        data: [],
        itemStyle: {
          color: 'transparent'
        }
      },
      // 风险热力点
      {
        type: 'scatter3D',
        coordinateSystem: 'globe',
        data: scatterData,
        itemStyle: {
          opacity: 0.9
        },
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            opacity: 1,
            borderWidth: 2,
            borderColor: '#fff'
          }
        }
      },
      // 连接线（示例：主要贸易路线）
      {
        type: 'lines3D',
        coordinateSystem: 'globe',
        data: [
          { coords: [[116.4, 39.9], [-95.7, 37.1]] },  // 中美
          { coords: [[116.4, 39.9], [139.7, 35.7]] },  // 中日
          { coords: [[116.4, 39.9], [103.8, 1.4]] },   // 中新
          { coords: [[-95.7, 37.1], [2.3, 48.9]] },    // 美法
          { coords: [[-95.7, 37.1], [139.7, 35.7]] },  // 美日
          { coords: [[10.4, 51.2], [116.4, 39.9]] },   // 德中
        ],
        lineStyle: {
          color: '#36c3ff',
          width: 1,
          opacity: 0.3
        },
        effect: {
          show: true,
          trailWidth: 2,
          trailLength: 0.15,
          trailOpacity: 0.6,
          trailColor: '#89e0ff'
        }
      }
    ]
  }

  chartInstance.setOption(option)

  // 点击事件
  chartInstance.on('click', function(params) {
    if (params.data && params.data.data) {
      selectedCountry.value = params.data.data
    }
  })

  // 响应式
  window.addEventListener('resize', handleResize)
}

function handleResize() {
  chartInstance && chartInstance.resize()
}

onMounted(async () => {
  await nextTick()
  // 确保 DOM 有正确的尺寸
  setTimeout(() => {
    initChart()
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance && chartInstance.dispose()
})
</script>

<style scoped lang="scss">
.globe-container {
  padding: 24px;
  height: 600px;
  display: flex;
  flex-direction: column;
}

.globe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h3 {
    font-size: 20px;
    color: var(--text-white);
  }

  .legend {
    display: flex;
    gap: 16px;

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--text-gray);

      i {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      &.low i { background: #34d399; }
      &.medium i { background: #fbbf24; }
      &.high i { background: #f87171; }
      &.critical i { background: #dc2626; }
    }
  }
}

.globe-chart {
  flex: 1;
  min-height: 350px;
}

.country-info {
  position: absolute;
  top: 100px;
  right: 40px;
  width: 220px;
  background: rgba(10, 18, 32, 0.95);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(10px);

  .country-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    h4 {
      font-size: 16px;
      color: var(--text-white);
    }

    .risk-badge {
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;

      &.low { background: rgba(52, 211, 153, 0.2); color: #34d399; }
      &.medium { background: rgba(251, 191, 36, 0.2); color: #fbbf24; }
      &.high { background: rgba(248, 113, 113, 0.2); color: #f87171; }
      &.critical { background: rgba(220, 38, 38, 0.2); color: #dc2626; }
    }
  }

  .country-details {
    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid rgba(110, 190, 255, 0.1);

      &:last-child {
        border-bottom: none;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .label {
        font-size: 12px;
        color: var(--text-gray);
      }

      .value {
        font-size: 14px;
        color: var(--text-white);
        font-weight: 500;
      }

      .progress-bar {
        width: 100%;
        height: 6px;
        background: rgba(110, 190, 255, 0.1);
        border-radius: 3px;
        overflow: hidden;

        .progress {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--primary-light));
          border-radius: 3px;
          transition: width 0.3s ease;
        }
      }
    }
  }
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--glass-border);

  .stat-item {
    text-align: center;

    .stat-value {
      display: block;
      font-size: 24px;
      font-weight: 700;
      color: var(--primary-light);
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 12px;
      color: var(--text-gray);
    }
  }
}
</style>
