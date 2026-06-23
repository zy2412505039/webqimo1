<template>
  <div class="gauge-card glass-card">
    <h3>整体跨境合规风险指数</h3>
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
    series: [
      {
        type: 'gauge',
        progress: { show:true, width:12 },
        axisLine: { lineStyle: { width:12, color:[[0.6,'#fbbf24'],[1,'#f87171']] } },
        axisTick: { show:false },
        splitLine: { length:15, lineStyle:{ width:2, color:'#94a3b8' } },
        axisLabel: { distance:25, fontSize:12, color:'#94a3b8' },
        anchor: { show:true, size:20, itemStyle:{ borderWidth:2 } },
        title: { show:false },
        detail: { fontSize:24, offsetCenter:[0,'70%'], color:'#fff' },
        data: [{ value: 62, name: '综合风险分' }]
      }
    ]
  }
  chartIns.setOption(option)
}

onMounted(() => renderChart())
</script>

<style scoped lang="scss">
.gauge-card {
  padding: 24px;
  h3 {
    margin-bottom: 20px;
    font-size: 20px;
    color: var(--text-white);
  }
}
</style>