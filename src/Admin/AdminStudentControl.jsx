import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import Footer from '../Footer'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminStudentControl = () => {
  const [studentdetail,setstudentdetail]=useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const studentdetails = async () => {
    try {
      const token = localStorage.getItem('token3');
      const response = await axios.get('https://dhru-placement-portal.onrender.com/admin/admin-student-details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setstudentdetail(response.data)
      console.log(response.data)
      
    } catch (error) {
      console.error('Error fetching recruiter details:', error);
      throw error;
    }
  };

  const filteredstudentdetails = studentdetail.filter(application => {
    const user = application
    return (
      user?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(searchQuery.toLowerCase())   // Convert salary offer to string for comparison
    );
  });


  const handledeleteuser= async (id)=>{
    try {
     const result = confirm("Are You sure?");
     if (result){
      const token = localStorage.getItem('token3');
      const response = await axios.delete(`https://dhru-placement-portal.onrender.com/admin/admin-student-details/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User Deleted");
     }
      
    } catch (error) {
      console.error('Error fetching sutdent details:', error);
      toast.error("Failed Delete the User");
    }
  }
 

  useEffect(()=>{
    studentdetails();
  },[studentdetail])
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
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">View</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                 
                                    <tbody>
                                              {
                                               filteredstudentdetails.map((e,index)=>{
                                              
                                                return <tr key={index} className='text-center'>
                                                  <td>{index+1}</td>
                                                
                                                <td className='p-3'>{e.name}</td>
                                              
                                                <td>{e.email}</td>
                                                <td>   <Link to={`/admin-student-control-details/${e._id}`}  className="bg-indigo-600 text-white px-3 py-2 rounded cursor-pointer" >View </Link>
                                                </td>
                                                <td>   <span  className="bg-red-600 text-white px-3 py-2 rounded cursor-pointer" onClick={()=>{handledeleteuser(e._id)}} >Delete</span>
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

export default AdminStudentControl
