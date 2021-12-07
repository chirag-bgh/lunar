// Icons
import { IoMdMoon, BsArrowLeftShort } from 'react-icons/all'

// Components
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div
      style={{ backgroundImage: 'url(/images/moon_bg.png)' }}
      className='w-screen h-screen bg-moon bg-center bg-no-repeat bg-cover flex justify-center items-center'
    >
      <div className='w-5/12 h-3/4 rounded-2xl bg-background flex flex-col justify-between items-center'>
        <div className='flex justify-between items-center w-full mt-3'>
          <Link to='/'>
            <BsArrowLeftShort className='text-4xl text-white ml-3 cursor-pointer' />
          </Link>
          <div className='flex justify-center items-center gap-1'>
            <IoMdMoon className='text-2xl text-primary' />
            <p className='text-2xl text-primary font-medium'>lunar</p>
          </div>
          <BsArrowLeftShort className='text-4xl text-background mr-3' />
        </div>
        <div className='flex flex-col justiy-center items-center gap-3 mb-10'>
          <h1 className='text-3xl w-60 flex items-center justify-start mb-5'>
            Log In
          </h1>
          <div className='flex flex-col justify-center items-start'>
            <p className='text-gray-400'>Email</p>
            <input
              className='rounded-md bg-dark w-60 pl-2 text-white outline-none h-7'
              type='email'
              name='Email'
              id='email'
            />
          </div>
          <div className='flex flex-col justify-center items-start'>
            <p className='text-gray-400'>Password</p>
            <input
              className='rounded-md bg-dark w-60 pl-2 text-white outline-none h-7'
              type='password'
              name='Password'
              id='password'
            />
          </div>
          <div className='w-60 bg-primary h-9 flex justify-center items-center rounded-md font-semibold mt-5'>
            Log In
          </div>
          <p>or</p>
          <Link to='/signup'>
            <div className='text-primary font-display cursor-pointer'>
              Create an account
            </div>
          </Link>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Login
