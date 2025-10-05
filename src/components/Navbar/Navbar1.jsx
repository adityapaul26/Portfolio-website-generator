import React from 'react'

export const Navbar1=()=>{
    return(
        <>
            <nav className='bg-gray-900 text-white p-4'>
                <ul className='flex flex-wrap items-center justify-center gap-8'>
                    <li className='font-sans text-3xl inline-flex items-center text-white rounded-2xl border border-gray-400 cursor-pointer px-7 py-2 bg-[#432323] transition-colors duration-300 ease-out hover:text-gray-900 hover:bg-[#C2A68C]'>name</li>
                    <li className='inline-flex items-center rounded-2xl border border-gray-400 px-7 py-2 cursor-pointer transition-colors duration-300 ease-out hover:bg-gray-800'>About me</li>
                    <li className='inline-flex items-center rounded-2xl border border-gray-400 px-7 py-2 cursor-pointer transition-colors duration-300 ease-out hover:bg-gray-800'>Skills</li>
                    <li className='inline-flex items-center rounded-2xl border border-gray-200 px-7 py-2 cursor-pointer transition-colors duration-300 ease-out hover:bg-gray-800'>Projects</li>
                    <li className='inline-flex items-center rounded-2xl border border-gray-400 px-7 py-2 cursor-pointer transition-colors duration-300 ease-out hover:bg-gray-800'>Contact</li>
                </ul>
            </nav>
        </>
    )
}