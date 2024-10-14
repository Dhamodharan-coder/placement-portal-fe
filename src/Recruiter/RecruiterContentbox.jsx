import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Pipeline } from '../Student/StudentContext'


const RecruiterContentbox = ({recruitertogglenav}) => {

  const [jobpostings,setjobpostings]=useState([]);
  const [AppliedDetails,setAppliedDetails] =useState([]);
  const[interviewlist,setinterviewlist]= useState([]);
  const[interviewlistfinal,setinterviewlistfinal]= useState([]);
  const [shortlist,setshortlist]=useState([]);
  const [view,setview]=useState(null)
  const {setrecruiternavimage} = useContext(Pipeline);
  const [searchQuery, setSearchQuery] = useState('');

  const formikone = useFormik({
    initialValues: {
        companyname: "",
        location: "",
        jobrole: "",
        salaryoffer: "",
        openings: "",
        jobdescription: "",
        lastdate: "",
        image: null,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
    });
        try {
          console.log(formData)
          const token = localStorage.getItem('token2');
            await axios.post("https://dhru-placement-portal.onrender.com/recruiter/jobpostings", formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                   "Authorization": `Bearer ${token}`
              },
          });
            toast.success("Posted Successfully");
        } catch (error) {
            console.error("There is an error", error);
            toast.error("Job Post Failed");
        }
    },
});

const handleProfilePicChange = (e) => {
  const file = e.target.files[0];
  if (file) {
      formikone.setFieldValue('image', file); // Set the file to Formik state
  }
};

const jobposting = async () => {
  try {
    const token = localStorage.getItem('token2');
    const response = await axios.get('https://dhru-placement-portal.onrender.com/recruiter/my-jobpostings-details', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setjobpostings(response.data);
    setrecruiternavimage(response.data[0].image);
  } catch (error) {
    console.error('Error fetching job postings:', error);
    throw error;
  }
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

const applydetails = async () => {
  const token = localStorage.getItem('token2');
  const response = await axios.get('https://dhru-placement-portal.onrender.com/recruiter/applied-list-all', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  const ans = response.data.map((e) => {
    return e.applicationid
  });
  // console.log(ans)
  // console.log(jobpostings.map((e)=>e._id))
  // console.log(jobpostings.map((e)=>e._id  && ans.filter(a=>a===e._id))) 
  // console.log(ans.map((e)=>e && jobpostings.filter(a=>a===e))) 
  const anss = jobpostings.map((e)=>e._id  && ans.filter(a=>a===e._id));
  // console.log(anss.map(e=>e.length))
  const finalans= anss.map(e=>e.length);
  setAppliedDetails(finalans);
};

const handledelete=async(id)=>{
 const reply = confirm("Are you sure?");
 if(reply){
  const token = localStorage.getItem('token2');
  const response = await axios.delete(`https://dhru-placement-portal.onrender.com/recruiter/my-jobpostings-details/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
toast.success("Job List Deleted")
 }
}



const results = async() =>{
  const token = localStorage.getItem('token2');
const response = await axios.get("https://dhru-placement-portal.onrender.com/recruiter/interview-list-all", {
  headers: {
    Authorization: `Bearer ${token}`,
  }});
 
setinterviewlist(response.data)
}
const filteredApplications = interviewlist.filter(application => {
  const user = application.all_lists[0]?.userdetails[0];  // Safely access userdetails

  if (!user) {
    return false;  // Skip if user is undefined or does not exist
  }

  // Safely check if the properties exist before applying methods like toLowerCase()
  const nameMatches = user.name ? user.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  const emailMatches = user.email ? user.email.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  const degreeMatches = user.degree ? user.degree.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  const jobroleMatches = user.jobrole ? user.jobrole.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  const cgpaMatches = user.cgpa ? user.cgpa.toString().includes(searchQuery) : false;  // Convert CGPA to string

  // Return true if any of the conditions match
  return nameMatches || emailMatches || degreeMatches || jobroleMatches || cgpaMatches;
});



const interviewschedule = async ()=>{
    const token = localStorage.getItem('token2');
  const response = await axios.get("https://dhru-placement-portal.onrender.com/recruiter/interview-link", {
    headers: {
      Authorization: `Bearer ${token}`,
    }});
    setinterviewlistfinal(response.data)
}


const filteredinterview = interviewlistfinal.filter(application => {
  const user = application.interviewalldetails[0]?.all_lists[0].userdetails[0];  // Safely access userdetails

  if (!user) {
    return false;  // Skip if user is undefined or does not exist
  }

  // Safely check if the properties exist before applying methods like toLowerCase()
  const nameMatches = user.name ? user.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  const emailMatches = user.email ? user.email.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  const degreeMatches = user.degree ? user.degree.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  const jobroleMatches = user.jobrole ? user.jobrole.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  const cgpaMatches = user.cgpa ? user.cgpa.toString().includes(searchQuery) : false;  // Convert CGPA to string

  // Return true if any of the conditions match
  return nameMatches || emailMatches || degreeMatches || jobroleMatches || cgpaMatches;
});




const formiktwo = useFormik({
  initialValues: {
    applicationid:"",
    userid: "",
      link: "",
      date: "",
      time: ""
  },
  onSubmit: async (values) => {
      try {
        const result = confirm("Are You Sure?");
        if(result){
          const token = localStorage.getItem('token2');
          await axios.post("https://dhru-placement-portal.onrender.com/recruiter/interview-link", values, {
            headers: {
                 "Authorization": `Bearer ${token}`
            },
        });
          toast.success("Posted Interviewlink Successfully");
        }
      } catch (error) {
          console.error("There is an error", error);
          toast.error("Interviewlink Post Failed");
      }
  },
});

const formikthree = useFormik({
  initialValues: {
    shortlistresult:"",
    userid:"",
    applicationid:""
  },
  onSubmit: async (values) => {
    console.log("values",values)
      try {
        const result = confirm("Are You Sure?");
        if(result){
          const token = localStorage.getItem('token2');
          await axios.post("https://dhru-placement-portal.onrender.com/recruiter/interview-shortlist", values, {
            headers: {
                 "Authorization": `Bearer ${token}`
            },
        });
          toast.success("Saved Successfully");
        }
      } catch (error) {
          console.error("There is an error", error);
          toast.error("No Failed");
      }
  },
});

const shortlistdetails = async ()=>{
  const token = localStorage.getItem('token2');
const response = await axios.get("https://dhru-placement-portal.onrender.com/recruiter/interview-shortlist", {
  headers: {
    Authorization: `Bearer ${token}`,
  }});
  setshortlist(response.data)
}
const filteredshortlist = shortlist.filter(application => {
  const user = application.interviewalldetails[0]?.all_lists[0].userdetails[0];  // Safely access userdetails

  if (!user) {
    return false;  // Skip if user is undefined or does not exist
  }

  // Safely check if the properties exist before applying methods like toLowerCase()
  const nameMatches = user.name ? user.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  const emailMatches = user.email ? user.email.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  const degreeMatches = user.degree ? user.degree.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  const jobroleMatches = user.jobrole ? user.jobrole.toLowerCase().includes(searchQuery.toLowerCase()) : false;
  const cgpaMatches = user.cgpa ? user.cgpa.toString().includes(searchQuery) : false;  // Convert CGPA to string

  // Return true if any of the conditions match
  return nameMatches || emailMatches || degreeMatches || jobroleMatches || cgpaMatches;
});


const shortlisthandledelete=async (id)=>{
 try {
  const reply = confirm("Are you sure?");
  if(reply){
   const token = localStorage.getItem('token2');
   const response = await axios.delete(`https://dhru-placement-portal.onrender.com/recruiter/interview-shortlist/${id}`, {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   });
 toast.success("Job List Deleted")
  }
 } catch (error) {
  console.error(error);
  toast.error("Failed Deleted");
 }
}

useEffect(()=>{
jobposting();
applydetails();
results();
interviewschedule();
shortlistdetails();
},[AppliedDetails,interviewlist,shortlist,interviewlistfinal])



  return (
    <div>
      {
        recruitertogglenav === "one"?(

            <div>
            <h1 className='font-bold text-2xl py-6 text-center'>Post Job</h1>
            <div className='contentbox'>
               <div className='m-10'> 
               <form onSubmit={formikone.handleSubmit}>
            <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2" for="image">Company Logo</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleProfilePicChange}  class="w-full p-2 border border-gray-300 rounded focus:ring-indigo-800 focus:border-indigo-800" />
      </div>

     
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2" for="company-name">Company Name</label>
        <input type="text" id="company-name" name="companyname" value={formikone.values.companyname} onChange={formikone.handleChange} class="w-full p-2 border border-gray-300 rounded focus:ring-indigo-800 focus:border-indigo-800" placeholder="Enter company name" />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2" for="location">Location</label>
        <input type="text" id="location" name="location" onChange={formikone.handleChange} class="w-full p-2 border border-gray-300 rounded focus:ring-indigo-800 focus:border-indigo-800" placeholder="Enter job location" />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2" for="role">Job Role</label>
        <input type="text" id="role" name="jobrole" onChange={formikone.handleChange} class="w-full p-2 border border-gray-300 rounded focus:ring-indigo-800 focus:border-indigo-800" placeholder="Enter job role" />
      </div>

    
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2" for="offer">Salary Offer</label>
        <input type="text" id="salaryoffer" name="salaryoffer" onChange={formikone.handleChange} class="w-full p-2 border border-gray-300 rounded focus:ring-indigo-800 focus:border-indigo-800" placeholder="Enter offered salary" />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2" for="openings">Openings</label>
        <input type="number" id="openings" name="openings" onChange={formikone.handleChange} class="w-full p-2 border border-gray-300 rounded focus:ring-indigo-800 focus:border-indigo-800" placeholder="Enter number of openings" />
      </div>


   
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2" for="last-date">Last Date to Apply</label>
        <input type="date" id="last-date" name="lastdate" onChange={formikone.handleChange} class="w-full p-2 border border-gray-300 rounded focus:ring-indigo-800 focus:border-indigo-800" />
      </div>

    
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2" for="description">Job Description</label>
        <textarea id="description" name="jobdescription" onChange={formikone.handleChange} rows="5" class="w-full p-2 border border-gray-300 rounded focus:ring-indigo-800 focus:border-indigo-800" placeholder="Enter job description"></textarea>
      </div>

  
      <div>
        <button type="submit" class="w-full p-3 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700">Post Job</button>
      </div>
    </form>
               </div>
                </div>
            </div>
                ):recruitertogglenav === "two"?(

                    <div>
                    <h1 className='font-bold text-2xl py-6 text-center'>Applications</h1>
                    <div className='contentbox'>

                    <div  className='contentbox'>

{
          jobpostings.map((e,index)=>(
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

   <div className='flex flex-col items-center flex-wrap m-5'>
<img src='https://img.icons8.com/3d-fluency/94/mail.png' className='w-10 h-10'/>
<h5><span className='font-bold'>Applied</span></h5>
<span>{AppliedDetails[index]}</span>
</div>

  </div>



   <div className='flex justify-between items-center flex-wrap mt-5'> 
    <div><span>Last Date to Apply<br /> {formatDate(e.lastdate)} • Posted on {timeAgo(e.createdAt)} ago</span></div>
    <div>
    <Link to={`/recruiter-portal-application-list/${e._id}`} class="bg-indigo-800 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded-full">Applicants</Link>
<button class="border border-slate-900 hover:bg-slate-950 hover:text-white text-dark mx-4 font-bold py-2 px-4 rounded-full" onClick={()=>{handledelete(e._id)}}>Delete</button>

    </div>
   </div>
                </div>
          ))
        }



    </div>

                    </div>
                    </div>
                        ):recruitertogglenav === "three"?(

                            <div>
                            <h1 className='font-bold text-2xl py-6 text-center'>Results</h1>
                            <div className='contentbox h-screen'>
                            <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <h2 className="text-2xl leading-tight">Assessment Pass List</h2>
                        <div className='text-right'>
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                className="mt-4 mb-4 px-4 py-2 border border-slate-950 rounded"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="overflow-x-auto m-6">
                            <div className="min-w-full shadow rounded-lg">
                            <form onSubmit={formiktwo.handleSubmit}>
                            <table className="mx-auto">
            <thead>
                <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Role</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Degree</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Details</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">CGPA</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Resume</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Interview Link</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Interview Date</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Interview Time</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
            </thead>
            <tbody>




            {interviewlist.length > 0 && interviewlist[0].all_lists && interviewlist[0].all_lists.length > 0 ? (
    filteredApplications.map((list, index) => (
        <tr key={list._id.$oid}>
            <td  className='text-center'>{index + 1}</td>
            <td  className='text-center'>{list.all_lists[0].userdetails[0].name}</td>
            <td  className='text-center'>{list.all_lists[0].userdetails[0].email}</td>
            <td  className='text-center'>{list.all_lists[0].applicationdata[0].jobrole}</td>
            <td  className='text-center'>{list.all_lists[0].userdetails[0].degree}</td>
            <td  className='text-center'>
                {view === list.all_lists[0].userdetails[0]._id && (
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Student Details</h3>
                                                <div className='flex gap-5 p-5'>
                                                    
                                                    <div className="relative h-32 w-32 rounded-full overflow-hidden cursor-pointer">
                                                                                                    <div className='h-full w-full bg-gray-200 flex items-center justify-center'>
                                                                                                        <img src={`${list.all_lists[0].userdetails[0].image}`} className='h-full w-full object-cover' alt="student profile" />
                                                                                                    </div>
                                                                                                    </div>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Name: </span>{list.all_lists[0].userdetails[0].name}</p>
                                                        <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Email: </span>{list.all_lists[0].userdetails[0].email}</p>
                                                        <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>CGPA: </span>{list.all_lists[0].userdetails[0].cgpa}</p>
                                                        <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Skills: </span>{list.all_lists[0].userdetails[0].skills}</p>
                                                        <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Degree: </span>{list.all_lists[0].userdetails[0].degree}</p>
                                                        <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Number: </span>{list.all_lists[0].userdetails[0].number}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <span className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto" onClick={() => { setview(false) }}>Close</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <span className="bg-indigo-600 text-white px-3 py-2 rounded cursor-pointer" onClick={() => setview(list.all_lists[0].userdetails[0]._id)}>View</span>
            </td>
            <td  className='text-center px-5 py-8 bg-white text-sm'>{list.all_lists[0].userdetails[0].cgpa}</td>
            <td  className='text-center'>
                <a href={`https://dhru-placement-portal.onrender.com/${list.all_lists[0].userdetails[0].resume}`} className='text-blue-600 hover:text-blue-800'>Download</a>
            </td>
            <td  className='text-center'>
                <input name="link" onChange={formiktwo.handleChange} type="url"  className="border border-gray-400 rounded-md" />
            </td>
            <td  className='text-center'>
                <input name="date" onChange={formiktwo.handleChange} type="date" className="border border-gray-400 rounded-md" />
            </td>
            <td  className='text-center'>
                <input name="time" onChange={formiktwo.handleChange} type="time" className="border border-gray-400 rounded-md" />
            </td>
            <td  className='text-center'>
                <button type='submit' className="bg-indigo-600 text-white px-3 py-2 rounded" onClick={() => {formiktwo.setFieldValue('userid', list.all_lists[0].userid),formiktwo.setFieldValue('applicationid', list.all_lists[0].applicationid)}}>Save</button>
            </td>
        </tr>
    ))
) : (
  <tr>
    <td colSpan="200">  <h1  className='mt-20 text-center'>No Data Available</h1></td>
  </tr>
  
)}

            </tbody>
        </table>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
                            </div>
                            </div>
                                ):recruitertogglenav === "four"?(

                                    <div>
                                    <h1 className='font-bold text-2xl py-6 text-center'>Interview Schedule</h1>
                                    <div className='contentbox h-screen'>
                                    <h2 className="text-2xl leading-tight p-8">Interview Schedule:</h2>
                                    <div className='text-right'>
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                className="mt-4 mb-4 me-4 px-4 py-2 border border-slate-950 rounded"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                                    <form onSubmit={formikthree.handleSubmit}>
                                    <table className="m-10">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Role</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Degree</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Details</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CGPA</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Resume</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Interview Link</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Shortlist</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      
                                               {
                                        
                                        filteredinterview.map((e,index)=>(
                                                <tr key={index}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{index+1}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].name}</p>
                                                   
                                                               {
                                                                view === e.interviewalldetails[0].all_lists[0].userdetails[0]._id ?( <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                                                                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                                                                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                                  <div className="sm:flex sm:items-start">
                                                                                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                                          <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Student Details</h3>
                                                                                          <div className='flex gap-5 p-5'>
                                                                                          <div className="relative h-32 w-32 rounded-full overflow-hidden cursor-pointer">
                                                                                                    <div className='h-full w-full bg-gray-200 flex items-center justify-center'>
                                                                                                        <img src={`${e.interviewalldetails[0].all_lists[0].userdetails[0].image}`} className='h-full w-full object-cover' alt="student profile" />
                                                                                                    </div>
                                                                                                    </div>
                                                                                              <div className="mt-2">
                                                                                                  <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Name: </span>{e.interviewalldetails[0].all_lists[0].userdetails[0].name}</p>
                                                                                                  <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Email: </span>{e.interviewalldetails[0].all_lists[0].userdetails[0].email}</p>
                                                                                                  <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>CGPA: </span>{e.interviewalldetails[0].all_lists[0].userdetails[0].cgpa}</p>
                                                                                                  <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Skills: </span>{e.interviewalldetails[0].all_lists[0].userdetails[0].skills}</p>
                                                                                                  <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Degree: </span>{e.interviewalldetails[0].all_lists[0].userdetails[0].degree}</p>
                                                                                              <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Number: </span>{e.interviewalldetails[0].all_lists[0].userdetails[0].number}</p>
                                                                                              
                                                                                              </div>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                  <span className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto" onClick={()=>{setview(false)}} >Close</span>
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>):("")
                                                               }
                                                         
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].email}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].applicationdata[0].jobrole}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].degree}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                    <span  className="bg-indigo-600 text-white px-3 py-2 rounded" onClick={()=>{setview(e.interviewalldetails[0].all_lists[0].userdetails[0]._id)}}>View</span>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].cgpa}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white cursor-pointer text-sm text-center">
                                                    <a href={`https://dhru-placement-portal.onrender.com/${e.interviewalldetails[0].all_lists[0].userdetails[0].resume}`} className='text-blue-600 hover:text-blue-800'>Download</a>
                                                </td>
                                               
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                   <a href={`${e.links}`} ><img src='https://img.icons8.com/3d-fluency/94/link.png' className='w-5 h-5 cursor-pointer' alt='Assessment Link'/></a>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <p className="text-gray-900 whitespace-no-wrap">{formatDate(e.dates)}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <p className="text-gray-900 whitespace-no-wrap">{e.times}</p>
                                                </td>
                                                
                                               
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                <select name="shortlistresult" className="border border-gray-400 rounded-md" onChange={formikthree.handleChange}>
                                                        <option value="pending">Pending</option>
                                                        <option value="Selected">Selected</option>
                                                        <option value="rejected">Rejected</option>
                                                    </select>
                                                </td>
                                              
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                    <button type="submit"  className="bg-indigo-600 text-white px-3 py-2 rounded" onClick={()=>{formikthree.setFieldValue('userid', e.interviewalldetails[0].all_lists[0].userdetails[0]._id),formikthree.setFieldValue('applicationid', e.interviewalldetails[0].all_lists[0].applicationdata[0]._id)}}>Save</button>
                                                </td>
                                            </tr>
                                               ))
                                               }
                                           
                                    </tbody>
                                </table>
                                    </form>
      </div>
                                    </div>
                                        ):recruitertogglenav === "five"?(

                                            <div>
                                            <h1 className='font-bold text-2xl py-6 text-center'>Shortlist</h1>
                                            <div className='contentbox'>
                                            <div className='contentbox h-screen'>
                                    <h2 className="text-2xl leading-tight p-8">ShortList details:</h2>
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
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Job Role</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Degree</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Details</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CGPA</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Resume</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">result</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      
                                               {
                                        
                                      filteredshortlist.map((e,index)=>(
                                                <tr key={index}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{index+1}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].name}</p>
                                                   
                                                               {
                                                                view ?( <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                                                                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                                                                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                                  <div className="sm:flex sm:items-start">
                                                                                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                                                          <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Student Details</h3>
                                                                                          <div className='flex gap-5 p-5'>
                                                                                          
                                                                                              <div className="relative h-32 w-32 rounded-full overflow-hidden cursor-pointer">
                                                                                                    <div className='h-full w-full bg-gray-200 flex items-center justify-center'>
                                                                                                        <img src={`${e.interviewalldetails[0].all_lists[0].userdetails[0].image}`} className='h-full w-full object-cover' alt="student profile" />
                                                                                                    </div>
                                                                                                    </div>
                                                                                              <div className="mt-2">
                                                                                                  <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Name: </span>{e.interviewalldetails[0].all_lists[0].userdetails[0].name}</p>
                                                                                                  <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Email: </span>{e.interviewalldetails[0].all_lists[0].userdetails[0].email}</p>
                                                                                                  <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>CGPA: </span>{e.interviewalldetails[0].all_lists[0].userdetails[0].cgpa}</p>
                                                                                                  <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Skills: </span>{e.interviewalldetails[0].all_lists[0].userdetails[0].skills}</p>
                                                                                                  <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Degree: </span>{e.interviewalldetails[0].all_lists[0].userdetails[0].degree}</p>
                                                                                                  <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Number: </span>{e.interviewalldetails[0].all_lists[0].userdetails[0].number}</p>
                                                                                              </div>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                  <button type="button" className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto" onClick={()=>{setview(false)}} >Close</button>
                                                                              </div>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>):("")
                                                               }
                                                         
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].email}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].applicationdata[0].jobrole}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].degree}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                    <span  className="bg-indigo-600 text-white px-3 py-2 rounded cursor-pointer" onClick={()=>{setview(true)}}>View</span>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.interviewalldetails[0].all_lists[0].userdetails[0].cgpa}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white cursor-pointer text-sm text-center">
                                                    <a href={`https://dhru-placement-portal.onrender.com/${e.interviewalldetails[0].all_lists[0].userdetails[0].resume}`} className='text-blue-600 hover:text-blue-800'>Download</a>
                                                </td>
                                               
                                               
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{e.shortliststatus}</p>
                                                </td>      
                                          
                                              
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                    <button  className="bg-red-600 text-white px-3 py-2 rounded" onClick={()=>shortlisthandledelete(e._id)}>Delete</button>
                                                </td>
                                            </tr>
                                               ))
                                               }
                                           
                                    </tbody>
                                </table>
      </div>
                                            </div>
                                            </div>
                                                ):""
      }
    </div>
  )
}

export default RecruiterContentbox
