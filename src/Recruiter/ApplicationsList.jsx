import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import RecruiterNavbar from './RecruiterNavbar';
import Footer from '../Footer';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ApplicationsList = () => {
    const { id } = useParams();
    const [allAppliedDetails, setAllAppliedDetails] = useState([]);
    const [viewUserId, setViewUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [spinner,setspinner] = useState(true)

    // Fetch application details
    const applyDetails = async () => {
        setspinner(false)
        const token = localStorage.getItem('token2');
        const response = await axios.get('https://dhru-placement-portal.onrender.com/recruiter/applied-list-all', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setspinner(true)
       
        const ans = response.data.filter((e) => e.applicationid === id);
        
        setAllAppliedDetails(ans);
       
    };

    // Filter applications based on search query
    const filteredApplications = allAppliedDetails.filter(application => {
        const user = application.userdetails[0];
        return (
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.cgpa.toString().includes(searchQuery) // Convert CGPA to string for comparison
        );
    });

    // Form submission handler
    const formik = useFormik({
        initialValues: {
            applicationId: '',
            status: '',
            assessmentStatus: '',
            assessmentLink: '',
        },
        onSubmit: async (values) => {
            console.log(values)
            try {
                const response = await axios.put(`https://dhru-placement-portal.onrender.com/recruiter/update-application/${values.applicationId}`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token2')}`,
                    },
                });
                toast.success("Successfully Updated");
                applyDetails(); // Reload the data after submission
            } catch (error) {
                toast.error("Cannot Update");
                console.error('Error updating status:', error);
            }
        },
    });

    useEffect(() => {
        applyDetails();
    },[]);

    return (
        <div>
            <RecruiterNavbar />
            <div className="m-4 contentbox h-screen">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div className='my-5 text-right'>
                            <Link to="/recruiter-portal" className="bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Back</Link>
                        </div>
                        <h2 className="text-2xl leading-tight">Applications List</h2>
                        {
                            spinner ? (
                               <div>
                                 <div className='text-right'>
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                className="mt-4 mb-4 px-4 py-2 border border-slate-950 rounded"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="overflow-x-auto mt-6">
                            <div className="min-w-full shadow rounded-lg">
                                <table className="min-w-full leading-normal">
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
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Assessment Link</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Assessment Status</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                        {filteredApplications.map((application, index) => {
                                            const user = application.userdetails[0];
                                            const job = application.applicationdata[0];

                                            return (
                                                <tr key={user._id}>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
                                                        {viewUserId === user._id && (
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
                                                                                                        <img src={user.image} className='h-full w-full object-cover' alt="student profile" />
                                                                                                    </div>
                                                                                                    </div>
                                                                                                    <div className="mt-2">
                                                                                                        <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Name: </span>{user.name}</p>
                                                                                                        <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Email: </span>{user.email}</p>
                                                                                                        <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>CGPA: </span>{user.cgpa}</p>
                                                                                                        <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Skills: </span>{user.skills}</p>
                                                                                                        <p className="text-sm text-gray-500"><span className='font-bold text-gray-950'>Degree: </span>{user.degree}</p>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                        <button type="button" className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto" onClick={()=>{setViewUserId(false)}}>Close</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{job.jobrole}</p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{user.degree}</p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                        <button onClick={() => setViewUserId(user._id)} className="bg-indigo-600 text-white px-3 py-2 rounded">View</button>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p className="text-gray-900 whitespace-no-wrap">{user.cgpa}</p>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white cursor-pointer text-sm text-center">
                                                        <a href={`https://dhru-placement-portal.onrender.com/${user.resume}`} className='text-blue-600 hover:text-blue-800'>Download</a>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                        <select name="status" className="border border-gray-400 rounded-md" onChange={(e) => formik.setFieldValue('status', e.target.value)}>
                                                            <option value="pending">Pending</option>
                                                            <option value="shortlisted">Shortlisted</option>
                                                            <option value="rejected">Rejected</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                        <input name="assessmentLink" type="url" className="border border-gray-400 rounded-md" onChange={(e) => formik.setFieldValue('assessmentLink', e.target.value)} />
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                        <select name="assessmentStatus" className="border border-gray-400 rounded-md" onChange={(e) => formik.setFieldValue('assessmentStatus', e.target.value)}>
                                                            <option value="pending">Pending</option>
                                                            <option value="selected">Selected</option>
                                                            <option value="rejected">Rejected</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                        <button type="submit" onClick={() => {formik.handleSubmit(); formik.setFieldValue('applicationId', application._id);}} className="bg-indigo-600 text-white px-3 py-2 rounded">Save</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}


                                    </tbody>
                                </table>
                              
                            </div>
                        </div>
                               </div>
                            ):(<div className='flex justify-center'>
                                    <span className="loader"></span>
                                </div>)
                        }
                    </div>
                    
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ApplicationsList;
