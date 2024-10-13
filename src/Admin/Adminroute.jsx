import React from 'react'
import { Link } from 'react-router-dom'

const Adminroute = () => {
  return (
    <div>
        <div className='text-center my-12 font-bold text-3xl text-indigo-800'>
            <h1>Controls</h1>
        </div>
      <div className='flex justify-center flex-wrap mb-20'>
      <Link to={"/admin-notification"} className='border-transparent transition shadow-md shadow-slate-500 ease-in-out m-10 delay-100 p-5 cursor-pointer hover:bg-indigo-800 hover:text-white bg-white rounded-2xl border-slate-950 flex justify-center items-center flex-col'>
        <img src='https://img.icons8.com/3d-fluency/94/speech-bubble-with-notification.png' alt='studentlogo' />
        <h1 className='font-bold text-2xl'>Notifications Upload</h1>
      </Link>
      <Link to={"/admin-student-control"} className='border-transparent transition shadow-md shadow-slate-500 ease-in-out m-10 delay-100 p-5 cursor-pointer hover:bg-indigo-800 hover:text-white bg-white rounded-2xl border-slate-950 flex justify-center items-center flex-col'>
        <img src='https://img.icons8.com/3d-fluency/94/student-male--v1.png' alt='studentlogo' />
        <h1 className='font-bold text-2xl'>Student Control</h1>
      </Link>
      <Link to={"/admin-recruiter-control"} className='border-transparent transition shadow-md shadow-slate-500 ease-in-out m-10 delay-100 p-5 cursor-pointer hover:bg-indigo-800 hover:text-white bg-white rounded-2xl border-slate-950 flex justify-center items-center flex-col'>
        <img src='https://img.icons8.com/3d-fluency/94/hard-working.png' alt='studentlogo' />
        <h1 className='font-bold text-2xl'>Recruiter Control</h1>
      </Link>
      </div>
    </div>
  )
}

export default Adminroute
