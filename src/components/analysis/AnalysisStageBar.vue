<template>
  <div class="bar-card glass-card">
    <h3>月度合规文档新增趋势</h3>
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
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['1月','2月','3月','4月','5月','6月'],
      axisLine: { lineStyle: { color: '#223348' } },
      splitLine: { lineStyle: { color: '#1a2738' } }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#223348' } }
    },
    series: [
      {
        name: '新增文档数',
        type: 'bar',
        data: [12,18,26,22,30,18],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,[
            {offset:0,color:'#36c3ff'},
            {offset:1,color:'#0ea5e9'}
          ])
        }
      }
    ]
  }
  chartIns.setOption(option)
}

onMounted(() => renderChart())
</script>

<style scoped lang="scss">
.bar-card {
  padding: 24px;
  h3 {
    margin-bottom: 20px;
    font-size: 20px;
    color: var(--text-white);
  }
}
</style>