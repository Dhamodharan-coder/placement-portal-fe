import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from '../Footer';
import RecruiterNavbar from './RecruiterNavbar';
import CommonNav from '../CommonNav';

const RecruiterRegister = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name:"",
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
         try {
            await axios.post("https://dhru-placement-portal.onrender.com/recruiter/recruiter-register",values);
            toast.success("Registered Successfully!");
            navigate("/recruiter-login");
         } catch (error) {
            console.error("registration failed",error);
            toast.error("Registration Failed");
         }
        },
    });

    return (
        <div>
            <CommonNav />
            <div className="bg-gray-100 flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                    <h2 className="text-2xl font-semibold text-center text-indigo-800 mb-6">Register Account</h2>

                    <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">Company Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                placeholder="Your Company Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button type="submit" className="bg-indigo-800 text-white rounded-lg w-full p-2 hover:bg-indigo-700 transition duration-200">Sign Up</button>
                    </form>

                    <p className="text-gray-600 text-center mt-4">
                        Have an account? <Link to="/recruiter-login" className="text-indigo-800 hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RecruiterRegister;
