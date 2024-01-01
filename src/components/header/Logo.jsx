import React from 'react'
import logo from '../assets/logo.svg'

export default function Logo() {
  return (
    <div className='flex items-center'>
        <img src={logo} alt="univey logo" 
        className='w-20 h-20 mr-4'/>
        <p className='font-semibold text-xl text-main_color mt-2'>Univey </p>
    </div>
  )
}
