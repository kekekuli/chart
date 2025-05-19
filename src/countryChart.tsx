import React, { useEffect } from 'react'
import ReactEchart from 'echarts-for-react'
import gdpData from './contryGDP.json'
import { EChartsOption } from 'echarts'

const years = Object.keys(gdpData[0].gdp_growth)

export default function CountryChart(): React.JSX.Element {
  const chartRef = React.useRef<ReactEchart>(null)
  const updateFrequency = 2000

  const baseOptions = {
    grid: {
      left: '100',
      right: '100'
    },
    title: {
      text: ``,
      left: 'center'
    },
    yAxis: {
      type: 'category',
      data: gdpData.map((item) => item.country),
      inverse: true,
      animationDurationUpdate: updateFrequency
    },
    xAxis: {
      type: 'value',
      name: '增长率 (%)',
      axisLabel: {
        formatter: '{value} %'
      },
      max: function (value) {
        return value.max + 3 < 100 ? value.max + 3 : 100
      },
      animationDurationUpdate: updateFrequency
    },
    series: [
      {
        name: 'china',
        type: 'bar',
        data: gdpData.map((item) => item.gdp_growth['2018']),
        realtimeSort: true,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        },
        animationDuration: updateFrequency,
        animationDurationUpdate: updateFrequency
      }
    ],
    graphic: [
      {
        type: 'text',
        right: 60,
        bottom: 60,
        style: {
          text: ``,
          font: 'bolder 80px monospace',
          fill: 'rgba(100, 100, 100, 0.25)'
        }
      }
    ],
    animationDurationUpdate: updateFrequency,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  }

  const makeOption = (year: string): EChartsOption => {
    baseOptions.title.text = `${year}年 GDP增长率`
    baseOptions.graphic[0].style.text = `${year}`
    baseOptions.series[0].data = gdpData.map((item) => item.gdp_growth[year])
    return baseOptions as EChartsOption
  }

  useEffect(() => {
    if (!chartRef.current) return
    const chart = chartRef.current.getEchartsInstance()

    let index = 0

    const interval = setInterval(() => {
      console.log('Interval triggered')
      index++
      if (index >= years.length) {
        clearInterval(interval)
      } else {
        chart.setOption(makeOption(years[index]))
      }
    }, updateFrequency)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <>
      <h1>Country Chart</h1>
      <div className="w-[800px] h-[400px] bg-secondary">
        <ReactEchart option={makeOption(years[0])} ref={chartRef} />
      </div>
    </>
  )
}
