import { useNewMoralisObject, useMoralis, useMoralisQuery } from 'react-moralis'
// import Moralis from 'moralis'

// Classes
import ProductClass from './ProductClass'

const CreateProduct = ({ name, price }: { price: number; name: string }) => {
  const { isSaving, error, save } = useNewMoralisObject('Products')
  const { user } = useMoralis()
  console.log('Hello')
  return (
    <div>
      {error}
      <button onClick={() => save({ name, price, user })} disabled={isSaving}>
        Create Product
      </button>
    </div>
  )
}
const FetchProduct = () => {
  const { user } = useMoralis()

  const { data, error, isLoading } = useMoralisQuery('Products', (query) =>
    query.equalTo('user', user)
  )

  if (error) {
    console.log(error)
    return <span>🤯</span>
  }

  if (isLoading) {
    return <span>🙄</span>
  }

  let json = JSON.stringify(data, null, 2)

  const products: ProductClass[] = JSON.parse(json)

  // console.log('product', Products)

  return (
    <table className='text-white bg-dark w-full mt-5 rounded-lg'>
      <tr className='border-gray-500 border-b-2'>
        <th>Name</th>
        <th>ID</th>
        <th>Price</th>
        <th>Created At</th>
      </tr>
      {products.map((product) => {
        return (
          <tr>
            <td>{product.name}</td>
            <td>{product.user.authData.moralisEth.id}</td>
            <td>{product.price} ETH</td>
            <td>{product.createdAt}</td>
          </tr>
        )
      })}
    </table>
  )
}

export { CreateProduct, FetchProduct }
