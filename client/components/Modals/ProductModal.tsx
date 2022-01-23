// Modal
import { useEffect, useMemo, useState } from 'react'
import ReactModal from 'react-modal'
import { productadder } from '../../API/products'

// Dropdown
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

// Components
import { CreateProduct } from '../../backend/Products'
import { useMoralis } from 'react-moralis'
import { currencygetter } from '../../API/accepted_currencies'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    // height: '36%',
    height: '55%',
    backgroundColor: '#1E1E1F',
    width: '40%',
    border: 'none',
    overflow: 'hidden',
  },
}

ReactModal.setAppElement('body')

let modalElementOverlay = ReactModal.defaultStyles.overlay
modalElementOverlay
  ? (modalElementOverlay.backgroundColor = 'transparent')
  : null

const ProductModal = ({
  modalIsOpen,
  setIsOpen,
  acceptedCurrencies,
}: {
  modalIsOpen: boolean
  setIsOpen: (arg: boolean) => void
  acceptedCurrencies: string[]
}) => {
  const { user } = useMoralis()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0.0)
  const [recurrence, setRecurrence] = useState('One time')
  const [currency, setCurrency] = useState('MATIC')
  // const [accounts, setAccounts] = useState<string[]>([])
  // const [accfetched, setaccfetched] = useState(false)

  // let token = user?.get('token')

  console.log('acceptedCurrencies', acceptedCurrencies)

  // function setAcc({ z }: { z: any }) {
  //   console.log('setting accounts to ', z)

  //   setAccounts(z)
  // }

  // useEffect(() => {
  //   console.log('account fetcehd', accfetched)

  // if (!accfetched) {
  //   console.log('fetching accepted currencie')

  //   currencygetter({ setAcc, token })
  //   setaccfetched(true)
  // }

  // console.log('accounts: ', accounts)

  // if (accfetched && accounts !== undefined) {
  //   if (accounts.includes('ETH')) {
  //     acceptedCurrencies.push('ETH')
  //   }
  //   if (accounts.includes('MATIC')) {
  //     acceptedCurrencies.push('MATIC')
  //   }
  // }
  // }, [])

  const dropdownOptions = ['One time', 'Monthly', 'Quarterly', 'Yearly']
  const defaultOption = dropdownOptions[0]

  // let acceptedCurrencies: string[] = useMemo(() => [], [])

  // useEffect(() => {

  // }, [acceptedCurrencies, accounts])

  const defaultCurrency = acceptedCurrencies[0]

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <ReactModal
      id='product_modal'
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Create Product Modal'
    >
      <div className='w-full h-full flex flex-col justify-between items-center'>
        <h1 className='underline text-xl'>Add New Product</h1>

        <div className='flex flex-col justify-between items-center gap-8 w-full '>
          <div className='flex justify-between items-center gap-2 w-full px-16'>
            <p className='font-medium text-sm '>NAME</p>
            <input
              type='text'
              name='name'
              id='name'
              className='rounded-sm outline-none pl-2 font-display h-10 w-60 bg-background text-white'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className='flex justify-between items-center gap-2 w-full px-16'>
            <p className='font-medium text-sm'>PRICE</p>
            <input
              type='number'
              name='price'
              id='price'
              className='rounded-sm outline-none pl-2 font-display h-10 w-60 bg-background text-white'
              value={price}
              onChange={(event) => setPrice(parseFloat(event.target.value))}
            />
          </div>
        </div>
        <div className='flex justify-between items-center gap-2 mr-auto w-full px-16 '>
          <p className='font-medium text-sm'>CURRENCY</p>
          <Dropdown
            className=' w-60'
            controlClassName='bg-background border-none'
            menuClassName='single-select bg-dark'
            options={acceptedCurrencies}
            onChange={(e) => {
              setCurrency(e.value)
            }}
            value={defaultCurrency}
            placeholder='Select an option'
          />
        </div>
        <div className='flex justify-between items-center gap-2  mr-auto w-full px-16 '>
          <p className='font-medium text-sm'>RECURRENCE</p>
          <Dropdown
            controlClassName='bg-background border-none'
            className='w-60'
            menuClassName='single-select h-20 bg-dark transition-all'
            options={dropdownOptions}
            onChange={(e) => {
              setRecurrence(e.value)
            }}
            value={defaultOption}
            placeholder='Select an option'
          />
        </div>
        <div>
          <button
            onClick={async () => {
              if (name === '') {
                alert('Product name cannot be empty')
                return
              }
              if (price === 0) {
                alert('Price of the product cannot be 0')
                return
              }
              closeModal()
              await productadder({
                name,
                price,
                recurrence,
                currency: currency,
                token: user?.get('token'),
              }).then(() => {
                let banner = document.getElementById('success-msg')
                banner !== null ? (banner.style.opacity = '1') : null

                // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
                setTimeout(function () {
                  banner !== null ? (banner.style.opacity = '0') : null
                }, 2000)
              })
            }}
            className='px-14 py-1 bg-primary rounded-sm flex justify-center items-center font-semibold cursor-pointer'
          >
            Add
          </button>
        </div>
        {/* <CreateProduct
          name={name}
          price={price}
          recurrence={recurrence}
          closeModal={closeModal}
          currency={currency}
          acceptedCurrencies={acceptedCurrencies}
        /> */}
      </div>
    </ReactModal>
  )
}

export default ProductModal
