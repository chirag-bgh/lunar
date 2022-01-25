import React, { useState } from 'react'
import { gsap } from 'gsap'
import { AuthenticateButton } from './Auth/AuthManager'
// import { WaitlistModal } from './Modals/WaitlistModal'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useEffect } from 'react'

import { useRouter } from 'next/router'
import useMobileDetect from '../backend/MobileDetect'
import {MdOutlineErrorOutline} from 'react-icons/md'

const Landing = ({ alertUser = false, redirect = false }) => {
  const router = useRouter()

  const currentDevice = useMobileDetect()

  const isMobile = currentDevice.isMobile()

  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    if (redirect) {
      router.push('/')
    }

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
          start: 'top center',
          end: 'bottom center',
        },
      }
    )

    // ADVANTAGES ANIMATION
    if (!isMobile)
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

    setTimeout(() => {
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
    }, 200)
  }, [alertUser, redirect])

  const [popupState, setPopupState] = useState(false)
  return (
    <div>
      <section
        className='top w-screen h-screen bg-dark flex flex-col overflow-x-hidden'
        id='section1'
      >
        <div className='flex justify-between items-center h-16 w-full mt-3 px-4 md:px-7'>
          <div className='flex justify-center items-center gap-1 mb-1 z-10'>
            <img
              src='/LandingAssets/logo.png'
              className='hidden md:block w-24 absolute ml-12 pt-2'
              alt='Logo'
            />
            <img
              src='/LandingAssets/logo2.png'
              className='block md:hidden w-16 absolute ml-6 pt-2'
              alt='Logo2'
            />
          </div>
          <div
            className={`absolute top-5 ${
              alertUser ? 'flex' : 'hidden'
            } justify-center items-center w-full`}
          >
            {(popupState === true) ? <div className="error-msg flex justify-center items-center w-fit top-9 transition-transform">
              <MdOutlineErrorOutline className='mr-2'></MdOutlineErrorOutline>
                LunarPay requires the Metamask extension in order to authenticate
            </div> : <span></span>}
          </div>
          <div className='flex justify-center items-center'>
            <div className='text-white text-lg cursor-pointer z-10 mr-7'>
              <a
                href='https://docs.lunarpay.in/docs/intro'
                target='_blank'
                rel='noreferrer'
                className='rounded-sm flex justify-center items-center font-medium font-display cursor-pointer text-lg md:text-md'
              >
                Docs
              </a>
            </div>
            <div className='text-white text-lg cursor-pointer z-10 mr-5'>
              {alertUser ? <h1 onMouseOver={()=>setPopupState(true)} onMouseLeave={()=>setPopupState(false)} className='text-gray-500'>Authenticate</h1>  :<AuthenticateButton/>}
            </div>
            
          </div>
        </div>

        <div className='flex flex-col w-screen h-screen md:h-1/2 justify-center items-center font-display p-4 z-10'>
          <h1 className='text-bold text-4xl md:text-4xl md:mt-12 mt-48 text-white align-middle text-center mb-7'>
            Accepting recurring crypto payments, now easier than ever.
          </h1>
          <div className='flex justify-center items-center gap-4 w-full md:w-auto'>
            <a
              href='https://www.getrevue.co/profile/paylunar'
              target='_blank'
              rel='noreferrer'
              className='bg-primary p-2 rounded-lg mb-44 mt-4 z-10 cursor-pointer w-4/5 md:w-auto'
            >
              <span className='text-dark font-bold text-xs md:text-sm px-2 py-1 flex justify-center items-center mt-0.5'>
                Join Waitlist!
              </span>
            </a>
          </div>
        </div>
        <img
          src='/LandingAssets/blob1.svg'
          alt='glow'
          className='absolute bottom-0 right-1'
        />
        <img
          src='/LandingAssets/blob2.svg'
          alt='glow'
          className='absolute top-0 -left-12'
        />
        <div className='absolute w-screen h-screen justify-center items-center hidden md:flex'>
          <img
            src='/LandingAssets/screen.png'
            alt='background'
            className='mt-56 md:w-1/2 w-128 absolute mix-blend-screen rounded-md overflow-x-hidden p-2'
          />
        </div>
        {/* TODO: Fix card alignment issues on smaller width screens */}
        <div className='w-full flex justify-around items-center absolute bottom-0 mb-24'>
          <Card
            imageSrc='/LandingAssets/shoe2.png'
            price={55.042}
            classname=' hidden md:block'
          />
          <Card
            imageSrc='/LandingAssets/xbox.png'
            price={64.174}
            classname=' hidden md:block'
          />
        </div>
      </section>
      <section
        className='w-screen h-full md:h-screen bg-dark p-12 pb-24 first-trigger flex flex-col justify-evenly items-center'
        id='section2'
      >
        <h2 className='font-display mb-12 md:mb-0 text-3xl md:text-6xl font-bold text-left md:text-center'>
          Everything you need to accept cryptocurrency payments
        </h2>
        <div className='flex justify-start items-start flex-wrap gap-12'>
          <div className=' fade md:w-52 flex flex-col'>
            <img
              src='/LandingAssets/icon1.svg'
              alt='Fast'
              className='hidden md:block w-12 mb-2'
            />
            <h4 className='font-display font-bold md:italic text-xl mb-4'>
              <span className='not-italic font-bold md:font-medium'>
                Get setup:{' '}
              </span>{' '}
              Lightning fast
            </h4>
            <p>
              With LunarPay, all you need to get setup as a seller is a Metamask
              wallet.{' '}
            </p>
            <p>No emails. No spam. Forever.</p>
          </div>
          <div className='fade md:w-52 flex flex-col'>
            <img
              src='/LandingAssets/icon4.svg'
              alt='Fast'
              className='w-12 mb-2 hidden md:block'
            />
            <h4 className='font-display font-bold  text-xl mb-4'>
              Recurring Payments: Yes, with crypto.
            </h4>
            <p>
              With Smart Invoices, customers can receive notifications to their
              email address whenever their next subscription fee is due.
              Re-subscribe with the click of a button.
            </p>
          </div>
          <div className='fade md:w-52 flex flex-col'>
            <img
              src='/LandingAssets/icon2.svg'
              alt='Fast'
              className='w-12 mb-2 hidden md:block'
            />
            <h4 className='font-display font-bold  text-xl mb-4'>
              Withdrawals to Metamask
            </h4>
            <p>
              Withdraw earnings to your Metamask wallet at minimal GAS fees.
              It’s that easy.{' '}
            </p>
          </div>
          <div className=' fade md:w-52 flex flex-col'>
            <img
              src='/LandingAssets/icon3.svg'
              alt='Fast'
              className='hidden md:block w-12 mb-2'
            />
            <h4 className='font-display font-bold  text-xl mb-4'>
              One click deployment: Couldn’t get easier{' '}
            </h4>
            <p>
              With every product that you enlist on LunarPay, you receive an
              HTTPS endpoint. This re-directs customers directly to our payment
              portal.
            </p>
          </div>
        </div>
      </section>
      <section className='trigger h-screen' id='section3'>
        <div className='absolute grid grid-cols-3 place-items-center text-center md:gap-24 gap-12 w-screen h-screen p-5 md:p-2'>
          <h5 className='fade-in font-display font-semibold md:text-2xl text-sm text-gray-600 pl-10 md:pl-0'>
            Customer Management
          </h5>
          <h5 className='fade-in font-display font-semibold md:text-2xl text-sm text-gray-600'>
            One-time charges
          </h5>
          <h5 className='fade-in font-display font-semibold md:text-2xl text-sm text-gray-600'>
            Custom callbacks
          </h5>
          <h5 className='fade-in font-display font-semibold md:text-2xl text-sm text-gray-600'>
            Hosted payment pages
          </h5>

          <h2 className='font-display text-black text-4xl md:text-7xl font-bold'>
            And more
          </h2>

          <h5 className='fade-in font-display font-semibold md:text-2xl text-sm text-gray-600'>
            Invoicing
          </h5>
          <h5 className='fade-in font-display font-semibold md:text-2xl text-sm text-gray-600'>
            Custom Webhooks
          </h5>
          <h5 className='fade-in font-display font-semibold md:text-2xl text-sm text-gray-600'>
            Comprehensive Analytics
          </h5>
          <h5 className='fade-in font-display font-semibold md:text-2xl text-sm text-gray-600'>
            Subscription Management
          </h5>
        </div>
      </section>
      <section className='w-screen h-screen bg-dark relative m-0' id='section4'>
        <div className='div w-screen h-screen flex flex-col justify-start items-center'>
          <img
            src='/LandingAssets/polygon.svg'
            alt='PolygonLogo'
            className='w-1/5 mt-24 pb-5'
          />
          <h3 className='font-display md:text-7xl text-2xl font-bold mb-24'>
            Powered by Polygon.
          </h3>
          <p className='w-3/5 font-display text-semibold text-md md:text-2xl font-medium flex-wrap'>
            On release, <span className='font-bold'>Lunar</span>Pay will be
            deployed on Polygon PoS blockchain, making GAS fees cheap while also
            keeping your transactions secure
          </p>
        </div>
      </section>
      <section
        className='h-80 w-screen bg-background flex justify-center items-center'
        id='footer'
      >
        <h3 className=' font-display font-medium tracking-wide md:text-xl text-lg p-4 text-center'>
          A project proudly made by{' '}
          <a href='https://twitter.com/aaryadoestech' className='text-primary'>
            @aaryadoestech
          </a>
          ,{' '}
          <a href='https://twitter.com/0xPranavDoshi' className='text-primary'>
            @0xPranavDoshi
          </a>{' '}
          and{' '}
          <a href='https://twitter.com/RaghavSaraf17' className='text-primary'>
            @RaghavSaraf17
          </a>
        </h3>
      </section>
    </div>
  )
}

const Card = ({ imageSrc, price, classname }: any) => {
  return (
    <div
      style={{
        transformStyle: 'preserve-3d',
        boxShadow:
          '0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2)',
        background:
          'linear-gradient(148.68deg,rgba(255, 255, 255, 0.37) -84.95%,rgba(255, 255, 255, 0) 87.71%)',
        WebkitBackdropFilter: 'blur(10px)',
        backdropFilter: 'blur(10px)',
      }}
      className={
        'card flex flex-col w-3/12 justify-center items-center p-6 rounded-lg' +
        classname
      }
    >
      <h4 className='title text-white font-display font-bold text-2xl mr-auto'>
        {price} <span className='text-primary'>MATIC</span>
      </h4>
      <img
        src={imageSrc}
        alt='shoe'
        className='w-52'
        style={{
          zIndex: 2,
          transition: 'all 0.75s ease-out',
          filter: 'drop-shadow(5px 5px 5px #222)',
        }}
      />
      <div className='flex flex-col justify-center items-center bg-primary rounded-lg text-dark w-full h-24'>
        <h5 className='font-display text-dark text-xl font-bold mt-8'>
          Pay in crypto
        </h5>
        <div className='flex text-sm flex-shrink text-dark font-medium mb-1 mt-auto justify-center items-center'>
          {/* <IoMdMoon /> */}
          <h5 className='text-dark'>
            <span className='font-bold'>Lunar</span>Pay
          </h5>
        </div>
      </div>
    </div>
  )
}

export default Landing
