import React from 'react'
import Image from '../Components/LoginPage/Image'

export default function Login() {
  return (
    <>
      <div className='bg-[url(/Images/background-image.jpeg)] bg-cover absolute blur-sm items-center   h-full w-full z-0'>
      </div>
      <div class=" absolute  flex  h-full z-10 justify-between items-center">

        <div className=' flex justify-start  py-10  bg-black/50 rounded-2xl h-3/4 w-3/4 mx-70 my-20'>
          <div
            className="mx-10 my-10 w-full md:w-1/2 shrink-0   rounded-xl h-full flex items-center justify-center "
            style={{
              transform: 'skewX(-10deg)', // Skew creates the slant
              left: '-50%' // Adjust position to hide the left-side skew
            }}
          >
            <Image />
          </div>
          <div className='flex flex-col gap-4 h-full mx-10 w-full text-white '>
            <h1 className='text-4xl font-bold text-center'>Login Here</h1>
            <p className='text-center'>Welcome to paper trading Website </p>
            <input type="text" className='bg-gray-800 border-1 border-white w-full rounded-lg px-3 py-3' placeholder='Email' />
            <input type="Password" className='bg-gray-800  border-1 border-white w-full rounded-lg px-3 py-3' placeholder='Password' />
            <p className='text-m text-right'>Forgot Password</p>
            <button className='bg-blue-700 rounded-2xl h-auto w-full px-4 py-2'>Login</button>
            <div className='flex gap-60'>
              <p className='text-xs'>I have an Account</p>
              <p className='text-xs text-red-500'>Sign Up</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
