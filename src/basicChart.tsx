import React, { useState, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react'
import { EChartsOption } from 'echarts'

export default function BasicChart(): React.JSX.Element {
  const chartRef = React.useRef<ReactEcharts>(null)

  const [data, setData] = useState([1, 2, 3, 4, 5])

  const categories = ['A', 'B', 'C', 'D', 'E']

  const getOptions = (): EChartsOption => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    xAxis: {},
    yAxis: {
      type: 'category',
      data: categories,
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300
    },
    series: [
      {
        realtimeSort: true,
        name: 'X',
        type: 'bar',
        data,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        }
      }
    ],
    legend: {
      show: true
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  })

  useEffect(() => {
    const run = (): void => {
      setData((prevData) =>
        prevData.map((val) => val + Math.round(Math.random() * (Math.random() > 0.9 ? 2000 : 200)))
      )
    }

    setTimeout(run, 0)
    const interval = setInterval(run, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance()
    if (chart) {
      chart.setOption({
        series: [
          {
            type: 'bar',
            data
          }
        ]
      })
    }
  }, [data])

  return (
    <>
      <span>Basic chart</span>
      <div className="w-[600px] h-[400px] bg-secondary">
        <ReactEcharts option={getOptions()} ref={chartRef}></ReactEcharts>
      </div>
    </>
  )
}
