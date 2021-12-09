import {
  useWeb3Transfer,
  useMoralis,
  useMoralisQuery,
  useNewMoralisObject,
  // useMoralisCloudFunction,
} from 'react-moralis'
import Moralis from 'moralis'
import { useEffect, useState } from 'react'

// Classes
import ProductClass from '../classes/ProductClass'

export const TransferProduct = ({
  objectId,
  recurrence,
  price,
  name,
}: {
  objectId: string
  recurrence: string
  price: number
  name: string
}) => {
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

  return (
    <TransferButton
      product={product}
      recurrence={recurrence}
      price={price}
      name={name}
    />
  )
}

const TransferButton = ({
  product,
  recurrence,
  price,
  name,
}: {
  product: ProductClass
  recurrence: string
  price: number
  name: string
}) => {
  const { user } = useMoralis()
  // const {
  //   fetch: fetch1,
  //   data,
  //   isLoading,
  //} = useMoralisCloudFunction(
  //   "helloworld",
  //   { user: user, product: product, status: true },
  //   { autoFetch: false }
  // );
  // console.log("Cloud: ", data);
  // console.log("isloading ", isLoading);
  const { fetch, error, isFetching } = useWeb3Transfer({
    amount:
      product !== undefined
        ? Moralis.Units.ETH(product.price)
        : Moralis.Units.ETH(0),
    receiver: product !== undefined ? product.user.managed_account_pub : '0x0',
    type: 'native',
  })
  const [fetched, setFetched] = useState(false)
  const [called, setcalled] = useState(false)
  const { save } = useNewMoralisObject('Subscription')

  useEffect(() => {
    let x = undefined
    let counter = 0
    if (called) {
      if (!fetched) {
        setFetched(true)
        if (product !== undefined) {
          if (product.recurrence !== 'One time') {
            if (x === undefined) {
              x = null
              console.log('hello')
              let y = fetch({
                onSuccess: () =>
                  (x = save({
                    product: product.objectId,
                    status: true,
                    user: user,
                    recurrence: recurrence,
                    price: price,
                    name: name,
                  })),
                onError: (error) => console.log(error),
              })
              console.log('x: ', x)
              console.log('y: ', y)
              counter = counter + 1
              console.log('counter: ', counter)
            }
          }
        }
      }
    }
  }, [called, fetched, product, recurrence, price, name, user, fetch, save])

  return (
    <div>
      {error && <h1>Error: {error}</h1>}
      <button
        disabled={isFetching}
        onClick={() => {
          setcalled(true)
          //  fetch1({
          //   onSuccess: () => console.log("Worked"),
          //   onError: (error) => console.log("Raghav: ", error),
          //  });
        }}
        className='h-7 text-sm bg-primary rounded-sm text-black font-display px-2 flex justify-center items-center cursor-pointer'
      >
        Transfer
      </button>
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
