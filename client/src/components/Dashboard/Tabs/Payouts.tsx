import metamask from '../../../assets/metamask.svg';
import {BsFillArrowDownCircleFill} from 'react-icons/all'
import { useState } from 'react';


const Payouts = () => {

  const [selected, setSelected] = useState("0x335301C43a5319fd890")

  return (
    <div className='w-full'>
      <div className='flex flex-col justify-between items-start'>
        <h2 className='text-3xl underline font-medium'>Wallets</h2>
      </div>

      <div className="flex flex-wrap gap-8 items-center">
        <div onClick={() => setSelected("0x335301C43a5319fd890")}>
          <Card address="0x335301C43a5319fd890" balance={2.4} selected={selected==="0x335301C43a5319fd890"?true:false}/>
        </div>
        <div onClick={() => setSelected("0x335301C43a5319fd891")}>
          <Card address="0x335301C43a5319fd891" balance={1.2} selected={selected==="0x335301C43a5319fd891"?true:false}/>
        </div>
        <div className=" bg-primary hover:shadow-primary rounded-full w-24 h-24 text-7xl font-display flex justify-center items-center cursor-pointer transition-shadow ease-in-out">
        <h1 className="text-dark">+</h1>
        </div>
      </div>

      <div className='flex flex-col mt-12 justify-between items-start'>
        <h2 className='text-3xl underline font-medium'>Payouts</h2>
      </div>

      <div className="flex flex-col justify-center items-center mt-5 w-60 h-30 bg-dark rounded-lg cursor-pointer hover:shadow-primary transition-shadow ease-in-out">
        <h1 className="text-3xl mb-10 text-primary text-center font-semibold ">Withdraw</h1>
      </div>
      

      <div className='flex flex-col mt-12 justify-between items-start'>
        <h2 className='text-3xl underline font-medium'>Past Withdrawals</h2>
      </div>
      <table className="text-white bg-dark w-full mt-5 rounded-lg">
        <tr className="border-gray-500 border-b-2">
          <th>ID</th>
          <th>Address</th>
          <th>Amount</th>
          <th>Date</th>
          </tr>
          <tr className="h-80">
            <td></td>
            </tr>
      </table>
      <div className="bg-primary p-5 mt-2 flex justify-center items-center w-32 h-12 gap-1 rounded-lg cursor-pointer">
        <h1 className="text-dark font-display font-semibold">Invoice</h1>
        <BsFillArrowDownCircleFill className='text-dark text-xl'/>
      </div>
    <div className="flex mt-7 mb-7 justify-center items-center">
      <h1 className="text-white font-display font-semibold">Need help? Contact us at <span className="text-bold text-primary cursor-pointer">teamlunar@protonmail.com</span></h1>
    </div>
      
    </div>
  )
}

const Card = ({address, balance, selected}:{address:string, balance:number, selected:boolean}) => {
  return (
      <div className={"p-1 mt-4 w-48 h-64 bg-dark flex flex-col justify-around text-center rounded-lg cursor-pointer transition-all" + (selected ? " outline-primary" : "")}>
        <img className=" h-20" src={metamask} alt="" />
        <h1>Your Metamask wallet</h1>
        <h3 className="  text-gray-400 text-sm font-display -mt-8">{address}</h3>
        <h1 className="text-3xl font-semibold">{balance} ETH</h1>
      </div>
  )
}

export default Payouts
