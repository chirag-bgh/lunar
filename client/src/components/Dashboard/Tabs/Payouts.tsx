import metamask from '../../../assets/metamask.svg';

const Payouts = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col justify-between items-start'>
        <h2 className='text-3xl underline font-medium'>Wallets</h2>
      </div>
      <div className="Card w-48 h-64 bg-dark flex-col space-between rounded-lg stroke-primary">
        <img src={metamask} alt="" />
        <h1>Your Metamask wallet</h1>
        <h3>0x335301C43a5319fd890</h3>
        <h1>2.4 ETH</h1>
      </div>
    </div>
  )
}

export default Payouts
