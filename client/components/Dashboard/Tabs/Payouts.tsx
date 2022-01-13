import { BsFillArrowDownCircleFill } from 'react-icons/bs'
import { HiPlusSm } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { FetchWithdrawals, Withdraw } from '../../../backend/withdraw'
import {
  useMoralis,
  useMoralisWeb3ApiCall,
  useMoralisWeb3Api,
} from 'react-moralis'

const Payouts = ({
  openWalletModal,
  setFetched,
}: {
  openWalletModal: () => void
  setFetched: (arg: boolean) => void
}) => {
  const { user,web3 } = useMoralis()

  let address = user?.get('ethAddress')

  const [selected, setSelected] = useState(address)

  const [cardFetched, setCardFetched] = useState(false)

  const accounts: string[] = user?.get('accounts')

  return (
    <div className='w-full'>
      <div className='flex flex-col justify-between items-start'>
        <h2 className='text-3xl underline font-medium'>Wallets</h2>
      </div>

      <div className='flex flex-wrap gap-8 items-center'>
        <div className='flex justify-center items-center gap-10'>
          {accounts.map((accountAdr) => {
            console.log('Account: ',accountAdr)
            return (
              <Card
                key={accountAdr}
                address={accountAdr}
                ethAddress={address}
                selected={selected === accountAdr ? true : false}
                setSelected={setSelected}
                fetched={cardFetched}
                setFetched={setCardFetched}
              />
            )
          })}
        </div>
        <button
          onClick={() => {
            openWalletModal()
            //console.log('all accounts: ', accounts)
          }}
          className='bg-primary rounded-full w-24 h-24 text-7xl font-display flex justify-center items-center cursor-pointer hover:shadow-primary transition ease-in-out duration-200'
        >
          <h1 className='text-dark'>+</h1>
        </button>
      </div>

      <div className='flex flex-col mt-12 justify-between items-start'>
        <h2 className='text-3xl underline font-medium'>Payouts</h2>
      </div>

      <Withdraw
        ethAddress={selected}
        setFetched={setFetched}
        setCardFetched={setCardFetched}
      />

      <div className='flex flex-col mt-12 justify-between items-start'>
        <h2 className='text-3xl underline font-medium'>Past Withdrawals</h2>
      </div>

      <FetchWithdrawals />

      <div className='bg-primary p-5 flex justify-center items-center w-32 h-12 gap-1 rounded-lg cursor-pointer mt-10'>
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
  ethAddress,
  selected,
  setSelected,
  fetched,
  setFetched,
}: {
  address: string
  ethAddress: string
  selected: boolean
  setSelected: (arg: string) => void
  fetched: boolean
  setFetched: (arg: boolean) => void
}) => {
  const { user, web3 } = useMoralis()

  const [balance, setBalance] = useState('-')
  const [ensfy, setensfy] = useState(false)
  const [addr, setaddr] = useState(address)
  const [showRemove, setShowRemove] = useState(false)


  const Web3Api = useMoralisWeb3Api()
  const { fetch, data } = useMoralisWeb3ApiCall(
    Web3Api.account.getNativeBalance,
    {
      address: addr,
      chain: 'ropsten',
    }
  )

  useEffect(() => {
    if (data !== null) {
      setBalance(
        web3?.utils.fromWei(data.balance).toString().substring(0, 4) as string
      )
    }
    async function ensmaker() {
      let response = await web3?.eth.ens.getAddress(address)
      console.log("Address: ", response)
      setaddr(response as string)
      setFetched(false)
    }
    if(!ensfy){
    if( addr.includes('.eth')){
      ensmaker()
      setensfy(true)
    }}


    if (!fetched) {
      fetch()
      setFetched(true)
    }
  }, [data, fetch, setFetched, fetched, web3?.utils])

  return (
    <div
      onClick={() => setSelected(address)}
      style={{ outline: selected ? '2px solid #2196f3' : 'none' }}
      onMouseOver={() => setShowRemove(true)}
      onMouseLeave={() => setShowRemove(false)}
      className={
        'p-1 mt-4 w-48 h-64 bg-dark flex flex-col justify-between text-center rounded-lg cursor-pointer transition-all' +
        (selected ? ' outline-primary' : '')
      }
    >
      <div className='flex justify-between items-start'>
        <div></div>
        <img
          className={`h-20 mt-3 ${address === ethAddress ? 'ml-0' : 'ml-7'}`}
          src='/metamask.svg'
          alt='MetaMask'
        />
        {address === ethAddress ? (
          <div></div>
        ) : showRemove ? (
          <HiPlusSm
            className='text-primary transform rotate-45 text-3xl'
            onClick={() => {
              // Remove wallet
              let accounts: string[] = user?.get('accounts')
              //console.log("accounts: ", accounts);

              const index = accounts.indexOf(address)
              if (index > -1) {
                accounts.splice(index, 1)
              }

              user?.save('accounts', accounts)
              //console.log("new accounts: ", accounts);
            }}
          />
        ) : (
          <HiPlusSm className='text-dark transform rotate-45 text-3xl' />
        )}
      </div>
      <div>
        <h1>Your Metamask wallet</h1>
        <h3 className='text-gray-400 text-sm font-display truncate'>
          {address}
        </h3>
      </div>

      <h1 className='text-3xl font-semibold mb-3'>{balance} ETH</h1>
    </div>
  )
}

export default Payouts
