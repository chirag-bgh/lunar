import { useMoralisQuery, useMoralis } from 'react-moralis'
import TransactionClass from '../classes/TransactionClass'

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const GetRevenue = () => {
  const { user } = useMoralis()

  const userAddress = user.get('managed_account_pub')

  const { data } = useMoralisQuery('Transactions', (query) =>
    query.equalTo('to_address', userAddress)
  )

  let json = JSON.stringify(data, null, 2)

  const transactions: TransactionClass[] = JSON.parse(json)

  //   console.log('transactions', json)

  let prices: number[] = transactions.map((transaction) => transaction.amount)

  let revenue = 0

  if (prices.length > 0) {
    revenue = prices.reduce((prev, next) => prev + next, 0)
  }

  // console.log('revenue', revenue)
  return <div>{revenue} MATIC</div>
}

export const GetTransactions = () => {
  const { user } = useMoralis()

  const userAddress = user.get('managed_account_pub')

  const { data } = useMoralisQuery('Transactions', (query) =>
    query.equalTo('to_address', userAddress)
  )

  let json = JSON.stringify(data, null, 2)

  const transactions: TransactionClass[] = JSON.parse(json)

  return <div>{transactions.length}</div>
}

const useTransactionCount = (createdAt: Date) => {
  const { data } = useMoralisQuery('Transactions', (query) =>
    query.equalTo('createdAt', createdAt)
  )

  let json = JSON.stringify(data, null, 2)

  const transactions: TransactionClass[] = JSON.parse(json)

  return transactions.length
}

export const GetData = () => {
  const { user } = useMoralis()

  const userAddress = user.get('managed_account_pub')

  const { data } = useMoralisQuery('Transactions', (query) =>
    query.equalTo('to_address', userAddress)
  )

  let json = JSON.stringify(data, null, 2)

  let dateObj = new Date()

  let chartData = []

  const transactions: TransactionClass[] = JSON.parse(json)

  let dates: Date[] = transactions.map((transaction) => transaction.createdAt)

  for (let i = 0; i < 7; i++) {
    dateObj.setDate(dateObj.getDate() - 1)

    let date =
      dateObj.getFullYear() +
      '-' +
      (dateObj.getMonth() + 1) +
      '-' +
      (dateObj.getDate() + 1)

    let revenue = 0

    let transactionCount = 0

    for (let index = 0; index < dates.length; index++) {
      const transactionDate = dates[index]

      if (transactionDate.toString().startsWith(date)) {
        if (transactions[index] !== undefined) {
          revenue = transactions[index].amount
        }
        transactionCount += 1
      }
    }

    chartData.push({
      name: date,
      revenue: revenue,
      transactions: transactionCount,
    })
  }

  // console.log('chartData', chartData)

  return (
    <ResponsiveContainer width='100%' height='65%' className='mt-10'>
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='revenue'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
        <Line type='monotone' dataKey='transactions' stroke='#82ca9d' />
      </LineChart>
    </ResponsiveContainer>
  )
}
