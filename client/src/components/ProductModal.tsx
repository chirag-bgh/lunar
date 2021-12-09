// Modal
import { useState } from 'react'
import ReactModal from 'react-modal'

// Dropdown
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// Components
import { CreateProduct } from '../backend/Products'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '36%',
    backgroundColor: '#1E1E1F',
    width: '30%',
  },
}

ReactModal.setAppElement('body')

ReactModal.defaultStyles.overlay.backgroundColor = 'transparent'

const ProductModal = ({
  modalIsOpen,
  setIsOpen,
}: {
  modalIsOpen: boolean
  setIsOpen: (arg: boolean) => void
}) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0.0)
  const [recurrence, setRecurrence] = useState('One time')

  const dropdownOptions = [
    'One time', 'Monthly', 'Quarterly', 'Yearly'
  ];

  const defaultOption = dropdownOptions[0];

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

        <div className='flex flex-col justify-center items-center gap-5'>
          <div className='flex justify-center items-center gap-2'>
            <p className='font-medium text-sm'>NAME</p>
            <input
              type='text'
              name='name'
              id='name'
              className='rounded-sm outline-none pl-2 font-display'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className='flex justify-center items-center gap-2'>
            <p className='font-medium text-sm'>PRICE</p>
            <input
              type='number'
              name='price'
              id='price'
              className='rounded-sm outline-none pl-2 font-display'
              value={price}
              onChange={(event) => setPrice(parseFloat(event.target.value))}
            />
          </div>
        </div>     
        <div className="flex justify-center items-center gap-2">
          <p className='font-medium text-sm'>RECURRENCE</p>
          <Dropdown menuClassName="single-select h-20" options={dropdownOptions} onChange={(e) => {setRecurrence(e.value)}} value={defaultOption} placeholder="Select an option" />
        </div>
        <CreateProduct name={name} price={price} recurrence={recurrence} closeModal={closeModal} />
      </div>
    </ReactModal>
  )
}

export default ProductModal
