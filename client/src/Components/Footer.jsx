import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
            <div className='h-px w-full bg-gray-200'></div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-8 py-10 text-white'>
                
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-3'>
                        <img className='rounded-full h-12 w-12 object-cover' src="Images/Logo1.jpeg" alt="Logo" />
                        <p className='font-bold text-3xl whitespace-nowrap'>
                            Ghost <span className='text-green-700'>Trade</span>
                        </p>
                    </div>
                    <p className='text-gray-400 text-sm leading-relaxed'>
                        We provide a powerful, risk-free environment for traders to sharpen their skills. 
                        By using real-time market data in a simulated setting.
                    </p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='font-bold text-xl mb-2'>Outlooks</p>
                    <div className='flex flex-col gap-1 text-gray-400'>
                        <Link to='/' className="hover:text-green-500 transition-colors">Home</Link>
                        <Link to='/market' className="hover:text-green-500 transition-colors">Market</Link>
                        <Link to='/about' className="hover:text-green-500 transition-colors">About Us</Link>
                        <Link to='/profile' className="hover:text-green-500 transition-colors">Profile</Link>
                        <Link to='/portfolio' className="hover:text-green-500 transition-colors">Portfolio</Link>
                        <Link to='/history' className="hover:text-green-500 transition-colors">History</Link>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='font-bold text-xl mb-2'>Services</p>
                    <div className='text-gray-400 flex flex-col gap-1'>
                        <p>Real Time Data Streaming</p>
                        <p>Risk Free Virtual Trading</p>
                        <p>Advanced Portfolio Tracking</p>
                        <p>Strategy Backtracking</p>
                        <p>User-Centric Interface</p>
                        <p>Educational Resources</p>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='font-bold text-xl mb-2'>Contact Us</p>
                    <p className='text-gray-400'>66 Road Brooklyn Street, 600 <br/> New York, USA</p>
                    <p className='text-gray-400 mt-2'>needhelp@company.com</p>
                    <p className='text-green-700 font-semibold'>+92 (666) 888 0000</p>
                </div>
            </div>

            <div className='border-t border-gray-800 px-8 py-8 overflow-hidden'>
                <div className='flex flex-col md:flex-row items-center font-bold text-2xl md:text-4xl lg:text-6xl tracking-tight md:tracking-[10px] lg:tracking-[23px] text-center md:text-left'>
                    <p className='text-white'>NO PRESSURE /</p>
                    <p className='text-green-700 md:ml-4'>NO DIAMONDS</p>
                </div>
            </div>
        </>
    )
}
