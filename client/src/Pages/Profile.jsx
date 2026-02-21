import React from 'react'
import Footer from '../Components/Footer'

export default function Profile() {
  return (
    <div className='h-full w-full'>
      <h2 className='text-white font-bold text-3xl px-5'>Profile setting</h2>
      <div className=' text-white px-10 py-6 h-full w-full'>
        <div className='flex items-center gap-10'>
          <img className='rounded-full h-18 w-18' src="Images/profileImg.jpeg" />
          <div className='flex flex-col gap-3'>
            <p>JPG, GIF, or PNG. Max 700KB, 4000px for any dimension.</p>
            <button className='bg-gray-800 rounded-md w-1/2'>Upload Photo</button>
          </div>
        </div>
        <div className='flex flex-col gap-2 text-gray-600 font-semibold py-5 '>
          <h3>Username</h3>
          <input type="text" className='w-full border-gray-300 text-gray-200 p-2.5 border-b-1 focus:outline-none' placeholder='Keyuri Jethwa' />
          <h3 className='mt-3'>Email</h3>
          <input type="text" className='w-full border-gray-300 text-gray-200 p-2.5 border-b-1 focus:outline-none' placeholder='keyuri@gmail.com' />
          <button className='border-1 mt-3 border-white rounded-lg py-2  w-1/5 self-end'>Change Profile</button>
        </div>
        <div className='flex flex-col gap-2 text-gray-600 font-semibold py-5'>
          <h2 className='font-bold text-3xl text-white'>Password Change</h2>
          <h3 className='mt-3'>Current Password</h3>
          <input type="password" className='w-full border-gray-300 text-gray-200 p-2.5 border-b-1 focus:outline-none' placeholder='Current Password'/>
          <h3 className='mt-3'>New Password</h3>
          <input type="password" className='w-full border-gray-300 text-gray-200 p-2.5 border-b-1 focus:outline-none' placeholder='New Password'/>
          <h3 className='mt-3'>Confirm Password</h3>
          <input type="Password" className='w-full border-gray-300 text-gray-200 p-2.5 border-b-1 focus:outline-none' placeholder='Confirm Password' />
          <button className='border-1 mt-3 border-white rounded-lg py-2  w-1/5 self-end'>Change Password</button>
        </div>
        <div className='flex flex-col gap-4'> 
          <h2 className='font-bold text-3xl text-white'>Account Deletion</h2>
          <p className='text-gray-600 w-1/2'>If you ever want to delete your account, you can. The process will take 30 days and you can change your mind at any time and halt the process.</p>
          <button className='border-1 mt-3 border-red-600 text-red-600 rounded-lg py-2  w-1/5 '>Delete Account</button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
