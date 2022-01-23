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
    borderRadius: '7px',
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

  console.log('acceptedCurrencies', acceptedCurrencies)

  const dropdownOptions = ['One time', 'Monthly', 'Quarterly', 'Yearly']
  const defaultOption = dropdownOptions[0]

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
        {/* Header */}
        <h1 className='text-2xl font-medium font-display mt-7'>
          Add New Product
        </h1>

        {/* Middle (Fields) */}
        <div className='flex flex-col justify-center items-center gap-5 w-full '>
          <div className='flex justify-between items-center gap-2 w-full px-16'>
            <p className='font-medium text-sm'>NAME</p>
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
          <div className='flex justify-between items-center gap-2 mr-auto w-full px-16 '>
            <p className='font-medium text-sm'>CURRENCY</p>
            <Dropdown
              className=' w-60'
              controlClassName='bg-background border-none'
              menuClassName='single-select bg-dark'
              placeholderClassName='text-white'
              options={acceptedCurrencies}
              onChange={(e) => {
                setCurrency(e.value)
              }}
              value={defaultCurrency}
              placeholder='Select an option'
            />
          </div>
          <div className='flex justify-between items-center gap-2 mr-auto w-full px-16 '>
            <p className='font-medium text-sm'>RECURRENCE</p>
            <Dropdown
              controlClassName='bg-background border-none'
              placeholderClassName='text-white'
              className='w-60'
              menuClassName='single-select h-15/2 bg-dark transition-all'
              options={dropdownOptions}
              onChange={(e) => {
                setRecurrence(e.value)
              }}
              value={defaultOption}
              placeholder='Select an option'
            />
          </div>
        </div>

        {/* Footer - Add Button */}
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
            className='px-20 py-1.5 bg-primary rounded flex justify-center items-center font-semibold cursor-pointer mb-7'
          >
            Add
          </button>
        </div>
      </div>
    </ReactModal>
  )
}

export default ProductModal
