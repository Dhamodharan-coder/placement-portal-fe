import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import Footer from '../Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Adminstudentdetails = () => {
    const {id} = useParams();
    const [applications,setapplications]=useState([]);
    const [finalinterview,setfinalinterview] = useState([]);
    const [studentshortlists,setstudentshortlists] = useState([]);
    const [studentreject,setstudentreject] = useState([]);
    const [view,setview] = useState(null)
        const studentapplications = async () => {
        try {
          const token = localStorage.getItem('token3');
          const response = await axios.get('https://dhru-placement-portal.onrender.com/admin/admin-students-applications', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
         const application = response.data.filter((e)=>(id === e.userdetails[0]._id ));
          setapplications(application)
          
        } catch (error) {
          console.error('Error fetching recruiter details:', error);
          throw error;
        }
      };

      const studentfinalinterviews = async () => {
        try {
          const token = localStorage.getItem('token3');
          const response = await axios.get('https://dhru-placement-portal.onrender.com/admin/admin-students-interviewfinal', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
         const application = response.data.filter((e)=>(id === e.interviewalldetails[0].all_lists[0].userid ));
       
          setfinalinterview(application)
          
        } catch (error) {
          console.error('Error fetching recruiter details:', error);
          throw error;
        }
      };

      const studentshortlist= async ()=>{
        try {
            const token = localStorage.getItem('token3');
            const response = await axios.get('https://dhru-placement-portal.onrender.com/admin/admin-students-shortlist', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
           const application = response.data.filter((e)=>(id === e.interviewalldetails[0].all_lists[0].userid ));
           const reject = application.filter((e)=>(e.shortliststatus === "rejected"))
           setstudentreject(reject)
            setstudentshortlists(application)
            
          } catch (error) {
            console.error('Error fetching recruiter details:', error);
            throw error;
          }
      };

      const data = {
        labels: [
          'Selected',
          'Rejected',
        ],
        datasets: [{
          data: [studentshortlists.length, studentreject.length],
          backgroundColor: [
            'rgba(55, 48, 163, 1)',
            'rgba(255, 255, 255, 1)',
          ],
          borderColor: [
            'rgba(55, 48, 163, 1)',
            'rgba(31, 41, 55, 1)',
            
          ],
          hoverOffset: 4
        }]
      };
      
      const options = {
        responsive: true,
      };
      
    
      useEffect(()=>{
        studentapplications();
        studentfinalinterviews();
        studentshortlist();
      },[])
  return (
    <div>
      <AdminNavbar />
      <div className='m-10 text-right'>
                            <Link to="/admin-student-control" className="bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Back</Link>
                        </div>
                        <div className='contentbox text-center m-10'>
                            <div>
                                <h1 className='font-bold text-3xl mt-10'>Student<span className='text-indigo-800'> {applications[0]?.userdetails[0].name}</span></h1>
                            </div>

{
   
         <div className='flex gap-10 justify-center mt-10 flex-wrap'>
  <div className='bg-red-600 p-10 border-transparent rounded-lg'>
    <h1 className='text-2xl text-white'>Total Applied</h1>
    <p className='font-bold text-white my-2'>{applications.length}</p>
     </div>
     <div className='bg-yellow-400 p-10 border-transparent rounded-lg'>
     <h1 className='text-2xl text-white'>Total Interviews</h1>
     <p className='font-bold text-white my-2'>{finalinterview.length}</p>
     </div>
     <div className='bg-green-600 p-10 border-transparent rounded-lg'>
     <h1 className='text-2xl text-white'>Total Selected</h1>
    <p className='font-bold text-white my-2'>{studentshortlists.length}</p>
         </div>
     <div className='bg-orange-600 p-10 border-transparent rounded-lg'>
     <h1 className='text-2xl text-white'>Total Rejected</h1>
 
    <p className='font-bold text-white my-2'>{studentreject.length}</p>
     </div>
</div>

    
}

<div className='overflow-hidden'>
    {
        view === applications[0]?.userdetails?.[0]?._id ? (
            <div className="relative overflow-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                            Student Details
                                        </h3>
                                        <div className="flex gap-5 p-5">
                                            <div className="relative h-32 w-32 rounded-full overflow-hidden cursor-pointer">
                                                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                                    <img src={`${applications[0]?.userdetails?.[0]?.image}`} className="h-full w-full object-cover" alt="student profile" />
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-bold text-gray-950">Name: </span>
                                                    {applications[0]?.userdetails?.[0]?.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-bold text-gray-950">Email: </span>
                                                    {applications[0]?.userdetails?.[0]?.email}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-bold text-gray-950">CGPA: </span>
                                                    {applications[0]?.userdetails?.[0]?.cgpa}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-bold text-gray-950">Skills: </span>
                                                    {applications[0]?.userdetails?.[0]?.skills}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-bold text-gray-950">Degree: </span>
                                                    {applications[0]?.userdetails?.[0]?.degree}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-bold text-gray-950">Number: </span>
                                                    {applications[0]?.userdetails?.[0]?.number}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                    onClick={() => {
                                        setview(false);
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            ""
        )
    }
</div>


<button class="bg-indigo-800 text-white m-4 py-2 px-4 rounded-xl" onClick={()=>{setview(applications[0]?.userdetails[0]._id)}}>View</button>


<div className='flex gap-5 justify-center items-center flex-wrap my-10'>
<div className='m-10' style={{height:"300px"}}>
<Doughnut data={data} options={options}  />
<h1 className='font-bold text-xl'>Progess</h1>
</div>
<div>
    <h1 className='text-left my-4 font-bold'>Applied Status:</h1>
<table className="mx-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applied Company</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Role</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Offer</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                   
                                    <tbody>
                                       {
applications.map((e,index)=>(
    <tr>
                                            <td key={index}>{index+1}</td>
                                            <td>{e.applicationdata[0].companyname}</td>
                                            <td className='px-6'>{e.applicationdata[0].location}</td>
                                            <td>{e.applicationdata[0].jobrole}</td>
                                            <td>{e.applicationdata[0].salaryoffer}</td>
                                            <td>{e.status?e.status:"Pending"}</td>
                                        </tr>
))
                                       } 
                                    </tbody>
                                    </table>
</div>
</div>

<div className='my-20'>
    <h1 className='my-4 text-3xl font-bold'>Interview Status:</h1>
<table className="mx-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applied Company</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Role</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Offer</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                   
                                    <tbody>
                                       {
studentshortlists.map((e,index)=>(
    <tr>
                                            <td key={index}>{index+1}</td>
                                            <td>{e.interviewalldetails[0].all_lists[0].applicationdata[0].companyname}</td>
                                            <td className='px-6'>{e.interviewalldetails[0].all_lists[0].applicationdata[0].location}</td>
                                            <td>{e.interviewalldetails[0].all_lists[0].applicationdata[0].jobrole}</td>
                                            <td>{e.interviewalldetails[0].all_lists[0].applicationdata[0].salaryoffer}</td>
                                            <td>{e.shortliststatus?e.shortliststatus:"Pending"}</td>
                                        </tr>
))
                                       } 
                                    </tbody>
                                    </table>
</div>
</div>

      <Footer />
    </div>
  )
}

export default Adminstudentdetails
