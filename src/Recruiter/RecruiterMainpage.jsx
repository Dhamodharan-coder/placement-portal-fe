import React from 'react'
import RecruiterNavbar from './RecruiterNavbar'
import Footer from '../Footer'
import RecruiterTogglebar from './RecruiterTogglebar'


const RecruiterMainpage = () => {
  return (
    <div>
 <RecruiterNavbar />
 <RecruiterTogglebar />
  <div className='mt-10'>
    <Footer />
 </div>
    </div>
  )
}

export default RecruiterMainpage
