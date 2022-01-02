// Modal
import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useMoralis } from 'react-moralis'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1E1E1F',
  },
}

const WalletModal = ({
  walletModalIsOpen,
  setWalletModalIsOpen,
}: {
  walletModalIsOpen: boolean
  setWalletModalIsOpen: (arg: boolean) => void
}) => {
  const [address, setAddress] = useState('')
  const { user, web3 } = useMoralis()

  function closeModal() {
    setWalletModalIsOpen(false)
  }

  useEffect(() => {
    ReactModal.setAppElement('body')
    if (ReactModal.defaultStyles.overlay !== undefined)
      ReactModal.defaultStyles.overlay.backgroundColor = 'transparent'
  }, [])

  return (
    <ReactModal
      id='wallet_modal'
      isOpen={walletModalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Create Product Modal'
    >
      <div className='w-full h-full flex flex-col justify-center items-center gap-7 py-9 px-4'>
        <div className='flex flex-col justify-center items-center gap-5'>
          <div className='flex justify-center items-center gap-2'>
            <p className='font-medium text-sm'>ADDRESS</p>
            <input
              type='text'
              name='address'
              id='address'
              placeholder='Enter wallet address..'
              className='rounded-sm outline-none pl-2 font-display h-7 flex justify-center items-center'
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <button
            onClick={async () => {
              closeModal()
              // TODO: add wallet

              let accounts: string[] = user?.get('accounts')
              //console.log('accounts: ', accounts)
              if (address.includes('.eth')) {
                try {
                  let x = address.includes('.eth')
                    ? ((await web3?.eth.ens.getAddress(address)) as string)
                    : address
                  accounts.push(address)
                  user?.save('accounts', accounts)
                } catch (err) {
                  console.log(err)
                  alert('Invalid Address')
                }
              }

              //console.log("new accounts: ", accounts);
            }}
            className='px-14 py-1 bg-primary rounded-sm flex justify-center items-center font-semibold cursor-pointer'
          >
            Add Wallet
          </button>
        </div>
      </div>
    </ReactModal>
  )
}

export default WalletModal
