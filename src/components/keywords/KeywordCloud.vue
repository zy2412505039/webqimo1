<template>
  <div class="cloud-wrap glass-card">
    <h3>关键词热度词云</h3>
    <div ref="chartRef" style="width:100%;height:420px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { keywordList } from '@/data/complianceDocs'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartIns = null

const renderChart = () => {
  chartIns = echarts.init(chartRef.value)
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 18, 32, 0.92)',
      textStyle: { color: '#fff' },
      formatter: '{b}<br/>热度值：{c}'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#223348' } },
      splitLine: { lineStyle: { color: '#1a2738' } }
    },
    yAxis: {
      type: 'category',
      data: keywordList.map(item => item.name),
      axisLine: { lineStyle: { color: '#223348' } }
    },
    series: [
      {
        name: '热度值',
        type: 'bar',
        data: keywordList.map(item => item.value),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(1,0,0,0,[
            {offset:0,color:'#0ea5e9'},
            {offset:1,color:'#36c3ff'}
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
.cloud-wrap {
  padding: 24px;
  h3 {
    margin-bottom: 20px;
    font-size: 22px;
    color: var(--text-white);
  }
}
</style>