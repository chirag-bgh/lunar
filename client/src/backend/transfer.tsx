import { useWeb3Transfer, useMoralis, useMoralisQuery,useNewMoralisObject } from 'react-moralis'
import Moralis from 'moralis'
import { useEffect, useState } from 'react'
// Classes
import ProductClass from '../classes/ProductClass'

export const TransferProduct = ({ objectId }: { objectId: string }) => {
  const { data, error, isLoading } = useMoralisQuery('Products', (query) =>
    query.equalTo('objectId', objectId)
  )

  if (error) {
    return <span>🤯</span>
  }

  if (isLoading) {
    return <span>🙄</span>
  }

  let json = JSON.stringify(data, null, 2)

  const product: ProductClass = JSON.parse(json)[0]

  return <TransferButton product={product} />
}

const TransferButton = ({ product }: { product: ProductClass }) => {
  const {user} = useMoralis()
  const { fetch, error, isFetching } = useWeb3Transfer({
    amount: 
      product !== undefined
        ? Moralis.Units.ETH(product.price)
        : Moralis.Units.ETH(0),
    receiver: 
        product !== undefined ? product.user.managed_account_pub : '0x0',
    type: 'native',
  })
  const [fetched, setFetched] = useState(false)
  const [called, setcalled] = useState(false)
  const { isSaving, save } = useNewMoralisObject('Subscription')
  if(called){
  if (!fetched){
  if (product !== undefined){
  if (product.recurrence !== 'One time'){
    let x = save({product: product.objectId,status: true,user:user})
    if (!isSaving){
        setFetched(true)
    } 
    console.log('x: ',x)
  }}}}

  return (
    <div>
      {error && <h1>Error: {error}</h1>}
      <button
        disabled={isFetching}
        onClick={() => {
          console.log('product: ', product)
          fetch() 
          setcalled(true)
        }}
        className='h-7 text-sm bg-primary rounded-sm text-black font-display px-2 flex justify-center items-center cursor-pointer'
      >
        Transfer
      </button>
    </div>
  )
}

const Invoice = ({ subscription }: { subscription: object }) => {
  const { isSaving, save } = useNewMoralisObject('Invoices')
  

}

const Subscription = ({ data,product }: { data:object,product:ProductClass }) => {
  
  

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
