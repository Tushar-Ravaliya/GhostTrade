import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
        <div className='h-px w-full bg-gray-200'></div>
            <div className='flex  px-8 py-4 justify-between text-white h-full w-full items-center gap-10'>
                <div className='flex flex-wrap h-full w-full'>
                    <div className='flex justify-between items-center gap-3'>
                        <img className='rounded-full h-15 w-15 text-white' src="Images/Logo1.jpeg" />
                        <p className='text-white font-bold text-3xl'>Ghost <span className='text-green-700'>Trade</span></p>
                    </div>

                    <p className='text-gray-400'>We provide a powerful, risk-free environment for traders to sharpen their skills. By using real-time market data in a simulated setting, we empower you to test strategies and build confidence before ever committing a single rupee of real capital.</p>
                    
                </div>
                <div className='h-full w-4 bg-gray-200'></div>
                <div className='flex flex-col h-full w-full'>
                    <p className='font-bold text-2xl'>Outlooks</p>
                    <Link to='/'>Home</Link>
                    <Link to='/market'>Market</Link>
                    <Link to='/about'>About Us</Link>
                    <Link to='/profile'>Profile</Link>
                    <Link to='/portfolio'>Portfolio</Link>
                    <Link to='/history'>History</Link>
                </div>
                <div className='flex flex-col h-full w-full'>
                    <p className='font-bold text-2xl'>Servies</p>
                    <div className='text-gray-400'>
                        <p>Real Time Data Streaming</p>
                        <p>Risk Free virtual Trading</p>
                        <p>Advanced Portfolio Traking </p>
                        <p>Strategy Backtracking</p>
                        <p>User-Centric Interface</p>
                        <p>Educational Resources</p>
                    </div>

                </div>
                <div className='flex flex-col h-full w-full'>
                    <p className='font-bold text-2xl'>Contect Us</p>
                    <p>66 Road Broklyn Street, 600
                        New York, USA
                    </p>
                    <div className='flex'>
                        <p>needhelp@company.com
                        </p>
                    </div>
                    <div className='flex'>
                        <p>+92 (666) 888 0000</p>
                    </div>
                </div>

            </div>
            <div className='flex items-center font-bold text-6xl tracking-[23px] px-8 py-4'>
                <p className='text-white '>NO PRESSURE /</p>
                <p className='text-green-700 '>  NO DIAMONDS</p>
            </div>
        </>
    )
}
