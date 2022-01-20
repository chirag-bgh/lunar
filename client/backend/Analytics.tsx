import { useMoralis } from 'react-moralis'
import TransactionClass from '../classes/TransactionClass'
import { transactiongetter } from '../API/transactions'

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
import { useEffect, useState } from 'react'

// Fetches user revenue from Moralis DB
export const GetRevenue = () => {
  const { user } = useMoralis()

  const userAddress = user?.get('managed_account_pub')

  const [data, setAccounts] = useState([])
  const [accfetched, setaccfetched] = useState(false)

  if(!accfetched){
    console.log("Fetched")
    transactiongetter({setAcc})
    setaccfetched(true)
  }
  function setAcc({z}:{z:any}) {
    setAccounts(z)
    console.log("Set Account")
  }

  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    getRev(data)
    return () => {
      setRevenue(0)
    }
  }, [data])


  const getRev = (data: any) => {
    let json = JSON.stringify(data, null, 2)

    const transactions: TransactionClass[] = JSON.parse(json)

    let prices: number[] = transactions.map((transaction) => transaction.amount)

    if (prices.length > 0) {
      setRevenue(prices.reduce((prev, next) => prev + next, 0))
    }
  }

  // console.log('revenue', revenue)
  return <div>{revenue.toString().substring(0, 4)} ETH</div>
}

// Fetches all user transactions from Moralis DB
export const GetTransactions = () => {
  const { user } = useMoralis()

  const userAddress = user ? user.get('managed_account_pub') : ''

  // console.log('querying transactions')

  const [data, setAccounts] = useState([])
  const [accfetched, setaccfetched] = useState(false)

  if(!accfetched){
    console.log("Fetched")
    transactiongetter({setAcc})
    setaccfetched(true)
  }
  function setAcc({z}:{z:any}) {
    setAccounts(z)
    console.log("Set Account")
  }
  

  const [transactions, setTransactions] = useState<TransactionClass[]>([])

  useEffect(() => {
    // console.log('fetching transactions')

    getTrans(data)
    return () => {
      setTransactions([])
    }
  }, [data])

  const getTrans = (data: any) => {
    let json = JSON.stringify(data, null, 2)

    setTransactions(JSON.parse(json))
  }

  return <div>{transactions.length}</div>
}

// Fetches revenue data and returns chart.
export const DisplayChart = ({ timeFrame }: { timeFrame: string }) => {
  const { user } = useMoralis()

  const userAddress = user?.get('managed_account_pub')

  const [data, setAccounts] = useState([])
  const [accfetched, setaccfetched] = useState(false)

  if(!accfetched){
    console.log("Fetched")
    transactiongetter({setAcc})
    setaccfetched(true)
  }
  function setAcc({z}:{z:any}) {
    setAccounts(z)
    console.log("Set Account")
  }

  const [chartData, setChartData] = useState<any[]>([])

  const [days, setDays] = useState(7)

  const [revenueLineOpacity, setRevenueLineOpacity] = useState(1)
  const [revenueLineWidth, setRevenueLineWidth] = useState(1)

  const [transactionLineWidth, setTransactionLineWidth] = useState(1)
  const [transactionLineOpacity, setTransactionLineOpacity] = useState(1)

  useEffect(() => {
    let legend_revenue = document.getElementsByClassName('legend-item-0')[0]

    if (legend_revenue !== undefined) {
      legend_revenue.addEventListener('mouseover', () => {
        setTransactionLineOpacity(0.5)
        setRevenueLineWidth(2)
        setRevenueLineOpacity(1)
        setTransactionLineWidth(1)
      })
      legend_revenue.addEventListener('mouseout', () => {
        setTransactionLineOpacity(1)
        setRevenueLineWidth(1)
        setRevenueLineOpacity(1)
        setTransactionLineWidth(1)
      })
    }

    let legend_transaction = document.getElementsByClassName('legend-item-1')[0]

    if (legend_transaction !== undefined) {
      legend_transaction.addEventListener('mouseover', () => {
        setRevenueLineOpacity(0.5)
        setTransactionLineWidth(2)
        setTransactionLineOpacity(1)
        setRevenueLineWidth(1)
      })
      legend_transaction.addEventListener('mouseout', () => {
        setRevenueLineOpacity(1)
        setTransactionLineWidth(1)
        setTransactionLineOpacity(1)
        setRevenueLineWidth(1)
      })
    }
  })

  useEffect(() => {
    setDays(getDaysFromTimeFrame(timeFrame))
    console.log('days', days)
  }, [timeFrame])

  useEffect(() => {
    getChartData(data, days)
    return () => {
      setChartData([])
    }
  }, [data, days])

  const getChartData = (data: any, days: number) => {
    let tempData = []

    let json = JSON.stringify(data, null, 2)

    let dateObj = new Date()

    const transactions: TransactionClass[] = JSON.parse(json)

    let dates: Date[] = transactions.map((transaction) => transaction.created_at)
    console.log("Dates: ",dates)

    for (let i = 0; i < days; i++) {
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
        console.log("Checker ",transactionDate.toString())
        console.log('Date: ',date)
        console.log("Bool: ",transactionDate.toString().startsWith(date))
        if (transactionDate.toString().includes(date)) {
          if (transactions[index] !== undefined) {
            revenue += transactions[index].amount
            console.log("Revenue: ",revenue)
          }
          transactionCount += 1
        }
      }

      tempData.unshift({
        name: date,
        revenue: revenue,
        transactions: transactionCount,
      })

      setChartData(tempData)
    }
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
          strokeOpacity={revenueLineOpacity}
          strokeWidth={revenueLineWidth}
          activeDot={{ r: 7, stroke: '#1E1E1F', strokeWidth: 3 }}
          dot={false}
        />
        <Line
          type='monotone'
          dataKey='transactions'
          stroke='#87F1FF'
          strokeWidth={transactionLineWidth}
          strokeOpacity={transactionLineOpacity}
          activeDot={{ stroke: '#1E1E1F' }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

const getDaysFromTimeFrame = (timeFrame: string) => {
  let days = 7

  switch (timeFrame) {
    case 'Today':
      days = 1
      break
    case 'Last Week':
      days = 7
      break
    case 'Last Month':
      days = 30
      break
    case 'Last Year':
      days = 365
      break
    default:
      days = 7
      break
  }

  return days
}
