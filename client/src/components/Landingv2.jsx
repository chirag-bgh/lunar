import shoe2 from './LandingAssets/shoe2.png'
import xbox from './LandingAssets/xbox.png'
import React from 'react'
import { gsap } from 'gsap'
import blob1 from './LandingAssets/blob1.svg'
import blob2 from './LandingAssets/blob2.svg'
import { ReactComponent as Logo1 } from './LandingAssets/ad1.svg'
import { ReactComponent as Logo2 } from './LandingAssets/ad2.svg'
import { ReactComponent as Logo3 } from './LandingAssets/ad3.svg'
import { ReactComponent as Logo4 } from './LandingAssets/ad4.svg'
import polygon from './LandingAssets/polygon.svg'
import background from './LandingAssets/screen.png'
import { IoMdMoon } from 'react-icons/all'
import logo from './LandingAssets/logo.png'
import logo2 from './LandingAssets/logo2.png'
import { AuthenticateButton } from './Auth/AuthManager'

import './extended.css'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    //CARD ANIMATION
    gsap.fromTo(
      '.fade',
      {
        opacity: 0,
        y: -20,
      },

      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: document.querySelector('.first-trigger'),
          start: 'top top',
          end: 'bottom center',
        },
      }
    )

    // ADVANTAGES ANIMATION
    gsap
      .timeline({
        // yes, we can add it to an entire timeline!
        scrollTrigger: {
          trigger: '.trigger',
          pin: true, // pin the trigger element while active
          start: 'top top', // when the top of the trigger hits the top of the viewport
          end: '+=1000', // end after scrolling 500px beyond the start
          scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        },
      })
      .from('.fade-in', {
        scale: 0.3,
        y: 100,
        opacity: 0,
        autoAlpha: 0,
        stagger: 0.1,
      })

    //BG SCREEN ANIMATION
    // gsap.timeline({
    //   // yes, we can add it to an entire timeline!
    //   scrollTrigger: {
    //     trigger: ".top",
    //     pin: true,   // pin the trigger element while active
    //     start: "top top", // when the top of the trigger hits the top of the viewport
    //     end: "+=300", // end after scrolling 500px beyond the start
    //     scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    //   }
    // }).fromTo(".screen", {x:0}, {x:100});

    gsap.fromTo(
      '.card',
      {
        opacity: 0,
        y: -40,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
      }
    )
  }, [])

  return (
    <div>
      <section className='top w-screen h-screen bg-dark flex flex-col'>
        <div className='flex justify-between items-center h-16 w-full mt-3 px-7'>
          <div className='flex justify-center items-center gap-1 mb-1 z-10'>
            <img
              src={logo}
              className=' hidden md:block w-24 absolute ml-12 pt-2'
              alt='Logo'
            />
            <img
              src={logo2}
              className='block md:hidden w-16 absolute ml-6 pt-2'
              alt='Logo2'
            />
          </div>
          <div className='text-white text-lg cursor-pointer z-10 mr-5'>
            <AuthenticateButton />
          </div>
        </div>
        <div className='flex flex-col w-screen h-1/2 justify-center items-center font-display p-4 z-10'>
          <h1 className='text-bold text-3xl md:text-3xl md:mt-12 mt-48 mb-2 text-white align-middle text-center mb-7'>
            Accepting payments with crypto, now easier than ever
          </h1>
          <Link to='dashboard'>
            <div className='bg-primary p-2 rounded-lg mb-44 mt-4 z-10 cursor-pointer'>
              <h1 className='text-dark font-bold text-xs md:text-sm px-2 py-1'>
                Access public beta
              </h1>
            </div>
          </Link>
        </div>
        <img src={blob1} alt='glow' className='absolute bottom-0 right-1' />
        <img src={blob2} alt='glow' className='absolute top-0 -left-12' />
        <div className='absolute flex w-screen h-screen justify-center items-center'>
          <img
            src={background}
            alt='background'
            className='screen mt-56 md:w-1/2 w-128 absolute'
          />
        </div>
        {/* TODO: Fix card alignment issues on smaller width screens */}
        <div className='w-full flex justify-around items-center absolute bottom-0 mb-24'>
          <Card imageSrc={shoe2} price={0.04212} classname=' hidden md:block' />
          <Card imageSrc={xbox} price={0.03734} classname=' hidden md:block' />
        </div>
      </section>
      <section className='w-screen h-full bg-dark p-12 pb-24 first-trigger'>
        <h1 className='font-display text-3xl md:text-7xl font-bold mb-20 text-center'>
          Everything you need to accept cryptocurrency payments
        </h1>
        <div className=' flex justify-center items-center flex-wrap gap-12'>
          <div className=' fade w-52 flex flex-col'>
            <Logo1 alt='Fast' className=' w-12 mb-2' />
            <h1 className='h1 font-display font-bold italic text-xl mb-4'>
              <span className='font-medium not-italic'>Get setup: </span>{' '}
              Lightning fast
            </h1>
            <p>
              With lunar, all you need to get setup as a seller is a Metamask
              wallet.{' '}
            </p>
            <p>No emails. No spam. Forever.</p>
          </div>
          <div className=' fade w-52 flex flex-col'>
            <Logo4 alt='Fast' className='w-12 mb-2' />
            <h1 className='h1 font-display font-bold  text-xl mb-4'>
              Recurring Payments: Yes, with crypto.
            </h1>
            <p>
              With Smart Invoices, customers can receive notifications to their
              email address whenever their next subscription fee is due.
              Re-subscribe with the click of a button.
            </p>
          </div>
          <div className='fade  w-52 flex flex-col'>
            <Logo2 alt='Fast' className='w-12 mb-2' />
            <h1 className='h1 font-display font-bold  text-xl mb-4'>
              Withdrawals to Metamask
            </h1>
            <p>
              Withdraw earnings to your Metamask wallet at minimal GAS fees.
              It’s that easy.{' '}
            </p>
          </div>
          <div className=' fade w-52 flex flex-col'>
            <Logo3 alt='Fast' className='w-12 mb-2' />
            <h1 className='h1 font-display font-bold  text-xl mb-4'>
              One click deployment: Couldn’t get easier{' '}
            </h1>
            <p>
              With every product that you enlist on lunar, you receive an HTTPS
              endpoint. This re-directs customers directly to our payment
              portal.
            </p>
          </div>
        </div>
      </section>
      <section className='trigger h-screen'>
        <div className='absolute grid grid-cols-3 place-items-center text-center md:gap-24 gap-12 w-screen h-screen'>
          <h1 className='fade-in font-semibold md:text-2xl text-sm text-gray-600 pl-10 md:pl-0'>
            Customer Management
          </h1>
          <h1 className='fade-in font-semibold md:text-2xl text-sm text-gray-600 '>
            One-time charges
          </h1>
          <h1 className='fade-in font-semibold md:text-2xl text-sm text-gray-600'>
            Custom callbacks
          </h1>
          <h1 className='fade-in font-semibold md:text-2xl text-sm text-gray-600'>
            Hosted payment pages
          </h1>

          <h1 className='font-display text-black text-4xl md:text-7xl font-bold'>
            And more
          </h1>

          <h1 className='fade-in font-semibold md:text-2xl text-sm text-gray-600'>
            Invoicing
          </h1>
          <h1 className='fade-in font-semibold md:text-2xl text-sm text-gray-600'>
            Custom Webhooks
          </h1>
          <h1 className='fade-in font-semibold md:text-2xl text-sm text-gray-600'>
            Comprehensive Analytics
          </h1>
        </div>
      </section>
      <section className='w-screen h-screen bg-dark relative m-0'>
        <div className='div w-screen h-screen flex flex-col justify-start items-center'>
          <img src={polygon} alt='PolygonLogo' className='w-1/5 mt-24 pb-5' />
          <h1 className='font-display md:text-7xl text-2xl font-bold mb-24'>
            Powered by Polygon.
          </h1>
          <p className='w-3/5 font-display text-semibold text-md md:text-2xl font-medium flex-wrap'>
            On release, lunar will be deployed on Polygon PoS blockchain, making
            GAS fees cheap while also keeping your transactions secure
          </p>
        </div>
      </section>
      <section className=' h-80 w-screen bg-background flex justify-center items-center'>
        <h1 className=' font-display font-bold md:text-xl text-lg p-4 text-center'>
          A project proudly made{' '}
          <a href='https://github.com/tisbganggangdapp' className=' underline'>
            open-source
          </a>{' '}
          by{' '}
          <a href='https://twitter.com/aaryadoestech' className='text-primary'>
            @aaryadoestech
          </a>
          ,{' '}
          <a href='https://twitter.com/ZaphodElevated' className='text-primary'>
            @ZaphodElevated
          </a>{' '}
          and{' '}
          <a href='https://twitter.com/RaghavSaraf17' className='text-primary'>
            @RaghavSaraf17
          </a>
        </h1>
      </section>
    </div>
  )
}

const Card = ({ imageSrc, price, classname }) => {
  return (
    <div
      className={
        'card flex flex-col w-3/12 justify-center items-center p-6 rounded-lg ' +
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
