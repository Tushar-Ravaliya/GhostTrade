import React from 'react'
import Footer from '../Components/Footer'

export default function Profile() {
  return (
    <div className='min-h-screen w-full'>
      <h2 className='text-white font-bold text-2xl md:text-3xl px-5 md:px-10 mt-6'>Profile setting</h2>
      
      <div className='text-white px-5 md:px-10 py-6 w-full max-w-9xl'>
        
        
        <div className='flex flex-col md:flex-row items-center gap-6 md:gap-10 border-b border-gray-800 pb-8'>
          <img className='rounded-full h-24 w-24 md:h-28 md:w-28 object-cover border-2 border-green-700' src="Images/profileImg.jpeg" alt="Profile" />
          <div className='flex flex-col gap-3 text-center md:text-left'>
            <p className='text-gray-400 text-sm md:text-base'>JPG, GIF, or PNG. Max 700KB, 4000px for any dimension.</p>
            <button className='bg-gray-800 hover:bg-gray-700 transition-colors rounded-md py-2 px-6 w-full md:w-fit'>
              Upload Photo
            </button>
          </div>
        </div>

        
        <div className='flex flex-col gap-2 text-gray-500 font-semibold py-8'>
          <h3>Username</h3>
          <input type="text" className='w-full border-gray-700 text-gray-200 p-2.5 border-b focus:border-green-700 focus:outline-none bg-transparent' placeholder='Keyuri Jethwa' />
          
          <h3 className='mt-5'>Email</h3>
          <input type="text" className='w-full border-gray-700 text-gray-200 p-2.5 border-b focus:border-green-700 focus:outline-none bg-transparent' placeholder='keyuri@gmail.com' />
          
          
          <button className='border border-white hover:bg-white hover:text-black transition-all mt-6 rounded-lg py-2 w-full md:w-1/5 self-end'>
            Change Profile
          </button>
        </div>

        
        <div className='flex flex-col gap-2 text-gray-500 font-semibold py-8 border-t border-gray-800'>
          <h2 className='font-bold text-2xl md:text-3xl text-white mb-4'>Password Change</h2>
          
          <h3 className='mt-3'>Current Password</h3>
          <input type="password" ocean className='w-full border-gray-700 text-gray-200 p-2.5 border-b focus:border-green-700 focus:outline-none bg-transparent' placeholder='Current Password'/>
          
          <h3 className='mt-5'>New Password</h3>
          <input type="password" ocean className='w-full border-gray-700 text-gray-200 p-2.5 border-b focus:border-green-700 focus:outline-none bg-transparent' placeholder='New Password'/>
          
          <h3 className='mt-5'>Confirm Password</h3>
          <input type="Password" ocean className='w-full border-gray-700 text-gray-200 p-2.5 border-b focus:border-green-700 focus:outline-none bg-transparent' placeholder='Confirm Password' />
          
          <button className='border border-white hover:bg-white hover:text-black transition-all mt-6 rounded-lg py-2 w-full md:w-1/5 self-end'>
            Change Password
          </button>
        </div>

        
        <div className='flex flex-col gap-4 py-8 border-t border-gray-800 mb-10'> 
          <h2 className='font-bold text-2xl md:text-3xl text-white'>Account Deletion</h2>
          <p className='text-gray-500 w-full md:w-2/3 lg:w-1/2'>
            If you ever want to delete your account, you can. The process will take 30 days and you can change your mind at any time and halt the process.
          </p>
          <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all mt-3 rounded-lg py-2 w-full md:w-1/5'>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
