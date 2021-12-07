import metamask from '../../../assets/metamask.svg';
import { useState } from 'react';


const Payouts = () => {

  const [selected, setSelected] = useState("0x335301C43a5319fd890")

  return (
    <div className='w-full'>
      <div className='flex flex-col justify-between items-start'>
        <h2 className='text-3xl underline font-medium'>Wallets</h2>
      </div>
      <div className="flex gap-8">
        <div onClick={() => setSelected("0x335301C43a5319fd890")}>
          <Card address="0x335301C43a5319fd890" balance={2.4} selected={selected==="0x335301C43a5319fd890"?true:false}/>
        </div>
        <div onClick={() => setSelected("0x335301C43a5319fd891")}>
          <Card address="0x335301C43a5319fd891" balance={1.2} selected={selected==="0x335301C43a5319fd891"?true:false}/>
        </div>
      </div>
      
    </div>
  )
}

const Card = ({address, balance, selected}:{address:string, balance:number, selected:boolean}) => {
  return (
      <div className={"p-1 mt-4 w-48 h-64 bg-dark flex flex-col justify-around text-center rounded-lg cursor-pointer" + (selected ? " outline-primary" : "")}>
        <img className=" h-20" src={metamask} alt="" />
        <h1>Your Metamask wallet</h1>
        <h3 className="  text-gray-400 text-sm font-display -mt-8">{address}</h3>
        <h1 className="text-3xl font-semibold">{balance} ETH</h1>
      </div>
  )
}

export default Payouts
