import React from 'react'
import Navbar from '../Student/Navbar'
import Footer from '../Footer'
import AdminNavbar from './AdminNavbar'
import Adminroute from './Adminroute'

const AdminMainpage = () => {
  return (
    <div>
      <AdminNavbar />
      <Adminroute />
      <Footer />
    </div>
  )
}

export default AdminMainpage
