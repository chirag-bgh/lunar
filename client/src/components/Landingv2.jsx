import shoe2 from "./LandingAssets/shoe2.png";
import xbox from "./LandingAssets/xbox.png";
import blob1 from "./LandingAssets/blob1.svg";
import blob2 from "./LandingAssets/blob2.svg";
import {ReactComponent as Logo1} from "./LandingAssets/ad1.svg"
import {ReactComponent as Logo2} from "./LandingAssets/ad2.svg"
import {ReactComponent as Logo3} from "./LandingAssets/ad3.svg"
import {ReactComponent as Logo4} from "./LandingAssets/ad4.svg"
import background from "./LandingAssets/background.svg";
import { IoMdMoon, BsArrowLeftShort } from "react-icons/all";
import { AuthenticateButton } from "./Auth/AuthManager";

import './extended.css'

import { useEffect } from 'react'

import { Link } from 'react-router-dom'
// import React from "react";
// import {gsap} from "gsap"

const Landingv2 = () => {
  //     // store a reference to the box div
  //   const boxRef = useRef();
  //   const card1 = useRef();
  //   const card2 = useRef();

  //   // wait until DOM has been rendered
  //   useEffect(() => {
  //     gsap.to(boxRef.current, { rotation: "+=360" });
  //   });


  return (
    <div>
    <section className="w-screen h-screen bg-dark flex flex-col ">
      <div className="flex justify-between items-center w-full mt-3 px-7">
        <div className="flex justify-center items-center gap-1">
          <IoMdMoon className="text-2xl text-white" />
          <p className="text-2xl font-medium">lunar</p>
        </div>
        <div className='text-white text-lg cursor-pointer z-10'>
          <AuthenticateButton />
        </div>
      </div>
      <div className='flex flex-col w-screen h-1/2 justify-center items-center font-display p-4 z-10'>
        <h1 className='text-bold text-3xl mt-auto mb-12 text-white'>
          Accepting payments with crypto, now easier than ever
        </h1>
        <Link to='dashboard'>
          <div className='bg-primary p-3 rounded-lg mb-44 z-10 cursor-pointer'>
            <h1 className='text-dark font-bold'>Get Started</h1>
          </div>
        </Link>
      </div>
      <img src={blob1} alt='glow' className='absolute bottom-0 right-1' />
      <img src={blob2} alt='glow' className='absolute top-0 -left-12' />
      <div className='absolute flex w-screen h-screen justify-center items-center'>
        <img
          src={background}
          alt='background'
          className='screen mt-56 w-6/12'
        />
      </div>
      {/* TODO: Fix card alignment issues on smaller width screens */}
      <Card
        imageSrc={shoe2}
        price={0.04212}
        classname='bottom-0 right-1 mr-44 mb-44'
      />
      <Card
        imageSrc={xbox}
        price={0.03734}
        classname=' bottom-0 left-1 ml-52 mb-64'
      />
    </section>
    <section className="w-screen h-full bg-dark p-12">
      <h1 className="font-display text-7xl font-bold mb-24">Everything you need to accept cryptocurrency payments</h1>
      <div className=" flex justify-start items-start flex-wrap gap-12">
        <div className="w-2/5 flex flex-col">
            <Logo1 alt="Fast" className="w-12 mb-2"/>
            <h1 className="h1 font-display font-bold italic text-xl mb-4"> <span className="font-medium not-italic">Get setup: </span> Lightning fast</h1>
            <p>With lunar, all you need to get setup as a seller is a Metamask wallet. </p>
            <p>No emails. No spam. Forever.</p>
        </div>
        <div className="w-2/5 flex flex-col">
        <Logo2 alt="Fast" className="w-12 mb-2"/>
            <h1 className="h1 font-display font-bold  text-xl mb-4">Recurring Payments: Yes, with crypto.</h1>
            <p>With Smart Invoices, customers can receive notifications to their email whenever their next subscription fee is due. Re-subscribe with the click of a button.</p>
        </div>
        <div className="w-2/5 flex flex-col">
        <Logo3 alt="Fast" className="w-12 mb-2"/>
          <h1 className="h1 font-display font-bold  text-xl mb-4">Withdrawals to Metamask</h1>
            <p>Withdraw earnings to your Metamask wallet at minimal GAS fees. It’s that easy. </p>
        </div>
        <div className="w-2/5 flex flex-col">
        <Logo4 alt="Fast" className="w-12 mb-2"/>
            <h1 className="h1 font-display font-bold  text-xl mb-4">One click deployment: Couldn’t get easier </h1>
            <p>With every product that you enlist on lunar, you receive an HTTPS endpoint. This re-directs customers directly to our payment portal.</p>
        </div>
      </div>
    </section>
    <section className="w-screen h-screen bg-white p-12 relative">
      <h1 className=" absolute font-semibold text-xl text-gray-600 top-1 left-0 m-56">Customer Management</h1>
      <h1 className=" absolute font-semibold text-xl text-gray-600 bottom-0 left-0 m-32">One-time charges</h1>
      <h1 className=" absolute font-semibold text-xl text-gray-600 top-0 right-0 m-28">Custom callbacks</h1>
      <h1 className=" absolute font-semibold text-xl text-gray-600 bottom-0 left-0 m-64">Hosted payment pages</h1>
      <h1 className=" absolute font-semibold text-xl text-gray-600 top-0 right-0 m-52">Invoicing</h1>
      <h1 className=" absolute font-semibold text-xl text-gray-600 bottom-0 right-0  m-56">Custom Webhooks</h1>
      <h1 className=" absolute font-semibold text-xl text-gray-600 top-0 left-1/2  mt-32">Comprehensive Analytics</h1>
      <div className="flex justify-center items-center w-full h-full">
        <h1 className=" font-display text-black text-6xl font-bold">And more</h1>
      </div>
    </section>
    </div>
  );
};

const Card = ({ imageSrc, price, classname }) => {
  return (
    <div
      className={
        'absolute card flex flex-col w-3/12 justify-center items-center p-6 rounded-lg ' +
        classname
      }
    >
      <h1 className='title font-display font-bold text-2xl mr-auto'>
        {price} <span className='text-primary'>MATIC</span>
      </h1>
      <img src={imageSrc} alt='shoe' className='w-52 image' />
      <div className='flex flex-col justify-center items-center bg-primary rounded-lg text-dark w-full h-24'>
        <h1 className='font-display text-dark text-xl font-bold mt-8'>
          Pay in crypto
        </h1>
        <div className='flex text-sm flex-shrink text-dark font-medium mb-1 mt-auto justify-center items-center'>
          <IoMdMoon />
          <h1 className='text-dark'>lunar</h1>
        </div>
      </div>
    </div>
  )
}

export default Landingv2
