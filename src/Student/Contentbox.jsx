import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Pipeline, StudentContext } from './StudentContext';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import LineChartPage from './LineChartPage';

// Register necessary components from Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Contentbox = ({togglenav}) => {

    const [profilePic, setProfilePic] = useState(null);
    const [studentdetails,setstudentdetails]=useState([]);
    const [alljobpostings,setalljobpostings]=useState([]);
    const [allapplieddetails,setallapplieddetails]=useState([]);
    const [isedit,setisedit]=useState(true);
    const [viewdetails,setviewdetails] = useState(false);
    const [descriptionview,setdescriptionview]=useState("");
const [interviewlinks,setinterviewlinks] = useState([])
const [shortlist,setshortlist] = useState([]);
const [searchQuery, setSearchQuery] = useState('');

const {setnavimage,setlinechartselect,setlinechartreject} = useContext(Pipeline);
 
    const handleapply = () => {
      toast.success('Applied');
    };
  
    const userdetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://dhru-placement-portal.onrender.com/student/student-details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setstudentdetails(response.data);
        setnavimage(response.data.image)
      } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
      }
    };
  
    const jobpostings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://dhru-placement-portal.onrender.com/recruiter/jobpostings-details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setalljobpostings(response.data);
      } catch (error) {
        console.error('Error fetching job postings:', error);
        throw error;
      }
    };
  
    const filteredalljobpostings = alljobpostings.filter(application => {
      const user = application
      return (
        user?.jobrole?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        user?.location?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        user?.companyname?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        user?.salaryoffer?.toString()?.includes(searchQuery)  // Convert salary offer to string for comparison
      );
    });

    const formik = useFormik({
      initialValues: {
        name: studentdetails.name || '',
        email: studentdetails.email || '',
        number: studentdetails.number || '',
        degree: studentdetails.degree || '',
        cgpa: studentdetails.cgpa || '',
        skills: studentdetails.skills || '',
        regno: studentdetails.regno || '',
        image: null,
        resume: null,
      },
      onSubmit: async (values) => {
        const id = studentdetails._id;
        console.log(values);
        try {
          await axios.put(`https://dhru-placement-portal.onrender.com/student/student-update/${id}`, values, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          toast.success('Updated Successfully');
          userdetails();
        } catch (error) {
          console.error('Updation error:', error);
          toast.error('Update failed. Please try again.');
        }
      },
    });
  
    const handleProfilePicChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProfilePic(URL.createObjectURL(file));
        formik.setFieldValue('image', file);
      }
    };
  
    const handleResumeChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        formik.setFieldValue('resume', file);
      }
    };
  
    const handleImageClick = () => {
      document.getElementById('profile-pic').click();
    };
  
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
  
    const apply = async (id) => {
      const ids = {
        id: id,
      };
      const token = localStorage.getItem('token');
      await axios.post('https://dhru-placement-portal.onrender.com/recruiter/applied-list', ids, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    };
  
    const applydetails = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://dhru-placement-portal.onrender.com/recruiter/applied-list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setallapplieddetails(response.data);
      console.log(response.data)
    };


    const filteredallapplydetails = allapplieddetails.filter(application => {
      const users = application?.applicationdata[0]
      const allstatus = application
  
      return (
        users?.jobrole?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        users?.location?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        users?.companyname?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        users?.salaryoffer?.toString()?.includes(searchQuery) ||
        allstatus?.status?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        allstatus?.assessmentstatus?.toLowerCase()?.includes(searchQuery.toLowerCase())  // Convert salary offer to string for comparison
      );
    });

    const interviewlink = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://dhru-placement-portal.onrender.com/student/interview-link', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setinterviewlinks(response.data);   
      } catch (error) {
        console.error('Error fetching interview link details:', error);
        throw error;
      }
    };

    const filteredinterviewlinks = interviewlinks.filter(application => {
      const user = application?.interviewalldetails?.[0]?.all_lists?.[0]?.applicationdata?.[0];
      
      return (
        user?.jobrole?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        user?.location?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        user?.companyname?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        user?.salaryoffer?.toString()?.includes(searchQuery)  // Convert salary offer to string for comparison
      );
    });
    

    const shortlistdetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://dhru-placement-portal.onrender.com/student/interview-shortlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setshortlist(response.data);   
      } catch (error) {
        console.error('Error fetching interview link details:', error);
        throw error;
      }
    };

    const filteredshortlist = shortlist.filter(application => {
      const user = application?.interviewalldetails?.[0]?.all_lists?.[0]?.applicationdata?.[0];
      const status = application
      return (
        user?.jobrole?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        user?.location?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        user?.companyname?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        status?.shortliststatus?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        user?.salaryoffer?.toString()?.includes(searchQuery)  // Convert salary offer to string for comparison
      );
    });
   
    
  
    // useEffect to fetch user details, job postings, and applied details on component mount
    useEffect(() => {
      userdetails();
      jobpostings();
      applydetails();
      interviewlink();
      shortlistdetails();
    },[]);
  
    const chartselectedstatus= allapplieddetails.filter((e)=>e.status === "shortlisted");
    const chartreselectedstatus= allapplieddetails.filter((e)=>e.status === "rejected" || e.status === "pending");
    
    const linechartselect = allapplieddetails.filter((e)=>e.assessmentstatus === "selected");
    const linechartreject = allapplieddetails.filter((e)=>e.assessmentstatus === "rejected");
  setlinechartselect(linechartselect.length)
  setlinechartreject(linechartreject.length)
    const data = {
      labels: ['Shortlisted','Rejected'],
      datasets: [{
        data: [chartselectedstatus.length, chartreselectedstatus.length ],
        backgroundColor: [
          'rgba(55, 48, 163, 1)',
          'rgba(255, 255, 255, 1)',
          
        ],
        borderColor: [
          'rgba(55, 48, 163, 1)',
          'rgba(31, 41, 55, 1)',
          
        ],
        borderWidth: 1
      }]
    };

    
  
  
    // useEffect to handle changes in student details and update formik values
    useEffect(() => {
      if (studentdetails._id) {
        formik.setValues({
          name: studentdetails.name || '',
          email: studentdetails.email || '',
          number: studentdetails.number || '',
          degree: studentdetails.degree || '',
          cgpa: studentdetails.cgpa || '',
          skills: studentdetails.skills || '',
          regno: studentdetails.regno || '',
          image: null,
          resume: null,
        });
      }
    }, [studentdetails]);
  



  return (
    <div className='bg-dark-700 my-7 text-center'>
      {
       
        togglenav === "one"?(<div>
            <h1 className='font-bold text-2xl py-6'>Profile</h1>
            <div  className='contentbox'> 
           {
            isedit?(
              <form className="space-y-6 m-4">
              <div className="rounded-md shadow-sm -space-y-px">
                
                {/* Profile Picture */}
                <div className="mb-6 text-center">
                  
                  <div className="flex justify-center">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden cursor-pointer" onClick={handleImageClick}>
                      {profilePic ? (
                        <img
                          src={profilePic}
                          alt="Profile Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center bg-slate-950">
                         <img
                          src={studentdetails.image}
                          alt="Profile Preview"
                          className="h-full w-full object-cover"
                        />
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    id="profile-pic"
                    name="profile-pic"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className=" hidden mt-4 text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                   />
                </div>
    
                {/* Full Name */}
                <div className="mb-4">
                  <label htmlFor="full-name" className="flex">
                    Full Name:
                  </label>
                  <input
                    id="full-name"
                    name="full-name"
                    type="text"
                    value={studentdetails.name}
                    disabled
                    className="appearance-none rounded-md relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>
    
                {/* Email */}
                <div className="mb-4">
                  <label htmlFor="email-address" className="flex">
                    Email address:
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={studentdetails.email}
                    disabled
                    className="appearance-none rounded-md mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
    
                {/* Phone Number */}
                <div className="mb-4">
                  <label htmlFor="phone-number" className="flex">
                    Phone Number:
                  </label>
                  <input
                    id="phone-number"
                    name="phone-number"
                    type="text"
                    value={studentdetails.number}
                    disabled
                    className="appearance-none rounded-md mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                    placeholder="Phone Number"
                  />
                </div>
    
                {/* Degree */}
                <div className="mb-4">
                  <label htmlFor="degree" className="flex">
                    Degree:
                  </label>
                  <input
                    id="degree"
                    name="degree"
                    type="text"
                    value={studentdetails.degree}
                    disabled
                    className="appearance-none rounded-md mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                    placeholder="Degree (e.g., B.Tech, MCA)"
                  />
                </div>
    
                {/* CGPA */}
                <div className="mb-4">
                  <label htmlFor="cgpa" className="flex">
                    CGPA:
                  </label>
                  <input
                    id="cgpa"
                    name="cgpa"
                    type="text"
                    value={studentdetails.cgpa}
                    disabled
                    className="appearance-none rounded-md mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                    placeholder="CGPA"
                  />
                </div>
    
                {/* Skills */}
                <div className="mb-4">
                  <label htmlFor="skills" className="flex">
                    Skills:
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    rows="3"
                    value={studentdetails.skills}
                    disabled
                    className="appearance-none rounded-md mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                    placeholder="Skills (e.g., JavaScript, React, Python)"
                  ></textarea>
                </div>
    
    
    
    
                <div className="mb-4">
                  <label htmlFor="resume" className="block flex text-sm font-medium text-gray-700">
                    Download Resume:
                  </label>
              <div className='flex'>
              <a href={`https://dhru-placement-portal.onrender.com/${studentdetails.resume}`} className='mt-2 border rounded-full bg-indigo-800 hover:bg-indigo-900 text-white p-3'>Download</a>
              </div>
                </div>
    
               
              </div>
    
              {/* Submit Button */}
              <div>
                <button
                  onClick={()=>{setisedit(false)}}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-800 hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit profile
                </button>
              </div>
            </form>
            ):(
              <form className="space-y-6 m-4" onSubmit={formik.handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">

                  {/* Profile Picture */}
                  <div className="mb-6 text-center">
                      <div className="flex justify-center">
                          <div className="relative h-32 w-32 rounded-full overflow-hidden cursor-pointer" onClick={handleImageClick}>
                              {profilePic ? (
                                  <img
                                      src={profilePic}
                                      alt="Profile Preview"
                                      className="h-full w-full object-cover"
                                  />
                              ) : (
                                  <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                      <img
                                          src={studentdetails.image}
                                          alt="Profile Preview"
                                          className="h-full w-full object-cover"
                                      />
                                  </div>
                              )}
                          </div>
                      </div>
                      <input
                          type="file"
                          id="profile-pic"
                          name="image"
                          accept="image/*"
                          onChange={handleProfilePicChange}
                          className="hidden mt-4 text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
                      />
                  </div>

                  {/* Full Name */}
                  <div className="mb-4">
                      <label htmlFor="full-name" className="flex">Full Name:</label>
                      <input
                          id="full-name"
                          name="name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          type="text"
                          required
                          className="appearance-none rounded-md relative block w-full px-3 py-2 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                          placeholder="Full Name"
                      />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                      <label htmlFor="email-address" className="flex">Email address:</label>
                      <input
                          id="email-address"
                          name="email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          type="email"
                          autoComplete="email"
                          required
                          className="appearance-none rounded-md mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                          placeholder="Email address"
                      />
                  </div>

                  {/* Registration Number */}
                  <div className="mb-4">
                      <label htmlFor="reg-no" className="flex">Reg_No:</label>
                      <input
                          id="reg-no"
                          name="regno"
                          onChange={formik.handleChange}
                          value={formik.values.regno}
                          type="text"
                          required
                          className="appearance-none rounded-md mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                          placeholder="Reg_No"
                      />
                  </div>

              

                  {/* Phone Number */}
                  <div className="mb-4">
                      <label htmlFor="phone-number" className="flex">Phone Number:</label>
                      <input
                          id="phone-number"
                          name="number"
                          onChange={formik.handleChange}
                          value={formik.values.number}
                          type="text"
                          required
                          className="appearance-none rounded-md mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                          placeholder="Phone Number"
                      />
                  </div>

                  {/* Degree */}
                  <div className="mb-4">
                      <label htmlFor="degree" className="flex">Degree:</label>
                      <input
                          id="degree"
                          name="degree"
                          onChange={formik.handleChange}
                          value={formik.values.degree}
                          type="text"
                          required
                          className="appearance-none rounded-md mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                          placeholder="Degree (e.g., B.Tech, MCA)"
                      />
                  </div>

                  {/* CGPA */}
                  <div className="mb-4">
                      <label htmlFor="cgpa" className="flex">CGPA:</label>
                      <input
                          id="cgpa"
                          name="cgpa"
                          onChange={formik.handleChange}
                          value={formik.values.cgpa}
                          type="text"
                          required
                          className="appearance-none rounded-md mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                          placeholder="CGPA"
                      />
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                      <label htmlFor="skills" className="flex">Skills:</label>
                      <textarea
                          id="skills"
                          name="skills"
                          onChange={formik.handleChange}
                          value={formik.values.skills}
                          rows="3"
                          required
                          className="appearance-none rounded-md mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                          placeholder="Skills (e.g., JavaScript, React, Python)"
                      ></textarea>
                  </div>

                  {/* Upload Resume */}
                  <div className="mb-4">
                      <label htmlFor="resume" className="block flex text-sm font-medium text-gray-700">Resume:</label>
                      <input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf, .doc, .docx"
                          onChange={handleResumeChange}
                          className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-slate-950"
                      />
                  </div>
              </div>

              <div>
                  <button
                  onClick={()=>{setisedit(true)}}
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                     Update Profile
                  </button>
              </div>
            
          </form>
            )
           }
            </div>
            </div>):togglenav === "two" ?(<div>
                <h1 className='font-bold text-2xl py-6'>Job Postings</h1>
                <div className='text-right'>
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                className="mt-4 mb-4 me-4 px-4 py-2 border border-slate-950 rounded"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                {
    viewdetails?(<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
 
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
         
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Job Description</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">{descriptionview}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-gray-950 px-3 py-2 text-sm font-semibold text-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto" onClick={()=>{setviewdetails(false)}}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>):("")
  }
                
                <div  className='contentbox'>
        

        {
          filteredalljobpostings.map((e,index)=>(
            <div className='border-2 border-slate-350 m-4 rounded-xl p-4' key={index}>
<div className='flex justify-between items-center flex-wrap'>
   <div> 
    <h1 className='font-bold text-xl'>{e.companyname}</h1>
   <span>{e.location}</span>
   </div>
   <div> 
   <img src={e.image} className='w-20 h-20 border rounded-full' />
   
   </div>
    </div>


  <div className='flex flex-wrap justify-center'> 
  <div className='flex flex-col items-center flex-wrap m-5'>
    <img src='https://img.icons8.com/3d-fluency/94/briefcase--v1.png' className='w-10 h-10'/>
    <h5><span className='font-bold'>Role</span></h5>
    <span> {e.jobrole}</span>
   </div>
  
   <div className='flex flex-col items-center flex-wrap m-5'>
   <img src='https://img.icons8.com/3d-fluency/94/money-bag-euro.png' className='w-10 h-10'/>
    <h5><span className='font-bold'>Job Offer</span></h5>
    <span>{e.salaryoffer}</span>
   </div>
  
   <div className='flex flex-col items-center flex-wrap m-5'>
   <img src='https://img.icons8.com/3d-fluency/94/resume.png' className='w-10 h-10'/>
    <h5><span className='font-bold'>#Openings</span></h5>
    <span>{e.openings}</span>
   </div>



  </div>



   <div className='flex justify-between items-center flex-wrap mt-5'> 
    <div><span>Last Date to Apply<br /> {formatDate(e.lastdate)} • Posted on {timeAgo(e.createdAt)} ago</span></div>
    <div>
    {
  
  !allapplieddetails.map(detail => detail.applicationid).includes(e._id)
? (
    <div>
      <button
        class="bg-transparent border border-slate-950 text-black font-bold py-2 px-4 mx-4 hover:bg-slate-950 hover:text-white rounded-full"
        onClick={() => {
          setviewdetails(true);
          setdescriptionview(e.jobdescription);
        }}
      >
        View Details
      </button>
      <button
        class="bg-indigo-800 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => {
          handleapply();
          apply(e._id);
        }}
      >
        Apply Now
      </button>
    </div>
  ) : (
   <div>
     <button
    class="bg-transparent border border-slate-950 text-black font-bold py-2 px-4 mx-4 hover:bg-slate-950 hover:text-white rounded-full"
    onClick={() => {
      setviewdetails(true);
      setdescriptionview(e.jobdescription);
    }}
  >
    View Details
  </button>
    <button class="bg-slate-500 text-dark font-bold py-2 px-4 rounded-full">Applied</button>
   </div>
  )
}



  
    </div>
   </div>
                </div>
          ))
        }

                    </div>
     </div>):togglenav==="three"?( <div>
     <h1 className='font-bold text-2xl py-6'>Applied</h1>
     <div className='text-right'>
      <input
                                type="text"
                                placeholder="Search by name or email"
                                className="mt-4 mb-4 me-4 px-4 py-2 border border-slate-950 rounded"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
<div  className='contentbox'>
{
  filteredallapplydetails.length > 0? (
    <div> 
       {
      filteredallapplydetails.map((a, index) => (
        <div className={`${a.status==="rejected" ||a.assessmentstatus ==="rejected" ?"opacity-60":""} border-2 border-slate-350 m-4 rounded-xl p-4`} key={index}>
          <div className='flex justify-between items-center flex-wrap'>
            <div> 
              <h1 className='font-bold text-xl'>{a.applicationdata[0]?.companyname || "Company Name"}</h1>
              <span>{a.applicationdata[0]?.location || "Location"}</span>
            </div>
            <div> 
              <img 
                src={a.applicationdata[0]?.image || 'https://default-image.png'} 
                className='w-20 h-20 border rounded-full' 
                alt='Company Logo'
              />
            </div>
          </div>
    
          <div className='flex flex-wrap justify-center'> 
            <div className='flex flex-col items-center flex-wrap m-5'>
              <img src='https://img.icons8.com/3d-fluency/94/briefcase--v1.png' className='w-10 h-10' alt='Role Icon'/>
              <h5><span className='font-bold'>Role</span></h5>
              <span>{a.applicationdata[0]?.jobrole || "Fullstack Web Developer"}</span>
            </div>
            
            <div className='flex flex-col items-center flex-wrap m-5'>
              <img src='https://img.icons8.com/3d-fluency/94/money-bag-euro.png' className='w-10 h-10' alt='Salary Icon'/>
              <h5><span className='font-bold'>Job Offer</span></h5>
              <span>{a.applicationdata[0]?.salaryoffer || "Upto 10 LPA"}</span>
            </div>
            
            <div className='flex flex-col items-center flex-wrap m-5'>
              <img src='https://img.icons8.com/3d-fluency/94/resume.png' className='w-10 h-10' alt='Openings Icon'/>
              <h5><span className='font-bold'>#Openings</span></h5>
              <span>{a.applicationdata[0]?.openings || "100"}</span>
            </div>
    
            
          </div>
    
          <div className='flex justify-between items-center flex-wrap mt-5'> 
            <div>
              <span>
               Last date to apply<br /> {formatDate(a.applicationdata[0].lastdate)} • Posted on {timeAgo(a.applicationdata[0].createdAt)} ago
              </span><br /> 
              <span>
                Applied by you on<br /> {formatDate(a.createdAt)} • Applied {Math.floor((new Date() - new Date(a.createdAt)) / (1000 * 60 * 60))} hour ago
              </span>
            </div>
            
            <div className='flex gap-5 flex-wrap'>
              <h1 className='font-bold'>Status: <span className={a.status==="shortlisted"?'text-green-600':a.status==="pending"?'text-yellow-500':a.status==="rejected"?"text-red-500":""}>{a.status || "Pending"}</span></h1>
             {
              a.status === "shortlisted" ? (<div className='flex gap-2'>
                 <div className='flex gap-2'> 
                <div className='font-bold'>Assessment Link:</div>
               <a href={a.assessmentlink || "Link"}><img src='https://img.icons8.com/3d-fluency/94/link.png' className='w-5 h-5 cursor-pointer' alt='Assessment Link'/></a>
              </div>
              <h1 className='font-bold'>Assessment Status: <span className={a.assessmentstatus==="selected"?'text-green-600':a.assessmentstatus==="pending"?'text-yellow-500':a.assessmentstatus==="rejected"?"text-red-500":""}>{a.assessmentstatus || "Pending"}</span></h1>
            
              </div>):('')
             }
             </div>
          </div>
        </div>
      ))
    }
    </div>
   ):(<div className='m-10'>
    <h1>No Applies</h1>
  </div>)
  
}

                </div>
     </div>):togglenav==="four"?(  <div>
    <h1 className='font-bold text-2xl py-6'>Interviews</h1>
    <div className='contentbox h-screen'>
                                    <h2 className="text-2xl leading-tight p-8">Interview Schedule</h2>
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
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Degree</th>

                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Role</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Offer</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                                    
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Meeting Link</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                                        </tr>
                                    </thead>
                                    {
                                      interviewlinks[0]?(
                                        <tbody>
                                      
                                               {
                                        
                                        filteredinterviewlinks.map((e,index)=>(
                                                <tr key={index}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{index+1}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].name}</p>
                                                  
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].email}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].degree}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].applicationdata[0].jobrole}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].applicationdata[0].salaryoffer}</p>
                                                </td>
                          
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].applicationdata[0].companyname}</p>
                                                </td>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].applicationdata[0].location}</p>
                                                </td>
                                        
                                               
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <a href={interviewlinks[0].links || "Link"} ><img src='https://img.icons8.com/3d-fluency/94/link.png' className='w-5 h-5 cursor-pointer' alt='Assessment Link'/></a>
                                                </td>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <p className="text-gray-900 whitespace-no-wrap">{formatDate(interviewlinks[0].dates)}</p>
                                                </td>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <p className="text-gray-900 whitespace-no-wrap">{interviewlinks[0].times}</p>
                                                </td>
                                                
                                               
                                            </tr>
                                               ))
                                               }
                                           
                                    </tbody>
                                      ):(
                                       <tr>
                                         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center" colSpan="200">
                                        <p className="text-gray-900 whitespace-no-wrap">No Interviews</p>
                                        </td>
                                       </tr>
                                      )
                                    }
                                </table>
      </div>
    </div>):togglenav === "five"?(
     <div>
       <h1 className='font-bold text-2xl py-6'>Statitics</h1>
<div className='contentbox'>
<div className='flex gap-10 justify-center mt-10 flex-wrap'>
  <div className='bg-red-600 p-10 border-transparent rounded-lg'>
    <h1 className='text-2xl text-white'>Total Applied</h1>
    <p className='font-bold text-white my-2'>{allapplieddetails.length}</p>
     </div>
     <div className='bg-yellow-400 p-10 border-transparent rounded-lg'>
     <h1 className='text-2xl text-white'>Total Interviews</h1>
     <p className='font-bold text-white my-2'>{interviewlinks.length}</p>
     </div>
     <div className='bg-green-600 p-10 border-transparent rounded-lg'>
     <h1 className='text-2xl text-white'>Total Selected</h1>
    <p className='font-bold text-white my-2'>{shortlist.filter(e => e.shortliststatus === "Selected").length}</p>
         </div>
     <div className='bg-orange-600 p-10 border-transparent rounded-lg'>
     <h1 className='text-2xl text-white'>Total Rejected</h1>
    <p className='font-bold text-white my-2'>{shortlist.filter(e => e.shortliststatus === "rejected").length}</p>
     </div>
</div>
<div className='m-20 flex justify-center gap-20 flex-wrap'>
<div className='h-96'>
<Doughnut data={data} />
<h1 className='text-2xl my-3'>Total Applied</h1>
</div>
<div>
<LineChartPage />
<h1 className='text-2xl'>Total Performance</h1>
</div>
</div>
</div>
     </div>
    ):togglenav === "six"?(
      <div> 
        <h1 className='font-bold text-2xl py-6'>Results</h1>
        <div className='contentbox h-screen'>
                                    <h2 className="text-2xl leading-tight p-8">Final Results</h2>
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
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Degree</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Role</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Offer</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                                            
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                                        
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Result</th>
                                        </tr>
                                    </thead>
                                    {
                                      shortlist[0]?(
                                        <tbody>
                                      
                                               {
                                        
                                               filteredshortlist.map((e,index)=>(
                                                <tr key={index}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{index+1}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].name}</p>
                                                  
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].email}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].degree}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].applicationdata[0].jobrole}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].applicationdata[0].salaryoffer}</p>
                                                </td>
                          
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].applicationdata[0].companyname}</p>
                                                </td>
                                        
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].applicationdata[0].location}</p>
                                                </td>
                                               
                                                <td className={`px-5 py-5 border-b ${e.shortliststatus === "Selected"?"bg-green-700":e.shortliststatus === "rejected"? "bg-red-700":""} border-gray-200  text-sm text-center`}>
                                                <p className={`font-bold whitespace-no-wrap text-white`}>{e.shortliststatus}</p>
                                                </td>

                                      
                                            </tr>
                                               ))
                                               }
                                           
                                    </tbody>
                                      ):(
                                       <tr>
                                         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center" colSpan="200">
                                        <p className="text-gray-900 whitespace-no-wrap">No Results</p>
                                        </td>
                                       </tr>
                                      )
                                    }
                                </table>
      </div>
      </div>
          ):""
     
      }
    </div>
  )
}

export default Contentbox
