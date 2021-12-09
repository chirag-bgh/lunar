import { useMoralis, useMoralisQuery } from 'react-moralis'

export const DisplayTransaction = () => {
  const { user } = useMoralis()
  const userAddress = user.get('managed_account_pub')
  const { data, error, isLoading } = useMoralisQuery(
    'EthTransactions',
    (query) => query.equalTo('to_address', userAddress.toLowerCase())
  )

  if (error) {
    console.log(error)
    return <span>🤯</span>
  }

  if (isLoading) {
    return <span>🙄</span>
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
