import React from 'react'
import logo from "./assets/logo.png"

const Footer = () => {
  return (
    <div>
      <div className='footer bg-indigo-800 py-7'>
     <div className='flex flex-col justify-center items-center'>
     <div>
        <img src={logo} className='w-20 h-20 rounded-full'/>
      </div>
      <div>
        <span className='text-slate-400'>Copyrights Owner @Dhamodharan </span>
      </div>
     </div>
    </div>
    </div>
  )
}

export default Footer
