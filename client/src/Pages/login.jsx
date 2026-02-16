import React from 'react'

export default function Login() {
  return (
    <>
    <div class="bg-[url(/Images/background-image.jpeg)] relative bg-cover flex  h-full   justify-between">
        <div className='flex justify-start  py-10  bg-black/50 rounded-2xl h-3/4 w-3/4 mx-50 my-20'>
          <div className='relative h-full w-full mx-10'>
            <img className=' w-120 rounded-xl  h-auto object-contain' src="Images/Logo1.jpeg" />
          </div>
          <div className='flex flex-col gap-4 h-full mx-10 w-full text-white items-center'>
            <h1 className='text-4xl font-bold'>Login Here</h1>
            <p className=''>Welcome to paper trading Website </p>
            <input type="text" className='bg-gray-800 border-1 border-white w-full rounded-lg px-3 py-3'  placeholder='Email'/>
            <input type="Password" className='bg-gray-800  border-1 border-white w-full rounded-lg px-3 py-3' placeholder='Password'/>
            <p className='text-m '>Forgot Password</p>
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
