import { useMoralis, useNewMoralisObject } from 'react-moralis'

export const Withdraw = ({
  amount,
  address,
  sender,
}: {
  amount: number
  address: string
  sender: string
}) => {
  const { user, web3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } =
    useMoralis()

  const { error, save } = useNewMoralisObject('Withdrawals')

  if (!isWeb3Enabled) {
    return <h1>Web3 not enabled for some reason</h1>
  }

  return (
    <div className='flex flex-col justify-center items-center mt-5 w-60 h-30 bg-dark rounded-lg cursor-pointer hover:shadow-primary transition-shadow ease-in-out'>
      {web3EnableError && <h1>{web3EnableError}</h1>}
      {error && <h1>{error}</h1>}
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

          console.log('balance: ', balance)
          console.log('account address: ', accountAddress)
          console.log('eth address: ', ethAddress)
          console.log('privateKeyOG: ', privateKeyOG)
          console.log('gasPrice: ', gasPrice)
          console.log('valueToBeSent: ', valueToBeSent)
          console.log('FINAL: ', valueToBeSent + txFee)

          const txParams = {
            to: ethAddress,
            gas: web3.utils.toHex(gasPrice * 21000),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex('21000'),
            value: web3.utils.toHex(valueToBeSent),
          }
          var account = web3.eth.accounts.wallet.add(privateKeyOG)

          let signedTx = account.signTransaction(txParams)

          web3.eth
            .sendSignedTransaction((await signedTx).rawTransaction)
            .then(() => {
              console.log('Successfully Withdrew', balance, ' WEI')
              save({ ethAddress, balance, user })
            })
        }}
      >
        Withdraw
      </button>
    </div>
  )
}
