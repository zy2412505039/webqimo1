<template>
  <div class="score-system glass-card">
    <div class="score-header">
      <h3>企业合规健康评分</h3>
      <button class="refresh-btn" @click="refreshScore">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M23 4v6h-6M1 20v-6h6"/>
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
        </svg>
        重新评估
      </button>
    </div>

    <div class="score-main">
      <div class="score-gauge" ref="gaugeRef"></div>
      <div class="score-info">
        <div class="score-number" :class="scoreLevel">
          <span class="value">{{ animatedScore }}</span>
          <span class="unit">分</span>
        </div>
        <div class="score-level" :class="scoreLevel">{{ scoreLabel }}</div>
        <div class="score-desc">{{ scoreDesc }}</div>
      </div>
    </div>

    <div class="dimension-scores">
      <div
        v-for="dim in dimensions"
        :key="dim.name"
        class="dimension-item"
        @mouseenter="highlightDimension(dim)"
        @mouseleave="unhighlightDimension"
      >
        <div class="dim-header">
          <span class="dim-icon" :style="{ background: dim.color }">
            <component :is="dim.icon" />
          </span>
          <span class="dim-name">{{ dim.name }}</span>
          <span class="dim-score" :style="{ color: dim.color }">{{ dim.score }}分</span>
        </div>
        <div class="dim-progress">
          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: dim.score + '%', background: dim.color }"
            ></div>
          </div>
        </div>
        <div class="dim-status">
          <span :class="['status-dot', dim.status]"></span>
          {{ dim.statusText }}
        </div>
      </div>
    </div>

    <div class="recommendations">
      <h4>改进建议</h4>
      <div class="rec-list">
        <div
          v-for="(rec, idx) in recommendations"
          :key="idx"
          class="rec-item"
          :class="rec.priority"
        >
          <span class="rec-priority">{{ rec.priorityLabel }}</span>
          <span class="rec-text">{{ rec.text }}</span>
        </div>
      </div>
    </div>

    <div class="score-history">
      <h4>评分趋势</h4>
      <div ref="historyChartRef" class="history-chart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, shallowRef, h, nextTick } from 'vue'
import * as echarts from 'echarts'

const gaugeRef = ref(null)
const historyChartRef = ref(null)
const totalScore = ref(72)
const animatedScore = ref(0)
let gaugeChart = null
let historyChart = null

// 评分维度
const dimensions = ref([
  {
    name: '外汇合规',
    score: 78,
    color: '#34d399',
    status: 'good',
    statusText: '良好',
    icon: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { d: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' })
    ])
  },
  {
    name: '贸易合规',
    score: 65,
    color: '#fbbf24',
    status: 'warning',
    statusText: '需关注',
    icon: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('rect', { x: '1', y: '3', width: '15', height: '13' }),
      h('polygon', { points: '16 8 20 8 23 11 23 16 16 16 16 8' }),
      h('circle', { cx: '5.5', cy: '18.5', r: '2.5' }),
      h('circle', { cx: '18.5', cy: '18.5', r: '2.5' })
    ])
  },
  {
    name: '数据合规',
    score: 58,
    color: '#f87171',
    status: 'danger',
    statusText: '需改进',
    icon: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { d: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z' }),
      h('polyline', { points: '3.27 6.96 12 12.01 20.73 6.96' }),
      h('line', { x1: '12', y1: '22.08', x2: '12', y2: '12' })
    ])
  },
  {
    name: 'ESG合规',
    score: 82,
    color: '#36c3ff',
    status: 'good',
    statusText: '优秀',
    icon: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })
    ])
  },
  {
    name: '税务合规',
    score: 70,
    color: '#a78bfa',
    status: 'good',
    statusText: '良好',
    icon: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('line', { x1: '12', y1: '1', x2: '12', y2: '23' }),
      h('path', { d: 'M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' })
    ])
  },
  {
    name: '反洗钱',
    score: 75,
    color: '#fb7185',
    status: 'good',
    statusText: '良好',
    icon: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('path', { d: 'M12 6v6l4 2' })
    ])
  }
])

// 改进建议
const recommendations = computed(() => {
  const recs = []

  // 根据维度分数生成建议
  const dataDim = dimensions.value.find(d => d.name === '数据合规')
  if (dataDim && dataDim.score < 70) {
    recs.push({
      priority: 'high',
      priorityLabel: '紧急',
      text: '完善数据跨境传输安全评估，建立数据分类分级制度'
    })
  }

  const tradeDim = dimensions.value.find(d => d.name === '贸易合规')
  if (tradeDim && tradeDim.score < 70) {
    recs.push({
      priority: 'medium',
      priorityLabel: '重要',
      text: '加强出口管制物项识别，更新制裁名单筛查系统'
    })
  }

  recs.push(
    {
      priority: 'low',
      priorityLabel: '建议',
      text: '定期开展合规培训，提升全员合规意识'
    },
    {
      priority: 'low',
      priorityLabel: '建议',
      text: '建立合规风险预警机制，实现风险早发现早处置'
    }
  )

  return recs
})

// 评分等级
const scoreLevel = computed(() => {
  if (totalScore.value >= 80) return 'excellent'
  if (totalScore.value >= 70) return 'good'
  if (totalScore.value >= 60) return 'warning'
  return 'danger'
})

const scoreLabel = computed(() => {
  const labels = {
    excellent: '优秀',
    good: '良好',
    warning: '需关注',
    danger: '需改进'
  }
  return labels[scoreLevel.value]
})

const scoreDesc = computed(() => {
  const descs = {
    excellent: '合规管理体系完善，风险控制能力强',
    good: '合规状况总体良好，部分领域可进一步优化',
    warning: '存在一定合规风险，建议加强相关领域管理',
    danger: '合规风险较高，需立即采取整改措施'
  }
  return descs[scoreLevel.value]
})

// 动画数字
function animateScore(target) {
  const duration = 1500
  const start = animatedScore.value
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = 1 - Math.pow(1 - progress, 3)
    animatedScore.value = Math.round(start + (target - start) * easeProgress)

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

// 初始化仪表盘
function initGauge() {
  if (!gaugeRef.value) return

  gaugeChart = echarts.init(gaugeRef.value)

  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        splitNumber: 10,
        radius: '100%',
        center: ['50%', '60%'],
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [0.6, '#f87171'],
              [0.7, '#fbbf24'],
              [0.8, '#34d399'],
              [1, '#36c3ff']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: '#36c3ff'
          },
          length: '60%',
          width: 6
        },
        axisTick: {
          distance: -25,
          length: 6,
          lineStyle: {
            color: 'rgba(255,255,255,0.3)',
            width: 1
          }
        },
        splitLine: {
          distance: -30,
          length: 12,
          lineStyle: {
            color: 'rgba(255,255,255,0.5)',
            width: 2
          }
        },
        axisLabel: {
          color: 'rgba(255,255,255,0.5)',
          distance: 35,
          fontSize: 10
        },
        detail: {
          show: false
        },
        data: [{ value: totalScore.value }]
      }
    ]
  }

  gaugeChart.setOption(option)
}

// 初始化历史趋势图
function initHistoryChart() {
  if (!historyChartRef.value) return

  historyChart = echarts.init(historyChartRef.value)

  const option = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
      axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      min: 50,
      max: 100,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10 }
    },
    series: [
      {
        type: 'line',
        data: [65, 68, 70, 69, 71, 72],
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: '#36c3ff',
          width: 3
        },
        itemStyle: {
          color: '#36c3ff',
          borderWidth: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(54, 195, 255, 0.3)' },
            { offset: 1, color: 'rgba(54, 195, 255, 0)' }
          ])
        }
      }
    ]
  }

  historyChart.setOption(option)
}

// 重新评估
function refreshScore() {
  // 模拟重新计算
  dimensions.value.forEach(dim => {
    dim.score = Math.max(50, Math.min(95, dim.score + Math.floor(Math.random() * 10 - 5)))
    if (dim.score >= 75) {
      dim.status = 'good'
      dim.statusText = '良好'
    } else if (dim.score >= 60) {
      dim.status = 'warning'
      dim.statusText = '需关注'
    } else {
      dim.status = 'danger'
      dim.statusText = '需改进'
    }
  })

  const newTotal = Math.round(dimensions.value.reduce((sum, d) => sum + d.score, 0) / dimensions.value.length)
  totalScore.value = newTotal

  animateScore(newTotal)

  // 更新仪表盘
  if (gaugeChart) {
    gaugeChart.setOption({
      series: [{ data: [{ value: newTotal }] }]
    })
  }
}

// 高亮维度
function highlightDimension(dim) {
  // 可以添加交互效果
}

function unhighlightDimension() {
  // 取消高亮
}

// 响应式
function handleResize() {
  gaugeChart && gaugeChart.resize()
  historyChart && historyChart.resize()
}

onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    initGauge()
    initHistoryChart()
    animateScore(totalScore.value)
  }, 100)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  gaugeChart && gaugeChart.dispose()
  historyChart && historyChart.dispose()
})
</script>

<style scoped lang="scss">
.score-system {
  padding: 24px;
}

.score-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h3 {
    font-size: 20px;
    color: var(--text-white);
  }

  .refresh-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: rgba(54, 195, 255, 0.1);
    border: 1px solid rgba(54, 195, 255, 0.2);
    border-radius: 8px;
    color: var(--primary-light);
    font-size: 13px;
    transition: all 0.2s ease;

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover {
      background: rgba(54, 195, 255, 0.2);
      border-color: var(--primary);
    }
  }
}

.score-main {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.score-gauge {
  width: 200px;
  height: 160px;
}

.score-info {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .score-number {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-bottom: 8px;

    .value {
      font-size: 56px;
      font-weight: 700;
      line-height: 1;
    }

    .unit {
      font-size: 18px;
      color: var(--text-gray);
    }

    &.excellent .value { color: #36c3ff; }
    &.good .value { color: #34d399; }
    &.warning .value { color: #fbbf24; }
    &.danger .value { color: #f87171; }
  }

  .score-level {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;

    &.excellent { color: #36c3ff; }
    &.good { color: #34d399; }
    &.warning { color: #fbbf24; }
    &.danger { color: #f87171; }
  }

  .score-desc {
    font-size: 13px;
    color: var(--text-gray);
    line-height: 1.6;
  }
}

.dimension-scores {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.dimension-item {
  background: rgba(18, 26, 42, 0.5);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
  }

  .dim-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;

    .dim-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 16px;
        height: 16px;
        color: #fff;
      }
    }

    .dim-name {
      flex: 1;
      font-size: 14px;
      color: var(--text-white);
    }

    .dim-score {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .dim-progress {
    margin-bottom: 8px;

    .progress-track {
      height: 6px;
      background: rgba(110, 190, 255, 0.1);
      border-radius: 3px;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.5s ease;
      }
    }
  }

  .dim-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-gray);

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;

      &.good { background: #34d399; }
      &.warning { background: #fbbf24; }
      &.danger { background: #f87171; }
    }
  }
}

.recommendations {
  margin-bottom: 32px;

  h4 {
    font-size: 16px;
    color: var(--text-white);
    margin-bottom: 16px;
  }

  .rec-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .rec-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: rgba(18, 26, 42, 0.5);
    border-radius: 8px;
    border-left: 3px solid;

    &.high { border-left-color: #f87171; }
    &.medium { border-left-color: #fbbf24; }
    &.low { border-left-color: #34d399; }

    .rec-priority {
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
    }

    &.high .rec-priority {
      background: rgba(248, 113, 113, 0.2);
      color: #f87171;
    }

    &.medium .rec-priority {
      background: rgba(251, 191, 36, 0.2);
      color: #fbbf24;
    }

    &.low .rec-priority {
      background: rgba(52, 211, 153, 0.2);
      color: #34d399;
    }

    .rec-text {
      font-size: 13px;
      color: var(--text-gray);
    }
  }
}

.score-history {
  h4 {
    font-size: 16px;
    color: var(--text-white);
    margin-bottom: 16px;
  }

  .history-chart {
    height: 150px;
  }
}
</style>
