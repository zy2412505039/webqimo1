<template>
  <div class="radar-card glass-card">
    <h3>跨境合规多维度风险雷达</h3>
    <div ref="chartRef" style="width:100%;height:340px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartIns = null

const renderChart = () => {
  chartIns = echarts.init(chartRef.value)
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: 'rgba(10,18,32,0.9)',
      textStyle: { color: '#fff' }
    },
    radar: {
      indicator: [
        { name: '外汇资金风险', max: 100 },
        { name: '贸易制裁风险', max: 100 },
        { name: 'ESG披露风险', max: 100 },
        { name: '海外税务风险', max: 100 },
        { name: '数据合规风险', max: 100 },
        { name: '外资审查风险', max: 100 }
      ],
      radius: '70%',
      axisLine: { lineStyle: { color: '#223348' } }
    },
    series: [
      {
        type: 'radar',
        data: [
          { value: [72,88,65,58,79,62], name: '当前风险指数' }
        ],
        areaStyle: { opacity:0.2, color:'#36c3ff' }
      }
    ]
  }
  chartIns.setOption(option)
}

onMounted(() => renderChart())
</script>

<style scoped lang="scss">
.radar-card {
  padding: 24px;
  h3 {
    margin-bottom: 20px;
    font-size: 20px;
    color: var(--text-white);
  }
}
</style>