import React from 'react'
import Footer from '../Footer'
import CommonNav from '../CommonNav'
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const Adminlogin = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.post('https://dhru-placement-portal.onrender.com/admin/admin-login', values);
                // Assuming the response contains a token
                console.log(response)
                if (response.status === 200) {
                    // Store the token in local storage
                    localStorage.setItem('token3', response.data.token);
                    navigate('/admin-portal');
                    toast.success('Login Successful');
                  // Change to your dashboard route
                } else {
                    toast.error('Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Login error:', error);
                toast.error('Login failed. Please check your credentials and try again.');
            }
        },
    });
  return (
    <div>
      <CommonNav />
      <div className='m-10 text-right'>
                            <Link to="/" className="bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Back</Link>
                        </div>
            <div className="bg-gray-100 flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                    <h2 className="text-2xl font-semibold text-center text-indigo-800 mb-6">Login to Your Account</h2>

                    <form onSubmit={formik.handleSubmit}>
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

                        <button type="submit" className="bg-indigo-800 text-white rounded-lg w-full p-2 hover:bg-indigo-700 transition duration-200">Login</button>
                    </form>

                </div>
            </div>
            <Footer />
    </div>
  )
}

export default Adminlogin
