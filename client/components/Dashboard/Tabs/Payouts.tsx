import { BsFillArrowDownCircleFill } from 'react-icons/bs'
import { HiPlusSm } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { FetchWithdrawals, Withdraw } from '../../../backend/withdraw'
import { walletgetter } from '../../../API/wallet'
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
  const { user, web3 } = useMoralis()

  let address = user?.get('ethAddress')

  const [selected, setSelected] = useState(address)
  

  const [cardFetched, setCardFetched] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [accfetched, setaccfetched] = useState(false)
  
  if (!accfetched) {
    walletgetter({ setAcc })
    setaccfetched(true)
  }
  function setAcc({ z }: { z: any }) {
    setAccounts(z)
  }

  return (
    <div className='w-full'>
      <div className='flex flex items-center'>
        <h2 className='text-3xl underline font-medium'>Wallets</h2>
        <div className="bg-transparent text-center py-4 lg:px-4 cursor-pointer">
          <a href="https://app.ens.domains" target="_blank">
        <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none rounded-full inline-flex" role="alert">
          <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-2 text-xs font-bold mr-3"></span>
          <span className="font-semibold mr-2 text-left flex-auto">We support ENS domains! </span>
          <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
        </div>
        </a>
      </div>}
      </div>

      <div className='flex flex-wrap gap-8 items-center'>
        <div className='flex justify-center items-center gap-10'>
          {accounts.map((accountAdr) => {
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
          className='bg-primary rounded-full w-24 h-24 text-7xl font-display flex justify-center items-center cursor-pointer hover:scale-110 transition ease-in-out duration-200'
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

      {/* <div className='bg-primary p-5 flex justify-center items-center w-32 h-12 gap-1 rounded-lg cursor-pointer mt-10'>
        <h1 className='text-dark font-display font-semibold'>Invoice</h1>
        <BsFillArrowDownCircleFill className='text-dark text-xl' />
      </div> */}
      <div className='flex mt-7 mb-7 justify-center items-center'>
        <h1 className='text-white font-display font-semibold'>
          Need help? Send us a DM on Twitter at{' '}
          <span className='text-bold text-primary cursor-pointer'>
            <a href="https://www.twitter.com/PayLunar" target="_blank">
            @PayLunar
            </a>
          </span>
        </h1>
      </div>
    </div>
  )
}

import { walletdestroy } from '../../../API/wallet'
import { avatarresolver } from '../../Auth/AuthManager'

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
  const [avtr, setavtr] = useState('/metamask.png')
  const [enswallet, setenswallet] = useState('Your Metamask Wallet')


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
      setaddr(response as string)
      setFetched(false)
    }
    if (!ensfy) {
      if (addr.includes('.eth')) { 
        ensmaker()
        avatarresolver({ address: addr, setavtr: setavtr,setenswallet:setenswallet })
        setensfy(true)
      }
    }

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
          src={avtr}
          alt='MetaMask'
        />
        {address === ethAddress ? (
          <div></div>
        ) : showRemove ? (
          <HiPlusSm
            className='text-primary transform rotate-45 text-3xl'
            onClick={() => {
              walletdestroy({address:address,token: user?.get('token')}).then(()=>{
                alert("Wallet was removed")
              })
              //console.log("new accounts: ", accounts);
            }}
          />
        ) : (
          <HiPlusSm className='text-dark transform rotate-45 text-3xl' />
        )}
      </div>
      <div>
        <h1>{enswallet}</h1>
        <h3 className='text-gray-400 text-sm font-display truncate'>
          {address}
        </h3>
      </div>

      <h1 className='text-3xl font-semibold mb-3'>{balance} ETH</h1>
    </div>
  )
}

export default Payouts
