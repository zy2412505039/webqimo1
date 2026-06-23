<template>
  <div class="pie-card glass-card">
    <h3>文档分类占比</h3>
    <div ref="chartRef" style="width:100%;height:340px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { complianceDocs } from '@/data/complianceDocs'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartIns = null

// 统计文档分类数量
const typeMap = {}
complianceDocs.forEach(item => {
  typeMap[item.type] = (typeMap[item.type] || 0) + 1
})
const pieData = Object.entries(typeMap).map(([name, value]) => ({ name, value }))

// 渲染图表
const renderChart = () => {
  if (!chartRef.value) return
  chartIns = echarts.init(chartRef.value)
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 18, 32, 0.9)',
      textStyle: { color: '#fff' },
      formatter: '{b}<br/>数量：{c}'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        data: pieData,
        itemStyle: {
          color: function (params) {
            const colorArr = ['#36c3ff','#34d399','#fbbf24','#f87171','#a78bfa','#fb7185']
            return colorArr[params.dataIndex % colorArr.length]
          }
        }
      }
    ]
  }
  chartIns.setOption(option)
}

onMounted(() => renderChart())
</script>

<style scoped lang="scss">
.pie-card {
  padding: 24px;
  h3 {
    margin-bottom: 20px;
    font-size: 20px;
    color: var(--text-white);
  }
}
</style>