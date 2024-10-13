import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import Footer from '../Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const AdminRecruiterDetails = () => {
    const {id} = useParams();
    const [ recruiterposting,setrecruiterposting]=useState([]);



    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };
      
      const timeAgo = (dateString) => {
        const now = new Date();
        const postDate = new Date(dateString);
        const hoursAgo = Math.floor((now - postDate) / (1000 * 60 * 60));
        return `${hoursAgo} hour`;
      };

    const recruiterpostings = async () => {
        try {
          const token = localStorage.getItem('token3');
          const response = await axios.get('https://dhru-placement-portal.onrender.com/admin/admin-recruiter-jobpostings', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          const result  = response.data.filter((e)=>(e.recruiterid === id))
          setrecruiterposting(result)
          console.log(result)
        } catch (error) {
          console.error('Error fetching recruiter details:', error);
          throw error;
        }
      };

      useEffect(()=>{
recruiterpostings();
      },[])
  return (
    <div>
        <AdminNavbar />
        <div className='m-10 text-right'>
                            <Link to="/admin-recruiter-control" className="bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Back</Link>
                        </div>
        <div className='contentbox m-10 text-center'>
        <div>
                                <h1 className='font-bold text-3xl mt-10'>Hello<span className='text-indigo-800'> {recruiterposting[0]?.companyname}</span></h1>
                            </div>
                           <div className='flex justify-center mt-10'>
                           <div className="relative h-32 w-32 rounded-full overflow-hidden cursor-pointer">
                                                                                                    <div className='h-full w-full bg-gray-200 flex items-center justify-center'>
                                                                                                        <img src={`${recruiterposting[0]?.image}`} className='h-full w-full object-cover' alt="student profile" />
                                                                                                    </div>
                                                                                                    </div>
                           </div>


                           <div className='m-10'>
<h1 className='font-bold text-xl text-left'>Job Postings:</h1>

<table className="mx-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Job role</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                            
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Vacancy</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Salary Offer</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Posted On</th>
                                        </tr>
                                    </thead>
                                    {
                                        recruiterposting.map((e,index)=>{
                                           return <tbody key={index}>
                                            <tr>
                                                 <td>{index+1}</td>
                                                 <td>{e.location}</td>
                                                 <td className='px-10 p-2'>{e.jobrole}</td>
                                                 <td>view</td>
                                                 <td>{e.openings}</td>
                                                 <td>{e.salaryoffer}</td>
                                                 <td>{formatDate(e.createdAt)}</td>

                                             </tr>
                                            </tbody>
                                        })
                                    }
                                  
                                    </table>
                           </div>

        </div>
        <Footer />
      
    </div>
  )
}

export default AdminRecruiterDetails
