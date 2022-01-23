import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMoralis, useMoralisQuery, useNewMoralisObject } from 'react-moralis'
import { withdrawalgetter } from '../API/withdrawals'
import CryptoJS from 'crypto-js'
import { withdrawadder } from '../API/withdraw'
// Sorting Library
import linq from 'linq'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { FiDownloadCloud } from 'react-icons/fi'
import { WithdrawalClass } from '../classes/WithdrawalClass'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { ethers } from 'ethers'

declare const window: any

import Loader from 'react-loader-spinner'
import { monthNames } from './Utils'

require('react/package.json') // react is a peer dependency.

require('react-dom/package.json') // react-dom is a peer dependency.

interface TableData {
  id: string
  address: string
  amount: number
  createdAt: Date
}

interface SortingConfiguration {
  propertyName: keyof TableData
  sortType: SortingType
}

enum SortingType {
  Ascending,
  Descending,
}

export const Withdraw = ({
  ethAddress,
  setFetched,
  setCardFetched,
}: {
  ethAddress: string
  setFetched: (arg: boolean) => void
  setCardFetched: (arg: boolean) => void
}) => {
  const { user, web3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } =
    useMoralis()

  const { error, save } = useNewMoralisObject('Withdrawals')
  const [loadingWithdrawal, setIsLoadingWithdrawal] = useState(false)
  const [isBroke, setIsBroke] = useState(false)

  if (!isWeb3Enabled) {
    return <h1>Web3 not enabled for some reason</h1>
  }

  async function withdrawTransaction() {
    let accountAddress = user?.get('managed_account_pub')
    accountAddress = accountAddress.includes('.eth')
      ? ((await web3?.eth.ens.getAddress(accountAddress)) as string)
      : accountAddress
    let encryptedKey = user?.get('encryptedKey')
    let bytes = CryptoJS.AES.decrypt(
      encryptedKey,
      process.env.NEXT_PUBLIC_PASSWORD as string
    )
    let privateKeyOG = bytes.toString(CryptoJS.enc.Utf8)
    // let ethAddress = user.get('ethAddress')

    // await window.ethereum.enable();
    // if (window.ethereum) {
    //   try {
    //     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //     // setAccounts(accounts);
    //   } catch (error) {
    //     // if (error?.code === 4001) {
    //       // User rejected requests
    //     // }
    // console.log("error: ", error)
    //     // setError(error);
    //   }
    // }

    // const provider = new ethers.providers.Web3Provider(window.ethereum)

    let balance: any = await web3?.eth.getBalance(accountAddress)

    let gasPrice: any = await web3?.eth.getGasPrice()
    let txFee: any = gasPrice * 21000

    let valueToBeSent: any = balance - txFee

    if (valueToBeSent > 0) {
      setIsBroke(false)

      // console.log('balance: ', balance)
      // console.log('account address: ', accountAddress)
      // console.log('eth address: ', ethAddress)
      // console.log('privateKeyOG: ', privateKeyOG)
      // console.log('gasPrice: ', gasPrice)
      // console.log('valueToBeSent: ', valueToBeSent)
      // console.log('FINAL: ', valueToBeSent + txFee)

      const txParams = {
        to: ethAddress,
        gas: web3?.utils.toHex(gasPrice * 21000),
        gasPrice: web3?.utils.toHex(gasPrice),
        gasLimit: web3?.utils.toHex('21000'),
        value: web3?.utils.toHex(valueToBeSent),
        // nonce: 0,
      }

      const provider = ethers.providers.getDefaultProvider(3)

      let account = web3?.eth.accounts.wallet.add(privateKeyOG)

      let signedTx = await account?.signTransaction(txParams)

      setIsLoadingWithdrawal(true)

      await provider
        .sendTransaction(signedTx?.rawTransaction as string)
        .then(() => {
          setIsLoadingWithdrawal(false)
          save({ ethAddress, balance, user: user?.id })
          setFetched(false)
          setCardFetched(false)
        })
        .catch((error) => {
          console.log('error: ', error)
        })

      // await provider.waitForTransaction(hash)

      // await web3?.eth
      //   .sendSignedTransaction((await signedTx)?.rawTransaction as string)
      //   .then(() => {
      //     setIsLoadingWithdrawal(false)
      //     console.log('Successfully Withdrew', balance, ' WEI')
      //     save({ ethAddress, balance, user: user?.id })
      //     setFetched(false)
      //     setCardFetched(false)
      //   })
      //   .catch((error) => {
      //     console.log('error: ', error)
      //   })
    } else {
      setIsBroke(true)
    }
  }

  async function withdrawAPI() {
    let wbalance: any = await web3?.eth.getBalance(user?.get('managed_account_pub'))
    let balance:any = web3?.utils.fromWei(wbalance)
    let token: any = await user?.get('token')
    setIsLoadingWithdrawal(true)
    
    withdrawadder({address:ethAddress,amount:balance.toString(),token}).then(()=>{
      alert('Withdrawal Succesful')
      setIsLoadingWithdrawal(false)
    }
    )

  }

  return (
    <div className='flex flex-col justify-center items-center bg-primary w-48 h-14 mt-5 rounded-lg cursor-pointer hover:scale-105 transition-all ease-in-out'>
      {web3EnableError && <h1>{web3EnableError}</h1>}
      {error && <h1>{error}</h1>}
      <button
        className={`text-xl py-3 text-black text-center font-semibold ${
          !loadingWithdrawal ? (isBroke ? 'hidden' : 'flex') : 'hidden'
        } justify-center items-center font-display gap-3`}
        disabled={isWeb3EnableLoading}
        onClick={withdrawAPI}
      >
        Withdraw
        <FiDownloadCloud />
      </button>
      <div
        className={`${
          !loadingWithdrawal ? 'hidden' : 'flex'
        } justify-center items-center transition-all ease-in-out`}
      >
        <h1 className='py-3 text-black font-display text-semibold text-sm pr-2'>
          Withdrawing
        </h1>
        <Loader type='Puff' color='black' height={30} width={30} />
      </div>
      <h1 className={!isBroke ? 'hidden' : 'py-3 text-black font-display'}>
        Nothing to Withdraw!
      </h1>
    </div>
  )
}

export const FetchWithdrawals = () => {
  const { user, web3 } = useMoralis()

  

  const [sortConfig, updateSortConfig] = useState<SortingConfiguration[]>([
    { propertyName: 'createdAt', sortType: SortingType.Descending },
  ])

  const sortBy = useCallback(
    (propertyName: keyof TableData) => {
      let pendingChange = [...sortConfig]
      const index = pendingChange.findIndex(
        (config) => config.propertyName === propertyName
      )
      if (index > -1) {
        //Save the sortType
        let currentSortType = pendingChange[index].sortType
        //Remove existing config
        pendingChange.splice(index, 1)
        //check if the sort type we saved is descending
        if (currentSortType === SortingType.Descending) {
          pendingChange = [
            ...pendingChange,
            { propertyName: propertyName, sortType: SortingType.Ascending },
          ]
        }
      } else {
        pendingChange = [
          ...pendingChange,
          { propertyName: propertyName, sortType: SortingType.Descending },
        ]
      }

      if (pendingChange.length > 1) {
        pendingChange.splice(0, 1)
      }
      updateSortConfig([...pendingChange])
    },
    [sortConfig]
  )

  const [data, setAccounts] = useState([])
  const [accfetched, setaccfetched] = useState(false)

  useEffect(() => {
    if (!accfetched) {
      withdrawalgetter({ setAcc, token:user?.get('token') })
      setaccfetched(true)
    }
  }, [])

  const setAcc = ({ z }: { z: any }) => {
    setAccounts(z)
  }

  let json = JSON.stringify(data, null, 2)

  const withdrawals: WithdrawalClass[] = JSON.parse(json)

  const sortedRows = useMemo(() => {
    //Set up default ordering
    let sorted = linq.from(withdrawals).orderBy(() => 1)

    //Loop through the queue
    sortConfig.forEach((sortConfig) => {
      let propertyName: any = sortConfig.propertyName
      if (sortConfig.propertyName === 'address') {
        propertyName = 'eth_address'
      }
      if (sortConfig.propertyName === 'amount') {
        propertyName = 'amount'
      }
      if (sortConfig.sortType === SortingType.Ascending) {
        sorted = sorted
          .thenBy((dataRow: any) => (dataRow[propertyName] === null ? -1 : 1))
          .thenBy((dataRow: any) => dataRow[propertyName])
      } else {
        sorted = sorted
          .thenByDescending((dataRow: any) =>
            dataRow[propertyName] === null ? -1 : 1
          )
          .thenByDescending((dataRow: any) => dataRow[propertyName])
      }
    })

    return sorted.toArray()
  }, [sortConfig, withdrawals])

  if (sortedRows.length === 0) {
    return (
      <div className='w-full h-72 bg-dark flex justify-center items-center mt-6 text-xl font-display rounded-lg'>
        <h3>No withdrawals have been made yet</h3>
      </div>
    )
  }

  return (
    <table className='text-white bg-dark w-full mt-5 rounded-lg'>
      <tbody>
        <SortableHeader sortBy={sortBy} sortConfig={sortConfig} />
        {sortedRows.map((withdrawal) => {
          let newDate = new Date(withdrawal.created_at)
          return (
            <tr key={withdrawal.hash}>
              <td>{withdrawal.hash}</td>
              <td>{withdrawal.eth_address}</td>
              <td>
                {web3?.utils.fromWei(withdrawal.amount.toString(), 'ether')} ETH
              </td>
              <td>
                {newDate.getDate() +
                  ' ' +
                  monthNames[newDate.getMonth()] +
                  ' ' +
                  newDate.getFullYear() +
                  ' - ' +
                  newDate.getHours() +
                  ':' +
                  (newDate.getMinutes().toString().length == 1
                    ? '0' + newDate.getMinutes()
                    : newDate.getMinutes())}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

interface SortableHeaderProps {
  sortBy: (string: keyof TableData) => void
  sortConfig: SortingConfiguration[]
}

const SortableHeader = ({ sortBy, sortConfig }: SortableHeaderProps) => {
  const tableColumn = [
    { label: 'Hash', property: 'Hash' as keyof TableData },
    { label: 'Address', property: 'eth_address' as keyof TableData },
    { label: 'Amount', property: 'amount' as keyof TableData },
    { label: 'Created At', property: 'created_at' as keyof TableData },
  ]

  const getSortDirection = (property: keyof TableData) => {
    let config = sortConfig.find(
      (sortConfig) => sortConfig.propertyName === property
    )
    return config ? (
      config.sortType === SortingType.Descending ? (
        <MdArrowDropDown className='text-white text-2xl' />
      ) : (
        <MdArrowDropUp className='text-white text-2xl' />
      )
    ) : null
  }

  return (
    <tr className='border-gray-500 border-b-2'>
      {tableColumn.map((column, index) => {
        return (
          <th
            className='cursor-pointer'
            key={index}
            onClick={() => sortBy(column.property)}
          >
            <span className='flex justify-center items-center'>
              {column.label}
              {getSortDirection(column.property)}
            </span>
          </th>
        )
      })}
    </tr>
  )
}
