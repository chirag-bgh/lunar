import { useMoralis } from 'react-moralis'
// import Moralis from 'moralis'

import Common, { Chain } from '@ethereumjs/common'
import { Transaction } from '@ethereumjs/tx'

// {amount,address}:{amount:number, address:string}

export const Withdraw = ({
  amount,
  address,
  sender,
}: {
  amount: number
  address: string
  sender: string
}) => {
  // const { fetch } = useWeb3Transfer({
  //   amount: Moralis.Units.ETH(amount),
  //   receiver: address,
  //   type: 'native',
  // })

  const { user, web3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } =
    useMoralis()

  if (!isWeb3Enabled) {
    return <h1>Web3 not enabled for some reason</h1>
  }

  // web3.setProvider()

  // return fetch()
  return (
    <div className='flex flex-col justify-center items-center mt-5 w-60 h-30 bg-dark rounded-lg cursor-pointer hover:shadow-primary transition-shadow ease-in-out'>
      {web3EnableError && <h1>{web3EnableError}</h1>}
      <button
        className='text-3xl py-5 text-primary text-center font-semibold flex justify-center items-center w-full h-full font-display'
        disabled={isWeb3EnableLoading}
        onClick={async () => {
          let accountAddress = user.get('managed_account_pub')
          let privateKeyOG = user.get('managed_account_priv')
          let ethAddress = user.get('ethAddress')

          let balance: any = await web3.eth.getBalance(accountAddress)

          let gasPrice: any = await web3.eth.getGasPrice()
          var txFee: any = gasPrice * 21000

          let valueToBeSent: any = balance - txFee
          let valueToBeSentStr: string = '0x' + valueToBeSent.toString()

          let realGasFee: string = '0x' + txFee.toString()

          console.log('balance: ', balance)
          console.log('account address: ', accountAddress)
          console.log('eth address: ', ethAddress)
          console.log('privateKeyOG: ', privateKeyOG)
          console.log('realGasFee: ', txFee)
          console.log('valueToBeSent: ', valueToBeSent)
          console.log('FINAL: ', valueToBeSent + txFee)

          const txParams = {
            // from: accountAddress,
            to: ethAddress,
            // nonce: '0x00',
            gasPrice: realGasFee,
            // gasLimit: '0x21000',
            value: valueToBeSentStr,
          }

          const common = new Common({ chain: Chain.Ropsten })
          const tx = Transaction.fromTxData(txParams, { common })

          const privateKey = Buffer.from(
            '8caefa396c7b9d751ba04ffc4ec34c459bd1e5672558b3fce03bf4e6b0343d94',
            'hex'
          )

          const signedTx = tx.sign(privateKey)

          const serializedTx = signedTx.serialize()

          console.log('serializedTx: ', serializedTx)

          web3.eth
            .sendSignedTransaction('0x' + serializedTx.toString('hex'))
            .on('receipt', () => {})

          // web3.eth.sendTransaction(
          //   {
          //     from: '0x188A77ecdd4A50774D26772617cc77f200961760',
          //     to: '0xCA10ae35C3693B2e7eFB1dAbeB8015Dd8bAa5769',
          //     value: 455000000000000000,
          //     chain: 'ropsten',
          //     // chainId: 3,
          //   },
          //   (err, res) => {
          //     if (err) {
          //       console.log('error: ', err)
          //     }
          //     console.log('result: ', res)
          //   }
          // )
        }}
      >
        Withdraw
      </button>
    </div>
  )
}

// const WithdrawButton = ({ objectID }: { objectID: string }) => {
//   const { data } = useMoralisQuery('Products', (query) =>
//     query.equalTo('objectID', objectID)
//   )
//   let json = JSON.stringify(data, null, 2)
//   return (
//     <div>
//       <button onClick={() => Withdraw}>Withdraw</button>
//     </div>
//   )
// }

// export { Withdraw }
