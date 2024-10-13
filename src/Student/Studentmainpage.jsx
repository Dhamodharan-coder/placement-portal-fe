import React from 'react'
import Navbar from './Navbar'
import Togglebar from './Togglebar'
import Adminmessage from './Adminmessage'
import Footer from '../Footer'

const Studentmainpage = () => {
  return (
    <div>
         <Navbar />
      <Adminmessage />
      <Togglebar />
    <div className='mt-20'>
    <Footer />
    </div>
    </div>
  )
}

export default Studentmainpage
