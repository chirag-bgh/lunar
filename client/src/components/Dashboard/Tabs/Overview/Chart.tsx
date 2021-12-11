import { useMemo } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { GetData } from '../../../../backend/Analytics'

const ChartExample = () => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
    },
    {
      name: 'Page B',
      uv: 3000,
    },
    {
      name: 'Page C',
      uv: 2000,
    },
    {
      name: 'Page D',
      uv: 2780,
    },
    {
      name: 'Page E',
      uv: 1890,
    },
    {
      name: 'Page F',
      uv: 2390,
    },
    {
      name: 'Page G',
      uv: 3490,
    },
  ]

  return (
    // <LineChart width={500} height={300} data={data}>
    //   <XAxis dataKey='name' />
    //   <YAxis />
    //   <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
    //   <Line type='monotone' dataKey='uv' stroke='#8884d8' />
    //   <Line type='monotone' dataKey='pv' stroke='#82ca9d' />
    // </LineChart>
    <GetData />
  )
}

export default ChartExample
