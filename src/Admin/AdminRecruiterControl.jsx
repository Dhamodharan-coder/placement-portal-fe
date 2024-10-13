import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import Footer from '../Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const AdminRecruiterControl = () => {
  const [recruiterdetail,setrecruiterdetail]=useState([]);
  const [recruiterposting,setrecruiterposting]=useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const recruiterdetails = async () => {
    try {
      const token = localStorage.getItem('token3');
      const response = await axios.get('https://dhru-placement-portal.onrender.com/admin/admin-recruiter-details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setrecruiterdetail(response.data)
      console.log(response.data)
      
    } catch (error) {
      console.error('Error fetching recruiter details:', error);
      throw error;
    }
  };

  const filteredrecruiterdetails = recruiterdetail.filter(application => {
    const user = application
    return (
      user?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(searchQuery.toLowerCase())   // Convert salary offer to string for comparison
    );
  });

  
  const recruiterpostings = async () => {
    try {
      const token = localStorage.getItem('token3');
      const response = await axios.get('https://dhru-placement-portal.onrender.com/admin/admin-recruiter-jobpostings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setrecruiterposting(response.data)
      console.log(response.data)
      
    } catch (error) {
      console.error('Error fetching recruiter details:', error);
      throw error;
    }
  };


  const handledeleterecruiter = () => {
const result = confirm("Are You Sure?you want to send request to Delete");
if(result){
  toast.success("Request Has Sended To College Head")
}
  }


  useEffect(()=>{
    recruiterdetails();
    recruiterpostings();
  },[])

  return (
    <div>
      <AdminNavbar />
      <div className='m-10 text-right'>
                            <Link to="/admin-portal" className="bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Back</Link>
                        </div>
      <div className='contentbox py-6 m-10 h-screen'>
      <div className='text-right'>
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                className="mt-4 mb-4 me-4 px-4 py-2 border border-slate-950 rounded"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
      <table className="mx-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">View</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                 
                                    <tbody>
                                              {
                                               filteredrecruiterdetails.map((e,index)=>{
                                              
                                                return <tr key={index} className='text-center'>
                                                  <td>{index+1}</td>
                                                
                                                <td className='p-3'>{e.name}</td>
                                              
                                                <td>{e.email}</td>
                                                <td>   <Link to={`/admin-recruiter-control-details/${e._id}`}  className="bg-indigo-600 text-white px-3 py-2 rounded cursor-pointer" >View</Link>
                                                </td>
                                                <td>   <span  className="bg-red-600 text-white px-3 py-2 rounded cursor-pointer" onClick={handledeleterecruiter}>Delete</span>
                                                </td>
                                              </tr>
                                             
                                               }) 
                                              }
                                              
                                            </tbody>
                                    
                                </table>
      </div>
      <Footer />
    </div>
  )
}

export default AdminRecruiterControl
