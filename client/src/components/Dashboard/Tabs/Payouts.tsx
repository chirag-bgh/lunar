import metamask from '../../../assets/metamask.svg'
import { BsFillArrowDownCircleFill } from 'react-icons/all'
import { useEffect, useState } from 'react'
import { FetchWithdrawals, Withdraw } from '../../../backend/withdraw'
import {
  useMoralis,
  useMoralisWeb3ApiCall,
  useMoralisWeb3Api,
} from 'react-moralis'

const Payouts = () => {
  const { user, web3 } = useMoralis()
  let address = user.get('ethAddress')
  const [selected, setSelected] = useState(address)

  const [balance, setBalance] = useState('-')
  const [fetched, setFetched] = useState(false)
  const Web3Api = useMoralisWeb3Api()

  const { fetch, data } = useMoralisWeb3ApiCall(
    Web3Api.account.getNativeBalance,
    {
      address: address,
      chain: 'mumbai',
    }
  )

  useEffect(() => {
    if (data !== null) {
      setBalance(web3.utils.fromWei(data.balance))
    }
    if (!fetched) {
      fetch()
      setFetched(true)
    }
  }, [data, fetch, fetched, web3.utils])

  return (
    <div className='w-full'>
      <div className='flex flex-col justify-between items-start'>
        <h2 className='text-3xl underline font-medium'>Wallets</h2>
      </div>

      <div className='flex flex-wrap gap-8 items-center'>
        <div onClick={() => setSelected(address)}>
          <Card
            address={address}
            balance={balance.substring(0, 5)}
            selected={selected === address ? true : false}
          />
        </div>
        <button
          disabled
          style={{ filter: 'grayscale(1) brightness(0.3)' }}
          className='bg-primary rounded-full w-24 h-24 text-7xl font-display flex justify-center items-center cursor-pointer'
        >
          <h1 className='text-dark'>+</h1>
        </button>
      </div>

      <div className='flex flex-col mt-12 justify-between items-start'>
        <h2 className='text-3xl underline font-medium'>Payouts</h2>
      </div>

      <Withdraw amount={0} address='' sender='' />

      <div className='flex flex-col mt-12 justify-between items-start'>
        <h2 className='text-3xl underline font-medium'>Past Withdrawals</h2>
      </div>

      <FetchWithdrawals />

      <div className='bg-primary p-5 mt-2 flex justify-center items-center w-32 h-12 gap-1 rounded-lg cursor-pointer mt-10'>
        <h1 className='text-dark font-display font-semibold'>Invoice</h1>
        <BsFillArrowDownCircleFill className='text-dark text-xl' />
      </div>
      <div className='flex mt-7 mb-7 justify-center items-center'>
        <h1 className='text-white font-display font-semibold'>
          Need help? Contact us at{' '}
          <span className='text-bold text-primary cursor-pointer'>
            teamlunar@protonmail.com
          </span>
        </h1>
      </div>
    </div>
  )
}

const Card = ({
  address,
  balance,
  selected,
}: {
  address: string
  balance: string
  selected: boolean
}) => {
  return (
    <div
      className={
        'p-1 mt-4 w-48 h-64 bg-dark flex flex-col justify-around text-center rounded-lg cursor-pointer transition-all' +
        (selected ? ' outline-primary' : '')
      }
    >
      <img className=' h-20' src={metamask} alt='' />
      <h1>Your Metamask wallet</h1>
      <h3 className='text-gray-400 text-sm font-display -mt-5 truncate'>
        {address}
      </h3>
      <h1 className='text-3xl font-semibold'>{balance} MATIC</h1>
    </div>
  )
}

export default Payouts
