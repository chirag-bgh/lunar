import shoe2 from './LandingAssets/shoe2.png'
import xbox from './LandingAssets/xbox.png'
import blob1 from './LandingAssets/blob1.svg'
import blob2 from './LandingAssets/blob2.svg'
import background from './LandingAssets/background.svg'
import { IoMdMoon, BsArrowLeftShort } from 'react-icons/all'
import { AuthenticateButton } from './Auth/AuthManager'

import './extended.css'

import { Ref, useEffect, useRef } from 'react'

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

  useEffect(() => {
    const card = document.querySelector('.card')
    const title = document.querySelector('.title')
    const sneaker = document.querySelector('.image')

    card.addEventListener('mousemove', (e) => {
      let xAxis = (window.innerWidth / 2 - e.pageX) / 15
      let yAxis = (window.innerHeight / 2 - e.pageY) / 15
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
    })
    //Animate In
    card.addEventListener('mouseenter', (e) => {
      card.style.transition = 'none'
      //Popout
      title.style.transform = 'translateZ(100px)'
      sneaker.style.transform = 'translateZ(100px) rotateZ(-20deg)'
    })
    //Animate Out
    card.addEventListener('mouseleave', (e) => {
      card.style.transition = 'all 0.5s ease'
      card.style.transform = `rotateY(0deg) rotateX(0deg)`
      //Popback
      title.style.transform = 'translateZ(0px)'
      sneaker.style.transform = 'translateZ(0px) rotateZ(0deg)'
    })
  })

  return (
    <section className='w-screen h-screen bg-dark flex flex-col'>
      <div className='flex justify-between items-center w-full mt-3 px-7'>
        <div className='flex justify-center items-center gap-1'>
          <IoMdMoon className='text-2xl text-white' />
          <p className='text-2xl font-medium'>lunar</p>
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
  )
}

const Card = ({ imageSrc, price, classname }) => {
  return (
    <div
      className={
        'absolute card flex flex-col w-3/12 justify-center items-center p-6 rounded-lg ' +
        classname
      }
    >
      <h1 className='title font-display font-bold text-2xl mr-auto'>
        {price} <span className='text-primary'>ETH</span>
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
