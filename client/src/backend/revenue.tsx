import { useMoralisQuery, useMoralis } from 'react-moralis'
import TransactionClass from '../classes/TransactionClass'

const GetRevenue = () => {
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

  console.log('revenue', revenue)
  return <div>{revenue} MATIC</div>
}

export default GetRevenue
