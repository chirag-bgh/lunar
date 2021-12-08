import { useWeb3Transfer, useMoralis, useMoralisQuery } from 'react-moralis'
import Moralis from 'moralis'

// Classes
import ProductClass from '../classes/ProductClass'

export const TransferButton = ({ objectId }: { objectId: string }) => {
  const { data } = useMoralisQuery('Products', (query) =>
    query.equalTo('objectId', objectId)
  )

  let json = JSON.stringify(data, null, 2)

  const product: ProductClass = JSON.parse(json)[0]

  return (
    <div>
      <div
        onClick={() => {
          console.log('product: ', product)
          Transfer({ amount: product.price, address: product.user.ethAddress })
        }}
        className='h-7 text-sm bg-primary rounded-sm text-black font-display px-2 flex justify-center items-center cursor-pointer'
      >
        Transfer
      </div>
    </div>
  )
}

const Transfer = ({ amount, address }: { amount: number; address: string }) => {
  const { fetch } = useWeb3Transfer({
    amount: Moralis.Units.ETH(amount),
    receiver: address,
    type: 'native',
  })
  return fetch()
}

const DisplayTransaction = () => {
  const { user } = useMoralis()
  const userAddress = user!.get('ethAddress')
  console.log('DisplayTransaction')

  const { data, error, isLoading } = useMoralisQuery(
    'EthTransactions',
    (query) => query.equalTo('from_address', userAddress)
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

export { Transfer, DisplayTransaction }
