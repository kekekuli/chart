import React from 'react'
import BasicChart from './basicChart'
import CountryChart from './countryChart'

export default function App(): React.JSX.Element {
  return (
    <div className="flex justify-center items-center flex-col gap-3">
      <BasicChart />
      <CountryChart />
    </div>
  )
}
