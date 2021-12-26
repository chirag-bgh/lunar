import { useCallback, useMemo, useState } from 'react'
import { useMoralis, useMoralisQuery, useNewMoralisObject } from 'react-moralis'

import CryptoJS from 'crypto-js'

// Sorting Library
import linq from 'linq'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { FiDownloadCloud } from 'react-icons/fi'
import { WithdrawalClass } from '../classes/WithdrawalClass'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { ethers } from 'ethers'

declare const window: any

import Loader from 'react-loader-spinner'

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
    let encryptedKey = user?.get('encryptedKey')
    var bytes = CryptoJS.AES.decrypt(
      encryptedKey,
      process.env.NEXT_PUBLIC_PASSWORD as string
    )
    var privateKeyOG = bytes.toString(CryptoJS.enc.Utf8)
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
    var txFee: any = gasPrice * 21000

    let valueToBeSent: any = balance - txFee

    if (valueToBeSent > 0) {
      setIsBroke(false)

      console.log('balance: ', balance)
      console.log('account address: ', accountAddress)
      console.log('eth address: ', ethAddress)
      console.log('privateKeyOG: ', privateKeyOG)
      console.log('gasPrice: ', gasPrice)
      console.log('valueToBeSent: ', valueToBeSent)
      console.log('FINAL: ', valueToBeSent + txFee)

      const txParams = {
        to: ethAddress,
        gas: web3?.utils.toHex(gasPrice * 21000),
        gasPrice: web3?.utils.toHex(gasPrice),
        gasLimit: web3?.utils.toHex('21000'),
        value: web3?.utils.toHex(valueToBeSent),
        // nonce: 0,
      }

      const provider = ethers.providers.getDefaultProvider(3)

      var account = web3?.eth.accounts.wallet.add(privateKeyOG)

      console.log('Signing Transaction')

      let signedTx = await account?.signTransaction(txParams)

      console.log('Succesfully Signed Transaction')

      setIsLoadingWithdrawal(true)

      console.log('Withdawing Balance')

      await provider
        .sendTransaction(signedTx?.rawTransaction as string)
        .then(() => {
          console.log('Successfully Withdrew', balance, ' WEI')

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

  return (
    <div className='flex flex-col justify-center items-center bg-primary w-48 h-14 mt-5 rounded-lg cursor-pointer hover:shadow-primary transition-all ease-in-out'>
      {web3EnableError && <h1>{web3EnableError}</h1>}
      {error && <h1>{error}</h1>}
      <button
        className={`text-xl py-3 text-black text-center font-semibold ${
          !loadingWithdrawal ? (isBroke ? 'hidden' : 'flex') : 'hidden'
        } justify-center items-center font-display gap-3`}
        disabled={isWeb3EnableLoading}
        onClick={withdrawTransaction}
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
        var currentSortType = pendingChange[index].sortType
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

  const { data } = useMoralisQuery('Withdrawals', (query) =>
    query.equalTo('user', user?.id)
  )

  let json = JSON.stringify(data, null, 2)

  const withdrawals: WithdrawalClass[] = JSON.parse(json)

  const sortedRows = useMemo(() => {
    //Set up default ordering
    let sorted = linq.from(withdrawals).orderBy(() => 1)

    //Loop through the queue
    sortConfig.forEach((sortConfig) => {
      let propertyName: any = sortConfig.propertyName
      if (sortConfig.propertyName === 'address') {
        propertyName = 'ethAddress'
      }
      if (sortConfig.propertyName === 'amount') {
        propertyName = 'balance'
      }
      if (sortConfig.propertyName === 'id') {
        propertyName = 'objectId'
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

  return (
    <table className='text-white bg-dark w-full mt-5 rounded-lg'>
      <tbody>
        <SortableHeader sortBy={sortBy} sortConfig={sortConfig} />
        {sortedRows.map((withdrawal) => {
          let newDate = new Date(withdrawal.createdAt)
          return (
            <tr key={withdrawal.objectId}>
              <td>{withdrawal.objectId}</td>
              <td>{withdrawal.ethAddress}</td>
              <td>
                {web3?.utils.fromWei(withdrawal.balance.toString(), 'ether')}{' '}
                ETH
              </td>
              <td>{newDate.toString()}</td>
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
    { label: 'ID', property: 'id' as keyof TableData },
    { label: 'Address', property: 'address' as keyof TableData },
    { label: 'Amount', property: 'amount' as keyof TableData },
    { label: 'Created At', property: 'createdAt' as keyof TableData },
  ]

  const getSortDirection = (property: keyof TableData) => {
    var config = sortConfig.find(
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
