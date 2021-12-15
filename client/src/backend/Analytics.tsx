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

// Fetches user revenue from Moralis DB
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
  return <div>{revenue.toString().substring(0, 4)} MATIC</div>
}

// Fetches all user transactions from Moralis DB
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

//fetches revenue data and returns chart. 
export const DisplayChart = () => {
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
          revenue += transactions[index].amount
        }
        transactionCount += 1
      }
    }

    chartData.unshift({
      name: date,
      revenue: revenue,
      transactions: transactionCount,
    })
  }

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
          stroke='#82ca9d'
          activeDot={{ r: 8 }}
        />
        <Line type='monotone' dataKey='transactions' stroke='#87F1FF' />
      </LineChart>
    </ResponsiveContainer>
  )
}
