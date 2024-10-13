import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from '../Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import CommonNav from '../CommonNav';

const Register = () => {
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
            degree: "",
            cgpa: "",
            skills: "",
            regno: "",
            image: null, // Initially set to null for image upload
            resume: null, // Initially set to null for resume upload
            password: "",
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            // Append each field to the FormData object
            Object.keys(values).forEach(key => {
                formData.append(key, values[key]);
            });

            try {
                await axios.post("https://dhru-placement-portal.onrender.com/student/student-register", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success("Registered Successfully");
                navigate("/student-login");
            } catch (error) {
                console.error('Registration error:', error);
                toast.error("Registration failed. Please try again.");
            }
        }
    });

    // Handle profile picture change
    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
            formik.setFieldValue('image', file); // Set the file to Formik state
        }
    };

    // Handle resume upload
    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formik.setFieldValue('resume', file); // Set the file to Formik state
        }
    };

    const handleImageClick = () => {
        document.getElementById('profile-pic').click();
    };

    return (
        <div>
            <CommonNav/>
            <h1 className='font-bold text-2xl text-center py-6'>Register</h1>
            <div className='contentbox mx-20'>
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
                                                src="https://img.icons8.com/3d-fluency/94/FA5252/person-male--v5.png"
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

                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="flex">Password:</label>
                            <input
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                type="password"
                                required
                                className="appearance-none rounded-md mb-4 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-slate-950 focus:z-10 sm:text-sm"
                                placeholder="Password"
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
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
                        </button>
                    </div>
                    <div className='text-center'>
                        <p>
                            Already have an account?
                            <Link to="/student-login" className="font-semibold text-indigo-600 hover:text-indigo-500"> Login</Link>
                        </p>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
