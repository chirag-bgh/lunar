const Transactions = () => {
  return (
    <div className='w-full'>
      <div className='w-full flex flex-col justify-between items-start'>
        <h2 className='text-3xl underline font-medium'>Transactions</h2>
      </div>
      <div className='flex h-8 justify-end items-between gap-1 mt-12'>
        <input
          className='h-full w-72 bg-dark rounded-sm text-white pl-2 outline-none text-sm'
          type='text'
          placeholder='Search by product, ID, or subscribers'
        />
        <div className='w-16 h-full rounded-sm bg-primary flex justify-center items-center'>
          Search
        </div>
      </div>
      <table className='text-white bg-dark w-full mt-5 rounded-lg'>
        <tr className='border-gray-500 border-b-2'>
          <th>Product</th>
          <th>ID</th>
          <th>Quantity</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Date</th>
        </tr>
        <tr className='h-80'>
          <td></td>
        </tr>
      </table>
    </div>
  )
}

export default Transactions
